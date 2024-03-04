import { cn } from '@/lib/cn'
import { ComponentPropsWithoutRef } from 'react'

export const CloudIcon = ({ className, ...props }: Pick<ComponentPropsWithoutRef<'svg'>, 'className'>) => {
  return (
    <svg className={cn('block', className)} viewBox="0 -960 960 960" color="currentColor" {...props}>
      <path
        d="M260-160q-91 0-155.5-63T40-377q0-78 47-139t123-78q25-92 100-149t170-57q117 0 198.5 81.5T760-520q69 8 114.5 59.5T920-340q0 75-52.5 127.5T740-160H260Zm0-80h480q42 0 71-29t29-71q0-42-29-71t-71-29h-60v-80q0-83-58.5-141.5T480-720q-83 0-141.5 58.5T280-520h-20q-58 0-99 41t-41 99q0 58 41 99t99 41Zm220-240Z"
        fill="currentColor"
      />
    </svg>
  )
}
