import { useState } from 'react'
import { MapPin } from 'lucide-react'

export interface ProductCardProps {
  product: {
    id: string | number
    title: string
    price: number
    imageUrl?: string | null
    location: string
    category: string
    createdAt: string
  }
}

const priceFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 2,
})

const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
})

export default function ProductCard({ product }: ProductCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const imageUrl = product.imageUrl?.trim()
  const publishedAt = new Date(product.createdAt)
  const hasValidDate = !Number.isNaN(publishedAt.getTime())

  return (
    <a
      href={`/product/${encodeURIComponent(String(product.id))}`}
      className="flex h-full min-w-0 cursor-pointer flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-blue-600 motion-reduce:transform-none motion-reduce:transition-none"
    >
      <div className="relative h-48 w-full shrink-0 overflow-hidden rounded-t-lg bg-gray-100">
        {imageUrl && imageUrl !== failedImageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            loading="lazy"
            decoding="async"
            onError={() => setFailedImageUrl(imageUrl)}
            className="h-48 w-full rounded-t-lg object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-2 text-gray-500">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-10"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span className="text-sm">Фото відсутнє</span>
          </div>
        )}

        <div className="absolute inset-x-3 top-3 flex">
          <span className="max-w-full truncate rounded-full bg-white/95 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm">
            {product.category}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 p-4">
        <p className="text-lg font-bold text-blue-600">
          {product.price === 0
            ? 'Безкоштовно'
            : priceFormatter.format(product.price)}
        </p>

        <h3 className="line-clamp-1 font-medium text-gray-900">
          {product.title}
        </h3>

        <div className="mt-auto flex flex-col gap-2 text-sm text-gray-500">
          <p className="flex min-w-0 items-center gap-1.5">
            <MapPin aria-hidden="true" className="size-4 shrink-0" />
            <span className="truncate">{product.location}</span>
          </p>

          {hasValidDate ? (
            <time dateTime={publishedAt.toISOString()} className="text-xs">
              Опубліковано {dateFormatter.format(publishedAt)}
            </time>
          ) : (
            <span className="text-xs">Дата публікації невідома</span>
          )}
        </div>
      </div>
    </a>
  )
}
