import { useState } from 'react'
import { Heart, MapPin } from 'lucide-react'

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
  month: 'short',
  year: 'numeric',
})

export default function ProductCard({ product }: ProductCardProps) {
  const [failedImageUrl, setFailedImageUrl] = useState<string | null>(null)
  const [favoriteProductId, setFavoriteProductId] = useState<string | number | null>(null)
  const [today] = useState(() => new Date().toDateString())
  const isFavorite = favoriteProductId === product.id
  const imageUrl = product.imageUrl?.trim()
  const publishedAt = new Date(product.createdAt)
  const hasValidDate = !Number.isNaN(publishedAt.getTime())

  return (
    <article
      className="@container relative flex aspect-[262/350] w-full min-w-0 flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-shadow duration-200 hover:shadow-lg motion-reduce:transition-none"
    >
      <div className="relative aspect-[262/196] w-full shrink-0 overflow-hidden bg-gray-100">
        {imageUrl && imageUrl !== failedImageUrl ? (
          <img
            src={imageUrl}
            alt={product.title}
            loading="lazy"
            decoding="async"
            onError={() => setFailedImageUrl(imageUrl)}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-[3cqw] text-gray-500">
            <svg
              aria-hidden="true"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-[15cqw]"
            >
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="m21 15-5-5L5 21" />
            </svg>
            <span className="text-[4.58cqw]">Фото відсутнє</span>
          </div>
        )}

        <button
          type="button"
          aria-label={isFavorite ? 'Видалити з обраного' : 'Додати до обраного'}
          aria-pressed={isFavorite}
          onClick={() => setFavoriteProductId(isFavorite ? null : product.id)}
          className="absolute top-[4.58cqw] right-[4.58cqw] z-10 flex size-[12.21cqw] cursor-pointer items-center justify-center rounded-full bg-white text-gray-700 shadow-sm transition-colors hover:text-red-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        >
          <Heart
            aria-hidden="true"
            className={`size-[7.63cqw] ${isFavorite ? 'fill-red-500 text-red-500' : ''}`}
          />
        </button>
      </div>

      <div className="flex min-h-0 flex-1 flex-col p-[5.34cqw]">
        <p className="truncate text-[4.58cqw] leading-tight text-gray-500">
          {product.category}
        </p>

        <h3 className="mt-[3.05cqw] truncate text-[5.34cqw] leading-tight font-semibold text-black">
          <a
            href={`/product/${encodeURIComponent(String(product.id))}`}
            className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:rounded-xl focus-visible:after:outline-2 focus-visible:after:-outline-offset-2 focus-visible:after:outline-blue-600"
          >
            {product.title}
          </a>
        </h3>

        <p className="mt-[4.58cqw] truncate text-[7.63cqw] leading-tight font-bold text-black">
          {product.price === 0
            ? 'Безкоштовно'
            : priceFormatter.format(product.price)}
        </p>

        <div className="mt-auto flex items-center justify-between gap-[3.05cqw] pt-[3.05cqw] text-[4.2cqw] leading-tight text-gray-500">
          <p className="flex min-w-0 items-center gap-[1.53cqw]">
            <MapPin aria-hidden="true" className="size-[5.34cqw] shrink-0" />
            <span className="truncate">{product.location}</span>
          </p>

          {hasValidDate ? (
            <time dateTime={publishedAt.toISOString()} className="shrink-0 whitespace-nowrap">
              {publishedAt.toDateString() === today
                ? 'Сьогодні'
                : dateFormatter.format(publishedAt)}
            </time>
          ) : (
            <span className="shrink-0">Дата невідома</span>
          )}
        </div>
      </div>
    </article>
  )
}
