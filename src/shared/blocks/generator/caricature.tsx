'use client';

import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  CreditCard,
  Download,
  Eraser,
  ImageIcon,
  Loader2,
  Sparkles,
  User,
  Wand,
} from 'lucide-react';
import { useTranslations } from 'next-intl';
import { toast } from 'sonner';

import { Link } from '@/core/i18n/navigation';
import { AIMediaType, AITaskStatus } from '@/extensions/ai/types';
import {
  ImageUploader,
  ImageUploaderValue,
  LazyImage,
  LoadingAnimation,
} from '@/shared/blocks/common';
import { Button } from '@/shared/components/ui/button';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/shared/components/ui/card';
import { Input } from '@/shared/components/ui/input';
import { Label } from '@/shared/components/ui/label';
import { Progress } from '@/shared/components/ui/progress';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';
import { Textarea } from '@/shared/components/ui/textarea';
import { useAppContext } from '@/shared/contexts/app';
import { cn } from '@/shared/lib/utils';

import { CARICATURE_STYLES, CaricatureStyle } from './caricature-styles';

const ASPECT_RATIOS = [
  { value: '1:1', labelKey: 'aspect_ratio_square' },
  { value: '3:2', labelKey: 'aspect_ratio_landscape' },
  { value: '2:3', labelKey: 'aspect_ratio_portrait' },
] as const;

interface CaricatureGeneratorProps {
  srOnlyTitle?: string;
  className?: string;
}

interface GeneratedImage {
  id: string;
  url: string;
  provider?: string;
  model?: string;
  prompt?: string;
}

interface BackendTask {
  id: string;
  status: string;
  provider: string;
  model: string;
  prompt: string | null;
  taskInfo: string | null;
  taskResult: string | null;
}

const POLL_INTERVAL = 5000;
const GENERATION_TIMEOUT = 180000;
const COST_CREDITS = 20;

// Models that support image-to-image, ordered by priority
const IMAGE_TO_IMAGE_MODELS = [
  {
    value: 'openai/gpt-image-1.5',
    provider: 'replicate',
  },
  {
    value: 'gemini-3-pro-image-preview',
    provider: 'gemini',
  },
  {
    value: 'fal-ai/bytedance/seedream/v4.5/edit',
    provider: 'fal',
  },
  {
    value: 'fal-ai/bytedance/seedream/v4/edit',
    provider: 'fal',
  },
  {
    value: 'bytedance/seedream-4',
    provider: 'replicate',
  },
  {
    value: 'nano-banana-pro',
    provider: 'kie',
  },
];

function parseTaskResult(taskResult: string | null): any {
  if (!taskResult) {
    return null;
  }

  try {
    return JSON.parse(taskResult);
  } catch (error) {
    console.warn('Failed to parse taskResult:', error);
    return null;
  }
}

function extractImageUrls(result: any): string[] {
  if (!result) {
    return [];
  }

  const output = result.output ?? result.images ?? result.data;

  if (!output) {
    return [];
  }

  if (typeof output === 'string') {
    return [output];
  }

  if (Array.isArray(output)) {
    return output
      .flatMap((item) => {
        if (!item) return [];
        if (typeof item === 'string') return [item];
        if (typeof item === 'object') {
          const candidate =
            item.url ?? item.uri ?? item.image ?? item.src ?? item.imageUrl;
          return typeof candidate === 'string' ? [candidate] : [];
        }
        return [];
      })
      .filter(Boolean);
  }

  if (typeof output === 'object') {
    const candidate =
      output.url ?? output.uri ?? output.image ?? output.src ?? output.imageUrl;
    if (typeof candidate === 'string') {
      return [candidate];
    }
  }

  return [];
}

