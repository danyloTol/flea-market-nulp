import { useState } from 'react'
import {
  CalendarDays,
  GraduationCap,
  Image as ImageIcon,
  Mail,
  MapPin,
  PackageOpen,
  Plus,
  Send,
  UserRound,
} from 'lucide-react'
import { Link } from 'react-router-dom'

export type StudentProfile = {
  name: string
  email?: string | null
  telegram?: string | null
  institute?: string | null
  avatarUrl?: string | null
}

export type ListingStatus = 'active' | 'pending' | 'sold' | 'rejected' | 'draft'

export type StudentListing = {
  id: string | number
  title: string
  price: number
  status: ListingStatus
  imageUrl?: string | null
  location?: string | null
  createdAt?: string | null
}

type ProfilePageProps = {
  student?: StudentProfile | null
  listings?: readonly StudentListing[]
  isDemo?: boolean
}

type StatusFilter = 'all' | ListingStatus

const statusInfo: Record<ListingStatus, { label: string; classes: string }> = {
  active: { label: 'Активне', classes: 'bg-emerald-50 text-emerald-700 ring-emerald-200' },
  pending: { label: 'На перевірці', classes: 'bg-amber-50 text-amber-700 ring-amber-200' },
  sold: { label: 'Продано', classes: 'bg-slate-100 text-slate-700 ring-slate-200' },
  rejected: { label: 'Відхилено', classes: 'bg-red-50 text-red-700 ring-red-200' },
  draft: { label: 'Чернетка', classes: 'bg-blue-50 text-blue-700 ring-blue-200' },
}

const statusFilters: readonly { value: StatusFilter; label: string }[] = [
  { value: 'all', label: 'Усі' },
  { value: 'active', label: 'Активні' },
  { value: 'pending', label: 'На перевірці' },
  { value: 'sold', label: 'Продані' },
  { value: 'rejected', label: 'Відхилені' },
  { value: 'draft', label: 'Чернетки' },
]

const priceFormatter = new Intl.NumberFormat('uk-UA', {
  style: 'currency',
  currency: 'UAH',
  maximumFractionDigits: 0,
})

const dateFormatter = new Intl.DateTimeFormat('uk-UA', {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
})

function displayDate(value: string | null | undefined): string | null {
  if (!value) return null
  const date = new Date(value)
  return Number.isNaN(date.getTime()) ? null : dateFormatter.format(date)
}

function ProfileValue({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof UserRound
  label: string
  value: string | null | undefined
}) {
  return (
    <div className="flex min-w-0 items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-white text-[#244393] ring-1 ring-slate-200">
        <Icon aria-hidden="true" className="size-[18px]" />
      </span>
      <div className="min-w-0">
        <dt className="text-xs font-medium text-slate-500">{label}</dt>
        <dd className="mt-1 break-words text-sm font-medium text-slate-900">
          {value?.trim() || 'Не вказано'}
        </dd>
      </div>
    </div>
  )
}

