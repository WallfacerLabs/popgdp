import { cn } from '@/lib/cn'
import { ComponentPropsWithoutRef } from 'react'

export const ComputerIcon = ({ className, ...props }: Pick<ComponentPropsWithoutRef<'svg'>, 'className'>) => {
  return (
    <svg className={cn('block', className)} viewBox="0 -960 960 960" color="currentColor" {...props}>
      <path
        d="M80-120q-17 0-28.5-11.5T40-160q0-17 11.5-28.5T80-200h800q17 0 28.5 11.5T920-160q0 17-11.5 28.5T880-120H80Zm80-120q-33 0-56.5-23.5T80-320v-440q0-33 23.5-56.5T160-840h640q33 0 56.5 23.5T880-760v440q0 33-23.5 56.5T800-240H160Zm0-80h640v-440H160v440Zm0 0v-440 440Z"
        fill="currentColor"
      />
    </svg>
  )
}