export function CaricatureGenerator({
  srOnlyTitle,
  className,
}: CaricatureGeneratorProps) {
  const t = useTranslations('ai.caricature.generator');

  const [selectedStyle, setSelectedStyle] = useState<CaricatureStyle>(
    CARICATURE_STYLES[0]
  );
  const [aspectRatio, setAspectRatio] = useState('1:1');
  const [jobTitle, setJobTitle] = useState('');
  const [hobbies, setHobbies] = useState('');
  const [personality, setPersonality] = useState('');
  const [additionalPrompt, setAdditionalPrompt] = useState('');

  const [provider, setProvider] = useState('');
  const [model, setModel] = useState('');
  const [referenceImageItems, setReferenceImageItems] = useState<
    ImageUploaderValue[]
  >([]);
  const [referenceImageUrls, setReferenceImageUrls] = useState<string[]>([]);
  const [generatedImages, setGeneratedImages] = useState<GeneratedImage[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [taskId, setTaskId] = useState<string | null>(null);
  const [generationStartTime, setGenerationStartTime] = useState<number | null>(
    null
  );
  const [taskStatus, setTaskStatus] = useState<AITaskStatus | null>(null);
  const [downloadingImageId, setDownloadingImageId] = useState<string | null>(
    null
  );
  const [isMounted, setIsMounted] = useState(false);
  const savedTaskIdsRef = useRef<Set<string>>(new Set());
  const [isLoadingCredits, setIsLoadingCredits] = useState(false);
  const [availableProviders, setAvailableProviders] = useState<string[]>([]);
  const [isLoadingProviders, setIsLoadingProviders] = useState(true);
  const [imagesLoadingState, setImagesLoadingState] = useState<
    Record<string, 'loading' | 'loaded' | 'error'>
  >({});
  const hasLoadedCreditsRef = useRef(false);

  const { user, isCheckSign, setIsShowSignModal, fetchUserCredits } =
    useAppContext();

  // Auto-select best available provider/model for image-to-image
  const selectBestModel = useCallback((providers: string[]) => {
    for (const m of IMAGE_TO_IMAGE_MODELS) {
      if (providers.includes(m.provider)) {
        setProvider(m.provider);
        setModel(m.value);
        return;
      }
    }
    setProvider('');
    setModel('');
  }, []);

  useEffect(() => {
    setIsMounted(true);

    fetch('/api/ai/providers')
      .then((res) => res.json())
      .then((data) => {
        if (data.code === 0 && data.data?.providers !== undefined) {
          const providers = data.data.providers || [];
          setAvailableProviders(providers);
          selectBestModel(providers);
        }
      })
      .catch((error) => {
        console.error('Failed to fetch AI providers:', error);
        setAvailableProviders([]);
      })
      .finally(() => {
        setIsLoadingProviders(false);
      });
  }, [selectBestModel]);

  const userIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (user?.id !== userIdRef.current) {
      userIdRef.current = user?.id || null;
      hasLoadedCreditsRef.current = false;
    }

    if (user && !user.credits && !hasLoadedCreditsRef.current) {
      hasLoadedCreditsRef.current = true;
      setIsLoadingCredits(true);
      fetchUserCredits().finally(() => {
        setIsLoadingCredits(false);
      });
    }
  }, [user?.id, user?.credits, fetchUserCredits]);

  const remainingCredits = user?.credits?.remainingCredits ?? 0;

  const taskStatusLabel = useMemo(() => {
    if (!taskStatus) {
      return '';
    }

    switch (taskStatus) {
      case AITaskStatus.PENDING:
        return t('status_pending');
      case AITaskStatus.PROCESSING:
        return t('status_processing');
      case AITaskStatus.SUCCESS:
        return t('status_success');
      case AITaskStatus.FAILED:
        return t('status_failed');
      default:
        return '';
    }
  }, [taskStatus, t]);

  const handleReferenceImagesChange = useCallback(
    (items: ImageUploaderValue[]) => {
      setReferenceImageItems(items);
      const uploadedUrls = items
        .filter((item) => item.status === 'uploaded' && item.url)
        .map((item) => item.url as string);
      setReferenceImageUrls(uploadedUrls);
    },
    []
  );

  const isReferenceUploading = useMemo(
    () => referenceImageItems.some((item) => item.status === 'uploading'),
    [referenceImageItems]
  );

  const hasReferenceUploadError = useMemo(
    () => referenceImageItems.some((item) => item.status === 'error'),
    [referenceImageItems]
  );

  const resetTaskState = useCallback(() => {
    setIsGenerating(false);
    setProgress(0);
    setTaskId(null);
    setGenerationStartTime(null);
    setTaskStatus(null);
  }, []);

  const buildFinalPrompt = useCallback(() => {
    const basePrompt = selectedStyle.buildPrompt({
      jobTitle: jobTitle.trim() || undefined,
      hobbies: hobbies.trim() || undefined,
      personality: personality.trim() || undefined,
    });
    const extra = additionalPrompt.trim();
    return extra ? `${basePrompt} Additional details: ${extra}` : basePrompt;
  }, [selectedStyle, jobTitle, hobbies, personality, additionalPrompt]);

  const saveShowcase = useCallback(
    async (imageUrl: string, taskIdForTracking: string) => {
      if (savedTaskIdsRef.current.has(taskIdForTracking)) {
        return;
      }

      savedTaskIdsRef.current.add(taskIdForTracking);

      try {
        const compressImageFile = async (imgUrl: string): Promise<string> => {
          const response = await fetch(
            `/api/proxy/file?url=${encodeURIComponent(imgUrl)}`
          );
          if (!response.ok) throw new Error('Failed to fetch image');

          const blob = await response.blob();
          const file = new File([blob], 'showcase.jpg', { type: blob.type });

          const { compressImage } = await import('@/shared/blocks/common');
          const compressedFile = await compressImage(file);

          return new Promise((resolve, reject) => {
            const formData = new FormData();
            formData.append('file', compressedFile);

            fetch('/api/upload', {
              method: 'POST',
              body: formData,
            })
              .then((res) => {
                if (!res.ok) throw new Error('Upload failed');
                return res.json();
              })
              .then((result) => {
                if (!result.success || !result.url) {
                  throw new Error(result.error || 'Upload failed');
                }
                resolve(result.url);
              })
              .catch(reject);
          });
        };

        const compressedImageUrl = await compressImageFile(imageUrl);

        await fetch('/api/showcases/add', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            title: `${selectedStyle.label} Caricature`,
            prompt: buildFinalPrompt(),
            image: compressedImageUrl,
            tags: 'caricature',
          }),
        });
      } catch (error) {
        console.error('Failed to save showcase:', error);
        savedTaskIdsRef.current.delete(taskIdForTracking);
      }
    },
    [selectedStyle, buildFinalPrompt]
  );

  const pollTaskStatus = useCallback(
    async (id: string) => {
      try {
        if (savedTaskIdsRef.current.has(id)) {
          return true;
        }

        if (
          generationStartTime &&
          Date.now() - generationStartTime > GENERATION_TIMEOUT
        ) {
          resetTaskState();
          toast.error(t('timeout_error'));
          return true;
        }

        const resp = await fetch('/api/ai/query', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ taskId: id }),
        });

        if (!resp.ok) {
          throw new Error(`request failed with status: ${resp.status}`);
        }

        const { code, message, data } = await resp.json();
        if (code !== 0) {
          throw new Error(message || 'Query task failed');
        }

        const task = data as BackendTask;
        const currentStatus = task.status as AITaskStatus;
        setTaskStatus(currentStatus);

        const parsedResult = parseTaskResult(task.taskInfo);
        const imageUrls = extractImageUrls(parsedResult);

        if (currentStatus === AITaskStatus.PENDING) {
          setProgress((prev) => Math.max(prev, 20));
          return false;
        }

        if (currentStatus === AITaskStatus.PROCESSING) {
          if (imageUrls.length > 0) {
            setGeneratedImages(
              imageUrls.map((url, index) => ({
                id: `${task.id}-${index}`,
                url,
                provider: task.provider,
                model: task.model,
                prompt: task.prompt ?? undefined,
              }))
            );

            const initialLoadingState = imageUrls
              .map((_, index) => ({
                id: `${task.id}-${index}`,
              }))
              .reduce(
                (acc, img) => ({ ...acc, [img.id]: 'loading' as const }),
                {} as Record<string, 'loading' | 'loaded' | 'error'>
              );

            setImagesLoadingState((prev) => ({
              ...prev,
              ...initialLoadingState,
            }));
            setProgress((prev) => Math.max(prev, 85));
          } else {
            setProgress((prev) => Math.min(prev + 10, 80));
          }
          return false;
        }

        if (currentStatus === AITaskStatus.SUCCESS) {
          if (imageUrls.length === 0) {
            toast.error(t('no_results_error'));
          } else {
            const images = imageUrls.map((url, index) => ({
              id: `${task.id}-${index}`,
              url,
              provider: task.provider,
              model: task.model,
              prompt: task.prompt ?? undefined,
            }));
            setGeneratedImages(images);

            const initialLoadingState = images.reduce(
              (acc, img) => ({ ...acc, [img.id]: 'loading' as const }),
              {} as Record<string, 'loading' | 'loaded' | 'error'>
            );
            setImagesLoadingState((prev) => ({
              ...prev,
              ...initialLoadingState,
            }));

            if (images.length > 0 && !savedTaskIdsRef.current.has(task.id)) {
              await saveShowcase(images[0].url, task.id);
              toast.success(t('success_message'));
            }
          }

          setProgress(100);
          resetTaskState();
          return true;
        }

        if (currentStatus === AITaskStatus.FAILED) {
          const errorMessage =
            parsedResult?.errorMessage || t('generation_failed');
          toast.error(errorMessage);
          resetTaskState();
          fetchUserCredits();
          return true;
        }

        setProgress((prev) => Math.min(prev + 5, 95));
        return false;
      } catch (error: any) {
        console.error('Error polling task:', error);
        toast.error(`${t('query_failed')}: ${error.message}`);
        resetTaskState();
        fetchUserCredits();
        return true;
      }
    },
    [generationStartTime, resetTaskState, fetchUserCredits, saveShowcase, t]
  );

  useEffect(() => {
    if (!taskId || !isGenerating) {
      return;
    }

    let cancelled = false;

    const tick = async () => {
      if (!taskId) {
        return;
      }
      const completed = await pollTaskStatus(taskId);
      if (completed) {
        cancelled = true;
      }
    };

    tick();

    const interval = setInterval(async () => {
      if (cancelled || !taskId) {
        clearInterval(interval);
        return;
      }
      const completed = await pollTaskStatus(taskId);
      if (completed) {
        clearInterval(interval);
      }
    }, POLL_INTERVAL);

    return () => {
      cancelled = true;
      clearInterval(interval);
    };
  }, [taskId, isGenerating, pollTaskStatus]);

  const handleGenerate = async () => {
    if (availableProviders.length === 0) {
      toast.error(t('no_providers_error'));
      return;
    }

    if (!availableProviders.includes(provider)) {
      toast.error(t('no_providers_error'));
      return;
    }

    if (!user) {
      setIsShowSignModal(true);
      return;
    }

    if (remainingCredits < COST_CREDITS) {
      toast.error(t('insufficient_credits'));
      return;
    }

    if (referenceImageUrls.length === 0) {
      toast.error(t('upload_photo_first'));
      return;
    }

    if (!provider || !model) {
      toast.error(t('no_providers_error'));
      return;
    }

    const finalPrompt = buildFinalPrompt();

    setIsGenerating(true);
    setProgress(15);
    setTaskStatus(AITaskStatus.PENDING);
    setGeneratedImages([]);
    setGenerationStartTime(Date.now());

    try {
      const resp = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          mediaType: AIMediaType.IMAGE,
          scene: 'image-to-image',
          provider,
          model,
          prompt: finalPrompt,
          options: {
            image_input: referenceImageUrls,
            ...(model === 'openai/gpt-image-1.5' && {
              input_fidelity: 'high',
              quality: 'high',
              aspect_ratio: aspectRatio,
            }),
          },
        }),
      });

      if (!resp.ok) {
        throw new Error(`request failed with status: ${resp.status}`);
      }

      const { code, message, data } = await resp.json();
      if (code !== 0) {
        throw new Error(message || t('generation_failed'));
      }

      const newTaskId = data?.id;
      if (!newTaskId) {
        throw new Error('Task id missing in response');
      }

      if (data.status === AITaskStatus.SUCCESS && data.taskInfo) {
        const parsedResult = parseTaskResult(data.taskInfo);
        const imageUrls = extractImageUrls(parsedResult);

        if (imageUrls.length > 0) {
          const images = imageUrls.map((url, index) => ({
            id: `${newTaskId}-${index}`,
            url,
            provider,
            model,
            prompt: finalPrompt,
          }));
          setGeneratedImages(images);

          const initialLoadingState = images.reduce(
            (acc, img) => ({ ...acc, [img.id]: 'loading' as const }),
            {} as Record<string, 'loading' | 'loaded' | 'error'>
          );
          setImagesLoadingState(initialLoadingState);
          setProgress(100);
          resetTaskState();
          await fetchUserCredits();

          if (images.length > 0 && !savedTaskIdsRef.current.has(newTaskId)) {
            await saveShowcase(images[0].url, newTaskId);
            toast.success(t('success_message'));
          }
          return;
        }
      }

      setTaskId(newTaskId);
      setProgress(25);

      await fetchUserCredits();
    } catch (error: any) {
      console.error('Failed to generate caricature:', error);
      toast.error(`${t('generation_failed')}: ${error.message}`);
      resetTaskState();
    }
  };

  const handleDownloadImage = async (image: GeneratedImage) => {
    if (!image.url) {
      return;
    }

    try {
      setDownloadingImageId(image.id);
      const resp = await fetch(
        `/api/proxy/file?url=${encodeURIComponent(image.url)}`
      );
      if (!resp.ok) {
        throw new Error('Failed to fetch image');
      }

      const blob = await resp.blob();
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `caricature-${image.id}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setTimeout(() => URL.revokeObjectURL(blobUrl), 200);
      toast.success(t('download_success'));
    } catch (error) {
      console.error('Failed to download image:', error);
      toast.error(t('download_failed'));
    } finally {
      setDownloadingImageId(null);
    }
  };

  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container">
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <Card>
              <CardHeader>
                {srOnlyTitle && <h2 className="sr-only">{srOnlyTitle}</h2>}
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                  <Wand className="h-5 w-5" />
                  {t('title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 pb-8">
                {/* Style Selection Grid */}
                <div className="space-y-2">
                  <Label>{t('select_style')}</Label>
                  <div className="grid grid-cols-3 gap-2">
                    {CARICATURE_STYLES.map((style) => (
                      <button
                        key={style.key}
                        type="button"
                        onClick={() => setSelectedStyle(style)}
                        className={cn(
                          'hover:border-primary/50 flex flex-col items-center gap-1 rounded-lg border-2 p-2 transition-all',
                          selectedStyle.key === style.key
                            ? 'border-primary bg-primary/5 shadow-sm'
                            : 'border-border'
                        )}
                      >
                        <div className="bg-muted relative h-16 w-full overflow-hidden rounded-md">
                          <LazyImage
                            src={style.thumbnail}
                            alt={style.label}
                            className="h-full w-full object-cover object-top"
                            wrapperClassName="!block h-full w-full"
                          />
                        </div>
                        <span className="text-center text-xs leading-tight font-medium">
                          {style.label}
                        </span>
                      </button>
                    ))}
                  </div>
                  <p className="text-muted-foreground text-xs">
                    {selectedStyle.description}
                  </p>
                </div>

                {/* Aspect Ratio */}
                <div className="space-y-2">
                  <Label htmlFor="aspect-ratio">{t('aspect_ratio')}</Label>
                  <Select value={aspectRatio} onValueChange={setAspectRatio}>
                    <SelectTrigger id="aspect-ratio" className="w-full">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {ASPECT_RATIOS.map((ratio) => (
                        <SelectItem key={ratio.value} value={ratio.value}>
                          {t(ratio.labelKey)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Photo Upload */}
                <div className="space-y-4">
                  <ImageUploader
                    title={t('upload_photo')}
                    allowMultiple={false}
                    maxImages={1}
                    maxSizeMB={5}
                    onChange={handleReferenceImagesChange}
                    emptyHint={t('upload_photo_hint')}
                  />

                  {hasReferenceUploadError && (
                    <p className="text-destructive text-xs">
                      {t('upload_error')}
                    </p>
                  )}
                </div>

                {/* Optional Details */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">
                    {t('optional_details')}
                  </Label>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <div className="space-y-1">
                      <Label
                        htmlFor="job-title"
                        className="text-muted-foreground text-xs"
                      >
                        {t('job_title')}
                      </Label>
                      <Input
                        id="job-title"
                        value={jobTitle}
                        onChange={(e) => setJobTitle(e.target.value)}
                        placeholder={t('job_title_placeholder')}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="hobbies"
                        className="text-muted-foreground text-xs"
                      >
                        {t('hobbies')}
                      </Label>
                      <Input
                        id="hobbies"
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
                        placeholder={t('hobbies_placeholder')}
                        className="h-8 text-sm"
                      />
                    </div>
                    <div className="space-y-1">
                      <Label
                        htmlFor="personality"
                        className="text-muted-foreground text-xs"
                      >
                        {t('personality')}
                      </Label>
                      <Input
                        id="personality"
                        value={personality}
                        onChange={(e) => setPersonality(e.target.value)}
                        placeholder={t('personality_placeholder')}
                        className="h-8 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Additional Prompt */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="additional-prompt">
                      {t('additional_details')}
                    </Label>
                    {additionalPrompt && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-muted-foreground hover:text-foreground h-6 px-2 text-xs"
                        onClick={() => setAdditionalPrompt('')}
                      >
                        <Eraser className="mr-1 h-3 w-3" />
                        Clear
                      </Button>
                    )}
                  </div>
                  <Textarea
                    id="additional-prompt"
                    value={additionalPrompt}
                    onChange={(e) => setAdditionalPrompt(e.target.value)}
                    placeholder={t('additional_details_placeholder')}
                    className="min-h-16"
                  />
                </div>

                {/* Generate Button */}
                {!isMounted ? (
                  <Button className="w-full" disabled size="lg">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('loading')}
                  </Button>
                ) : isCheckSign ? (
                  <Button className="w-full" disabled size="lg">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {t('checking_account')}
                  </Button>
                ) : user ? (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleGenerate}
                    disabled={
                      isGenerating ||
                      isLoadingCredits ||
                      isLoadingProviders ||
                      isReferenceUploading ||
                      hasReferenceUploadError ||
                      referenceImageUrls.length === 0 ||
                      (!isLoadingCredits && remainingCredits < COST_CREDITS)
                    }
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('generating')}
                      </>
                    ) : isLoadingProviders ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        {t('loading')}
                      </>
                    ) : (
                      <>
                        <Sparkles className="mr-2 h-4 w-4" />
                        {t('generate')}
                      </>
                    )}
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="w-full"
                    onClick={() => setIsShowSignModal(true)}
                  >
                    <User className="mr-2 h-4 w-4" />
                    {t('sign_in_to_generate')}
                  </Button>
                )}

                {/* Credits Info */}
                {!isMounted || isLoadingCredits || isLoadingProviders ? (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary">
                      {t('credits_cost', { credits: COST_CREDITS })}
                    </span>
                    <span className="flex items-center gap-2">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      {t('credits_remaining', { credits: 0 })}
                    </span>
                  </div>
                ) : user && remainingCredits > 0 ? (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-primary">
                      {t('credits_cost', { credits: COST_CREDITS })}
                    </span>
                    <span>
                      {t('credits_remaining', { credits: remainingCredits })}
                    </span>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-primary">
                        {t('credits_cost', { credits: COST_CREDITS })}
                      </span>
                      <span>
                        {t('credits_remaining', { credits: remainingCredits })}
                      </span>
                    </div>
                    <Link href="/pricing">
                      <Button variant="outline" className="w-full" size="lg">
                        <CreditCard className="mr-2 h-4 w-4" />
                        {t('buy_credits')}
                      </Button>
                    </Link>
                  </div>
                )}

                {/* Progress Bar */}
                {isGenerating && (
                  <div className="space-y-2 rounded-lg border p-4">
                    <div className="flex items-center justify-between text-sm">
                      <span>{t('progress')}</span>
                      <span>{progress}%</span>
                    </div>
                    <Progress value={progress} />
                    {taskStatusLabel && (
                      <p className="text-muted-foreground text-center text-xs">
                        {taskStatusLabel}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Result Panel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-xl font-semibold">
                  <ImageIcon className="h-5 w-5" />
                  {t('result_title')}
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-8">
                {isGenerating ? (
                  <div className="flex h-[500px] w-full items-center justify-center overflow-hidden rounded-lg border">
                    <LoadingAnimation />
                  </div>
                ) : generatedImages.length > 0 ? (
                  <div
                    className={
                      generatedImages.length === 1
                        ? 'grid grid-cols-1 gap-6'
                        : 'grid gap-6 sm:grid-cols-2'
                    }
                  >
                    {generatedImages.map((image) => (
                      <div key={image.id} className="space-y-3">
                        <div
                          className={
                            generatedImages.length === 1
                              ? 'relative overflow-hidden rounded-lg border'
                              : 'relative aspect-square overflow-hidden rounded-lg border'
                          }
                        >
                          <LazyImage
                            src={image.url}
                            alt={image.prompt || 'Generated caricature'}
                            className={cn(
                              generatedImages.length === 1
                                ? 'h-auto w-full'
                                : 'h-full w-full object-cover',
                              imagesLoadingState[image.id] === 'loading' &&
                                'opacity-0'
                            )}
                            onLoad={() => {
                              setImagesLoadingState((prev) => ({
                                ...prev,
                                [image.id]: 'loaded',
                              }));
                            }}
                            onError={() => {
                              setImagesLoadingState((prev) => ({
                                ...prev,
                                [image.id]: 'error',
                              }));
                            }}
                          />

                          {(imagesLoadingState[image.id] === 'loading' ||
                            !imagesLoadingState[image.id]) && (
                            <div className="bg-muted/20 absolute inset-0 flex items-center justify-center">
                              <Loader2 className="text-muted-foreground h-8 w-8 animate-spin" />
                            </div>
                          )}

                          {imagesLoadingState[image.id] === 'error' && (
                            <div className="bg-muted/20 absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                              <p className="text-destructive text-sm">
                                {t('failed_to_load_image')}
                              </p>
                            </div>
                          )}

                          <div className="absolute right-2 bottom-2 flex justify-end text-sm">
                            <Button
                              size="sm"
                              variant="ghost"
                              className="ml-auto"
                              onClick={() => handleDownloadImage(image)}
                              disabled={
                                downloadingImageId === image.id ||
                                imagesLoadingState[image.id] !== 'loaded'
                              }
                            >
                              {downloadingImageId === image.id ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                              ) : (
                                <Download className="h-4 w-4" />
                              )}
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-4">
                    <div className="relative w-full overflow-hidden rounded-lg border">
                      <LazyImage
                        src="/example/classic-style.png"
                        alt="Example caricature"
                        className="h-auto w-full"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground text-sm">
                        {t('no_images_generated')}
                      </p>
                      <p className="text-muted-foreground mt-1 text-xs">
                        {t('upload_and_generate_hint')}
                      </p>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
