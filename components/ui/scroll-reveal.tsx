'use client'

import { useRef, ReactNode } from 'react'
import { motion, useInView, type Variant } from 'framer-motion'

type Direction = 'up' | 'down' | 'left' | 'right'

const directionOffsets: Record<Direction, { x: number; y: number }> = {
  up: { x: 0, y: 40 },
  down: { x: 0, y: -40 },
  left: { x: 40, y: 0 },
  right: { x: -40, y: 0 },
}

interface ScrollRevealProps {
  children: ReactNode
  direction?: Direction
  delay?: number
  duration?: number
  className?: string
  once?: boolean
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.6,
  className,
  once = true,
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once, margin: '-60px' })

  const offset = directionOffsets[direction]

  const hidden: Variant = {
    opacity: 0,
    x: offset.x,
    y: offset.y,
  }

  const visible: Variant = {
    opacity: 1,
    x: 0,
    y: 0,
    transition: {
      duration,
      delay,
      ease: [0.25, 0.4, 0.25, 1],
    },
  }

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      className={className}
    >
      {children}
    </motion.div>
  )
}
