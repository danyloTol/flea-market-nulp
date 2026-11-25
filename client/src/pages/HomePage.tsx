import { useState, useMemo, type FC } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Heart } from 'lucide-react'
import { FilterSidebar } from '../components/ui/FilterSidebar'
import { type FilterState, INITIAL_FILTERS } from '../types/filters'
import { MOCK_PRODUCTS } from '../data/mockProducts'

const HomePage: FC = () => {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS)
  const [favorites, setFavorites] = useState<string[]>([])

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    )
  }

  const filteredProducts = useMemo(() => {
    return MOCK_PRODUCTS.filter((product) => {
      if (filters.category !== 'all' && product.category !== filters.category) {
        return false
      }
      if (filters.location !== 'all' && product.location !== filters.location) {
        return false
      }
      if (filters.onlyFree && product.price !== 0) {
        return false
      }
      if (filters.priceFrom !== '' && product.price < Number(filters.priceFrom)) {
        return false
      }
      if (filters.priceTo !== '' && product.price > Number(filters.priceTo)) {
        return false
      }
      return true
    })
  }, [filters])

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="flex flex-col lg:flex-row lg:items-start lg:gap-8">
        {/* Бічна панель фільтрації */}
        <FilterSidebar filters={filters} onChange={setFilters} />

        {/* Сітка товарів */}
        <section className="flex-1">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              Свіжі оголошення
            </h1>
            <p className="mt-1 text-sm text-gray-500">
              Знайдено оголошень: {filteredProducts.length}
            </p>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="rounded-2xl border border-gray-200 bg-white p-12 text-center shadow-xs">
              <p className="text-base font-medium text-gray-900">
                Нічого не знайдено за цими фільтрами
              </p>
              <p className="mt-1 text-sm text-gray-500">
                Спробуй змінити категорію, корпус або скинути фільтри.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => {
                const isFav = favorites.includes(product.id)

                return (
                  <article
                    key={product.id}
                    className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xs transition-all hover:border-gray-300 hover:shadow-md"
                  >
                    <div className="relative aspect-4/3 overflow-hidden bg-gray-100">
                      <Link to={`/product/${product.id}`}>
                        <img
                          src={product.imageUrl}
                          alt={product.title}
                          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                      </Link>

                      <button
                        type="button"
                        onClick={() => toggleFavorite(product.id)}
                        aria-label="Додати в обране"
                        className="absolute top-3 right-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-white/85 text-gray-700 shadow-xs backdrop-blur-xs transition-colors hover:bg-white"
                      >
                        <Heart
                          className={`h-4 w-4 ${
                            isFav ? 'fill-red-500 text-red-500' : 'text-gray-700'
                          }`}
                        />
                      </button>

                      {product.price === 0 && (
                        <span className="absolute bottom-3 left-3 rounded-lg bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white shadow-xs">
                          Віддам безкоштовно
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <span className="text-xs font-medium text-gray-500">
                        {product.categoryLabel}
                      </span>

                      <Link to={`/product/${product.id}`}>
                        <h2 className="mt-1 line-clamp-1 text-base font-semibold text-gray-900 transition-colors group-hover:text-blue-600">
                          {product.title}
                        </h2>
                      </Link>

                      <p className="mt-2 text-lg font-bold text-gray-900">
                        {product.price === 0
                          ? 'Безкоштовно'
                          : `${product.price} ₴`}
                      </p>

                      <div className="mt-3 flex items-center justify-between border-t border-gray-100 pt-3 text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                          <MapPin className="h-3.5 w-3.5 text-gray-400" />
                          {product.locationLabel}
                        </span>
                        <span>{product.createdAt}</span>
                      </div>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage
