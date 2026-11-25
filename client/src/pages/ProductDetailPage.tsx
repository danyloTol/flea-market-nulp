import { useState } from 'react'
import { ArrowLeft, GraduationCap, ImageOff, MapPin, Send, UserRound } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { demoProducts } from '../data/demoProducts'
import type { ProductImage } from '../data/demoProducts'

const priceFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 2,
})

function ProductPhoto({ image, thumbnail = false }: { image: ProductImage; thumbnail?: boolean }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <span className="flex h-full w-full flex-col items-center justify-center gap-3 bg-slate-100 text-slate-500">
        <ImageOff aria-hidden="true" className={thumbnail ? 'size-6' : 'size-12'} />
        {!thumbnail && <span className="text-sm">Не вдалося завантажити фото</span>}
      </span>
    )
  }

  return (
    <img
      src={image.url}
      alt={thumbnail ? '' : image.alt}
      loading={thumbnail ? 'lazy' : 'eager'}
      decoding="async"
      onError={() => setFailed(true)}
      className={`h-full w-full ${thumbnail ? 'object-cover' : 'object-contain'}`}
    />
  )
}

function ProductGallery({ images }: { images: readonly ProductImage[] }) {
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex]

  return (
    <section aria-label="Фотографії товару" className="min-w-0">
      <div className="relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-slate-200 bg-white">
        {selectedImage ? (
          <ProductPhoto key={selectedImage.url} image={selectedImage} />
        ) : (
          <div className="flex flex-col items-center gap-3 text-slate-500">
            <ImageOff aria-hidden="true" className="size-12" />
            <span>Фото відсутнє</span>
          </div>
        )}
        {images.length > 0 && (
          <span className="absolute right-3 bottom-3 rounded-full bg-slate-900/75 px-3 py-1 text-sm text-white" aria-live="polite" aria-atomic="true">
            Фото {selectedIndex + 1} з {images.length}
          </span>
        )}
      </div>

      {images.length > 1 && (
        <div role="group" aria-label="Вибрати фотографію" className="mt-4 flex flex-wrap gap-3">
          {images.map((image, index) => (
            <button
              key={image.url}
              type="button"
              aria-label={`Фото ${index + 1}: ${image.alt}`}
              aria-pressed={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
              className={`size-20 cursor-pointer overflow-hidden rounded-xl border-2 bg-white transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244393] sm:size-24 ${
                selectedIndex === index
                  ? 'border-[#244393] ring-2 ring-[#244393]/15'
                  : 'border-slate-200 hover:border-slate-400'
              }`}
            >
              <ProductPhoto image={image} thumbnail />
            </button>
          ))}
        </div>
      )}
    </section>
  )
}

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>()
  const product = demoProducts.find((item) => item.id === id)

  if (!product) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-20 text-center sm:px-6">
        <h1 className="text-2xl font-bold text-slate-900">Товар не знайдено</h1>
        <p className="mt-3 text-slate-600">Оголошення з таким номером відсутнє або було видалене.</p>
        <Link to="/" className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 font-medium text-[#244393] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244393]">
          <ArrowLeft aria-hidden="true" className="size-4" />
          На головну
        </Link>
      </div>
    )
  }

  return (
    <article className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-10 lg:px-8">
      <Link to="/" className="inline-flex min-h-11 items-center gap-2 rounded-lg text-sm font-medium text-slate-600 hover:text-[#244393] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244393]">
        <ArrowLeft aria-hidden="true" className="size-4" />
        На головну
      </Link>

      <p className="mt-3 mb-6 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm leading-6 text-blue-900">
        Демонстраційне оголошення. Фотографії ілюстративні, дані продавця та Telegram-контакт — тестові.
      </p>

      <div className="grid min-w-0 items-start gap-8 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-10">
        <ProductGallery key={product.id} images={product.images} />

        <div className="min-w-0 space-y-6">
          <div>
            <h1 className="text-2xl leading-tight font-bold break-words text-slate-900 sm:text-3xl">{product.title}</h1>
            <p className="mt-4 text-3xl font-bold text-[#244393] sm:text-4xl">
              {product.price === 0 ? 'Безкоштовно' : priceFormatter.format(product.price)}
            </p>
          </div>

          <dl className="space-y-5 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div>
              <dt className="text-sm text-slate-500">Стан товару</dt>
              <dd className="mt-1 font-medium text-slate-900">{product.condition}</dd>
            </div>
            <div>
              <dt className="flex items-center gap-2 text-sm text-slate-500">
                <MapPin aria-hidden="true" className="size-4 shrink-0" />
                Місце передачі
              </dt>
              <dd className="mt-1 leading-6 text-slate-900">{product.location}</dd>
            </div>
          </dl>

          <section aria-labelledby="seller-heading" className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <h2 id="seller-heading" className="text-lg font-semibold text-slate-900">Продавець</h2>
            <div className="mt-4 flex items-start gap-3">
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-blue-50 text-[#244393]">
                <UserRound aria-hidden="true" className="size-6" />
              </span>
              <div className="min-w-0">
                <p className="font-semibold break-words text-slate-900">{product.seller.name}</p>
                <dl className="mt-2 space-y-2 text-sm leading-6 text-slate-600">
                  <div>
                    <dt className="flex items-center gap-1.5 font-medium text-slate-700">
                      <GraduationCap aria-hidden="true" className="size-4 shrink-0" />
                      Інститут
                    </dt>
                    <dd className="break-words">{product.seller.institute}</dd>
                  </div>
                  <div className="flex flex-wrap gap-x-1">
                    <dt className="font-medium text-slate-700">Група:</dt>
                    <dd>{product.seller.group}</dd>
                  </div>
                </dl>
              </div>
            </div>

            <a
              href={`https://t.me/${product.seller.telegramUsername.replace(/^@/, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Написати в Telegram (відкриється в новій вкладці)"
              className="mt-6 flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#244393] px-4 py-3 text-center font-semibold text-white transition-colors hover:bg-[#1b3270] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244393]"
            >
              <Send aria-hidden="true" className="size-5 shrink-0" />
              Написати в Telegram
            </a>
          </section>
        </div>

        <section aria-labelledby="description-heading" className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 sm:p-6 lg:col-span-2">
          <h2 id="description-heading" className="text-xl font-semibold text-slate-900">Опис товару</h2>
          <p className="mt-4 leading-7 whitespace-pre-line break-words text-slate-700">{product.description}</p>
        </section>
      </div>
    </article>
  )
}
