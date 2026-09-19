import { cn } from '@/lib/utils'
import type { ReactNode } from 'react'

interface MarqueeTextProps {
  children: ReactNode
  speed?: number // seconds for one full cycle
  direction?: 'left' | 'right'
  className?: string
  pauseOnHover?: boolean
}

export default function MarqueeText({
  children,
  speed = 30,
  direction = 'left',
  className = '',
  pauseOnHover = true,
}: MarqueeTextProps) {
  return (
    <div
      className={cn('overflow-hidden', pauseOnHover && 'group', className)}
    >
      <div
        className={cn(
          'flex gap-8 whitespace-nowrap',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
        style={{
          animation: `marquee ${speed}s linear infinite`,
          animationDirection: direction === 'right' ? 'reverse' : 'normal',
        }}
      >
        <div className="flex gap-8 shrink-0">{children}</div>
        <div className="flex gap-8 shrink-0" aria-hidden>{children}</div>
      </div>
    </div>
  )
}
