import { cn } from '@/lib/cn'
import { ComponentPropsWithoutRef } from 'react'

export const DotIcon = ({ className, ...props }: Pick<ComponentPropsWithoutRef<'svg'>, 'className'>) => {
  return (
    <svg className={cn('block', className)} viewBox="0 0 24 24" color="currentColor" {...props}>
      <circle cx="12" cy="12" r="6" fill="currentColor" />
    </svg>
  )
}