function ListingCard({ listing }: { listing: StudentListing }) {
  const date = displayDate(listing.createdAt)
  const imageUrl = listing.imageUrl?.trim()
  const { label, classes } = statusInfo[listing.status]

  return (
    <article className="flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-shadow hover:shadow-md sm:flex-row">
      <div className="flex h-44 w-full shrink-0 items-center justify-center bg-slate-100 sm:h-auto sm:w-44">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={listing.title}
            loading="lazy"
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-400">
            <ImageIcon aria-hidden="true" className="size-9" strokeWidth={1.4} />
            <span className="text-xs">Без фото</span>
          </div>
        )}
      </div>
      <div className="flex min-w-0 flex-1 flex-col gap-3 p-4 sm:p-5">
        <div className="flex flex-wrap items-start justify-between gap-2">
          <h3 className="min-w-0 flex-1 break-words text-base font-semibold text-slate-900 sm:text-lg">
            {listing.title}
          </h3>
          <span className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${classes}`}>
            {label}
          </span>
        </div>
        <p className="text-lg font-bold text-[#244393] sm:text-xl">
          {listing.price === 0 ? 'Безкоштовно' : priceFormatter.format(listing.price)}
        </p>
        <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs text-slate-500">
          {listing.location && (
            <span className="inline-flex items-center gap-1.5">
              <MapPin aria-hidden="true" className="size-4" />
              {listing.location}
            </span>
          )}
          {date && (
            <span className="inline-flex items-center gap-1.5">
              <CalendarDays aria-hidden="true" className="size-4" />
              {date}
            </span>
          )}
        </div>
        <Link
          to={`/product/${encodeURIComponent(String(listing.id))}`}
          className="mt-auto inline-flex w-fit items-center rounded-lg text-sm font-semibold text-[#244393] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#244393]"
        >
          Переглянути оголошення
        </Link>
      </div>
    </article>
  )
}

export default function ProfilePage({
  student = null,
  listings = [],
  isDemo = false,
}: ProfilePageProps) {
  const [filter, setFilter] = useState<StatusFilter>('all')
  const filteredListings = listings.filter(
    (listing) => filter === 'all' || listing.status === filter,
  )

  if (!student) {
    return (
      <div className="mx-auto flex min-h-[50vh] w-full max-w-7xl items-center justify-center px-4 py-14 sm:px-6 lg:px-8">
        <section className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white px-6 py-12 text-center shadow-sm sm:px-10">
          <span className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-blue-50 text-[#244393]">
            <UserRound aria-hidden="true" className="size-8" />
          </span>
          <h1 className="mt-6 text-2xl font-bold tracking-tight text-slate-900">Особистий профіль</h1>
          <p className="mt-3 text-sm leading-6 text-slate-600">
            Увійдіть, щоб переглядати свої дані та статуси оголошень.
          </p>
          <Link
            to="/login"
            className="mt-7 inline-flex min-h-11 items-center justify-center rounded-xl bg-[#244393] px-6 text-sm font-semibold text-white transition-colors hover:bg-[#1c3474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244393]"
          >
            Увійти
          </Link>
        </section>
      </div>
    )
  }

  const initials = student.name.trim().charAt(0).toUpperCase() || '?'

  return (
    <div className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 sm:py-10 lg:px-8">
      <nav aria-label="Навігаційний ланцюжок" className="mb-6 flex items-center gap-2 text-sm text-slate-500">
        <Link to="/" className="rounded hover:text-[#244393] hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244393]">
          Головна
        </Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page" className="font-medium text-slate-900">Мій профіль</span>
      </nav>

      {isDemo && (
        <p className="mb-5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm text-blue-900">
          Демонстраційний профіль: усі дані та оголошення на цій сторінці тестові.
        </p>
      )}

      <section aria-labelledby="student-heading" className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="h-20 bg-[#244393] sm:h-28" aria-hidden="true" />
        <div className="px-5 pb-6 sm:px-8 sm:pb-8">
          <div className="-mt-9 flex items-end gap-4">
            <div className="flex size-20 shrink-0 items-center justify-center overflow-hidden rounded-2xl border-4 border-white bg-blue-100 text-2xl font-bold text-[#244393] shadow-sm sm:size-24">
              {student.avatarUrl ? (
                <img src={student.avatarUrl} alt="" className="h-full w-full object-cover" />
              ) : (
                <span aria-hidden="true">{initials}</span>
              )}
            </div>
            <span className="pb-2 text-xs font-medium uppercase tracking-wider text-slate-500">Студентський профіль</span>
          </div>
          <h1 id="student-heading" className="mt-4 break-words text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            {student.name}
          </h1>
          <p className="mt-1 text-sm text-slate-500">Ваші контакти та інформація про навчання</p>
          <dl className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            <ProfileValue icon={Mail} label="Електронна пошта" value={student.email} />
            <ProfileValue icon={Send} label="Telegram" value={student.telegram} />
            <ProfileValue icon={GraduationCap} label="Інститут" value={student.institute} />
          </dl>
        </div>
      </section>

      <section aria-labelledby="listings-heading" className="mt-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm sm:mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-200 px-5 py-5 sm:px-8">
          <div>
            <h2 id="listings-heading" className="text-lg font-bold text-slate-900 sm:text-xl">Мої оголошення</h2>
            <p className="mt-1 text-sm text-slate-500">Усього: {listings.length}</p>
          </div>
          <Link
            to="/create"
            className="inline-flex min-h-10 items-center gap-2 rounded-xl bg-[#244393] px-4 text-sm font-semibold text-white transition-colors hover:bg-[#1c3474] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244393]"
          >
            <Plus aria-hidden="true" className="size-4" />
            Подати оголошення
          </Link>
        </div>

        <div className="border-b border-slate-100 px-5 pt-4 sm:px-8">
          <div className="inline-flex border-b-2 border-[#244393] pb-3 text-sm font-semibold text-[#244393]">
            Мої оголошення
          </div>
        </div>
        <div className="px-5 pt-5 sm:px-8">
          <div aria-label="Фільтр за статусом" className="flex flex-wrap gap-2">
            {statusFilters.map(({ value, label }) => {
              const selected = filter === value
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => setFilter(value)}
                  className={`min-h-9 rounded-full border px-3 py-1.5 text-xs font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244393] sm:text-sm ${selected ? 'border-[#244393] bg-[#244393] text-white' : 'border-slate-200 bg-white text-slate-600 hover:border-blue-200 hover:text-[#244393]'}`}
                >
                  {label}
                </button>
              )
            })}
          </div>
        </div>

        {filteredListings.length ? (
          <div className="grid gap-4 p-5 sm:p-8 lg:grid-cols-2">
            {filteredListings.map((listing) => <ListingCard key={listing.id} listing={listing} />)}
          </div>
        ) : (
          <div className="flex flex-col items-center px-6 py-14 text-center sm:py-20">
            <span className="flex size-16 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
              <PackageOpen aria-hidden="true" className="size-8" strokeWidth={1.5} />
            </span>
            <h3 className="mt-5 text-lg font-semibold text-slate-900">
              {filter === 'all' ? 'У вас ще немає оголошень' : 'Немає оголошень із таким статусом'}
            </h3>
            <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
              {filter === 'all'
                ? 'Створіть перше оголошення, щоб воно з’явилося тут.'
                : 'Спробуйте вибрати інший статус або переглянути всі оголошення.'}
            </p>
            {filter !== 'all' && (
              <button
                type="button"
                onClick={() => setFilter('all')}
                className="mt-5 rounded-lg text-sm font-semibold text-[#244393] underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#244393]"
              >
                Показати всі
              </button>
            )}
          </div>
        )}
      </section>
    </div>
  )
}
