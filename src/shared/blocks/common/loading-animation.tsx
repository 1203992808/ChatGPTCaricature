'use client';

import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

export function LoadingAnimation() {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center space-y-4 bg-muted/5 p-8">
      <div className="relative">
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-primary/20 to-primary/0 blur-xl"
        />
        <div className="relative flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-background to-muted shadow-lg ring-1 ring-border/50">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <Sparkles className="h-8 w-8 text-primary" />
          </motion.div>
        </div>
      </div>
      
      <div className="space-y-1 text-center">
        <motion.h3
          initial={{ opacity: 0, y: 5 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-lg font-medium tracking-tight"
        >
          Generating Magic
        </motion.h3>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="text-muted-foreground text-sm"
        >
          Creating your masterpiece...
        </motion.p>
      </div>

      <div className="flex gap-1">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-primary/50"
            animate={{
              scale: [1, 1.5, 1],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
              delay: i * 0.2,
            }}
          />
        ))}
      </div>
    </div>
  );
}
