import { cn } from '@/lib/cn'
import { iconDirections } from '@/lib/iconDirection'
import type { IconDirection } from '@/lib/iconDirection'
import { ComponentPropsWithoutRef } from 'react'

export const ChevronIcon = ({ direction, className, ...props }: Pick<ComponentPropsWithoutRef<'svg'>, 'className'> & IconDirection) => {
  return (
    <svg className={cn('block', className)} viewBox="0 -960 960 960" color="currentColor" {...props}>
      <g style={{ transformBox: 'fill-box' }} className={iconDirections({ direction })}>
        <path
          d="M504-480 348-636q-11-11-11-28t11-28q11-11 28-11t28 11l184 184q6 6 8.5 13t2.5 15q0 8-2.5 15t-8.5 13L404-268q-11 11-28 11t-28-11q-11-11-11-28t11-28l156-156Z"
          fill="currentColor"
        />
      </g>
    </svg>
  )
}
