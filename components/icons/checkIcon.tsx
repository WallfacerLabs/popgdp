import { cn } from '@/lib/cn'
import { ComponentPropsWithoutRef } from 'react'

export const CheckIcon = ({ className, ...props }: Pick<ComponentPropsWithoutRef<'svg'>, 'className'>) => {
  return (
    <svg className={cn('block', className)} viewBox="0 -960 960 960" color="currentColor" {...props}>
      <path
        d="m382-354 339-339q12-12 28.5-12t28.5 12q12 12 12 28.5T778-636L410-268q-12 12-28 12t-28-12L182-440q-12-12-11.5-28.5T183-497q12-12 28.5-12t28.5 12l142 143Z"
        fill="currentColor"
      />
    </svg>
  )
}
