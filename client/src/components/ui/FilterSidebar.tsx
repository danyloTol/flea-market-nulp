import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  SlidersHorizontal,
  RotateCcw,
  ChevronDown,
  Leaf,
  ArrowRight,
  LayoutGrid,
  BookOpen,
  Headphones,
  Lamp,
  Shirt,
  Dumbbell,
  X,
  type LucideIcon,
} from 'lucide-react';
import {
  type CategoryId,
  type FilterState,
  type LocationId,
  INITIAL_FILTERS,
} from '../../types/filters';

interface FilterSidebarProps {
  filters: FilterState;
  onChange: (updatedFilters: FilterState) => void;
  onReset?: () => void;
}

interface CategoryOption {
  id: CategoryId;
  label: string;
  icon: LucideIcon;
}

interface LocationOption {
  id: LocationId;
  label: string;
}

const CATEGORIES: CategoryOption[] = [
  { id: 'all', label: 'Усі категорії', icon: LayoutGrid },
  { id: 'books', label: 'Книги та конспекти', icon: BookOpen },
  { id: 'electronics', label: 'Техніка', icon: Headphones },
  { id: 'dorm', label: 'Для гуртожитку', icon: Lamp },
  { id: 'clothes', label: 'Одяг та аксесуари', icon: Shirt },
  { id: 'sport', label: 'Спорт та відпочинок', icon: Dumbbell },
];

const LOCATIONS: LocationOption[] = [
  { id: 'all', label: 'Усі локації' },
  { id: 'guk', label: 'Головний корпус (ГУК)' },
  { id: 'corpus-1', label: '1-й навчальний корпус' },
  { id: 'corpus-4', label: '4-й навчальний корпус' },
  { id: 'corpus-5', label: '5-й навчальний корпус' },
  { id: 'corpus-19', label: '19-й корпус (ІКНІ)' },
  { id: 'studmistechko', label: 'Студмістечко (загалом)' },
  { id: 'dorm-1', label: 'Гуртожиток №1' },
  { id: 'dorm-3', label: 'Гуртожиток №3' },
  { id: 'dorm-8', label: 'Гуртожиток №8' },
  { id: 'dorm-11', label: 'Гуртожиток №11' },
];

interface FilterFormProps {
  filters: FilterState;
  hasActiveFilters: boolean;
  onCategoryChange: (category: CategoryId) => void;
  onLocationChange: (location: LocationId) => void;
  onPriceChange: (field: 'priceFrom' | 'priceTo', value: string) => void;
  onOnlyFreeChange: (checked: boolean) => void;
  onReset: () => void;
}

const FilterForm: React.FC<FilterFormProps> = ({
  filters,
  hasActiveFilters,
  onCategoryChange,
  onLocationChange,
  onPriceChange,
  onOnlyFreeChange,
  onReset,
}) => (
  <div className="flex flex-col gap-6 text-zinc-200">
    <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4">
      <div className="flex items-center gap-2.5">
        <SlidersHorizontal className="h-4 w-4 text-zinc-400" />
        <h2 className="text-base font-semibold tracking-tight text-zinc-100">
          Фільтри
        </h2>
      </div>

      <button
        type="button"
        onClick={onReset}
        disabled={!hasActiveFilters}
        className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-100 disabled:pointer-events-none disabled:opacity-40"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Скинути фільтри</span>
      </button>
    </div>

    <fieldset className="flex flex-col gap-2">
      <legend className="mb-1.5 text-xs font-medium uppercase tracking-wider text-zinc-400">
        Категорія
      </legend>
      <div className="flex flex-col gap-1">
        {CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = filters.category === cat.id;

          return (
            <label
              key={cat.id}
              className={`group flex cursor-pointer items-center justify-between rounded-xl px-3 py-2.5 text-sm transition-all ${isSelected
                ? 'bg-zinc-800 font-medium text-white shadow-xs ring-1 ring-zinc-700'
                : 'text-zinc-400 hover:bg-zinc-900/90 hover:text-zinc-200'
                }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`h-4 w-4 transition-colors ${isSelected
                    ? 'text-amber-400'
                    : 'text-zinc-500 group-hover:text-zinc-300'
                    }`}
                />
                <span>{cat.label}</span>
              </div>

              <input
                type="radio"
                name="marketplace-category"
                value={cat.id}
                checked={isSelected}
                onChange={() => onCategoryChange(cat.id)}
                className="sr-only"
              />
              <span
                className={`flex h-4 w-4 items-center justify-center rounded-full border transition-colors ${isSelected
                  ? 'border-amber-400 bg-amber-400/10'
                  : 'border-zinc-700 group-hover:border-zinc-500'
                  }`}
              >
                {isSelected && (
                  <span className="h-2 w-2 rounded-full bg-amber-400" />
                )}
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>

    <div className="flex flex-col gap-2">
      <label
        htmlFor="location-select"
        className="text-xs font-medium uppercase tracking-wider text-zinc-400"
      >
        Локація передачі
      </label>
      <div className="relative">
        <select
          id="location-select"
          value={filters.location}
          onChange={(e) => onLocationChange(e.target.value as LocationId)}
          className="w-full cursor-pointer appearance-none rounded-xl border border-zinc-800 bg-zinc-900/90 px-3.5 py-2.5 pr-9 text-sm text-zinc-200 transition-colors hover:border-zinc-700 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50"
        >
          {LOCATIONS.map((loc) => (
            <option
              key={loc.id}
              value={loc.id}
              className="bg-zinc-900 text-zinc-200"
            >
              {loc.label}
            </option>
          ))}
        </select>
        <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-zinc-400" />
      </div>
    </div>

    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wider text-zinc-400">
        Ціна, ₴
      </span>

      <div className="grid grid-cols-2 gap-2.5">
        <input
          type="text"
          inputMode="numeric"
          placeholder="Від"
          aria-label="Ціна від"
          value={filters.priceFrom}
          disabled={filters.onlyFree}
          onChange={(e) => onPriceChange('priceFrom', e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-sm text-zinc-100 transition-colors placeholder:text-zinc-500 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50 disabled:cursor-not-allowed disabled:opacity-40"
        />
        <input
          type="text"
          inputMode="numeric"
          placeholder="До"
          aria-label="Ціна до"
          value={filters.priceTo}
          disabled={filters.onlyFree}
          onChange={(e) => onPriceChange('priceTo', e.target.value)}
          className="w-full rounded-xl border border-zinc-800 bg-zinc-900/90 px-3 py-2 text-sm text-zinc-100 transition-colors placeholder:text-zinc-500 hover:border-zinc-700 focus:border-zinc-600 focus:outline-none focus:ring-2 focus:ring-zinc-700/50 disabled:cursor-not-allowed disabled:opacity-40"
        />
      </div>

      <label className="group flex cursor-pointer items-center gap-2.5 pt-1 select-none">
        <div className="relative flex items-center justify-center">
          <input
            type="checkbox"
            checked={filters.onlyFree}
            onChange={(e) => onOnlyFreeChange(e.target.checked)}
            className="peer h-4 w-4 cursor-pointer appearance-none rounded border border-zinc-700 bg-zinc-900 transition-colors checked:border-amber-400 checked:bg-amber-400 hover:border-zinc-500 focus:outline-none focus:ring-2 focus:ring-amber-400/30"
          />
          <svg
            className="pointer-events-none absolute h-3 w-3 text-zinc-950 opacity-0 transition-opacity peer-checked:opacity-100"
            viewBox="0 0 14 14"
            fill="none"
          >
            <path
              d="M3 7.5L5.5 10L11 4"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <span className="text-sm text-zinc-300 transition-colors group-hover:text-white">
          Тільки безкоштовні
        </span>
      </label>
    </div>

    <div className="mt-2 rounded-2xl border border-zinc-800/90 bg-zinc-900/50 p-4">
      <div className="mb-2.5 inline-flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800/80 text-zinc-300">
        <Leaf className="h-4 w-4" />
      </div>
      <h3 className="text-sm font-semibold text-zinc-100">
        Речі заслуговують на друге життя
      </h3>
      <p className="mt-1 text-xs leading-relaxed text-zinc-400">
        Те, що вже не потрібно тобі, може стати знахідкою для когось із політехніків.
      </p>
      <Link
        to="/create"
        className="mt-3.5 inline-flex items-center gap-1.5 rounded-lg border border-zinc-700/80 bg-zinc-800/60 px-3 py-1.5 text-xs font-medium text-zinc-200 transition-colors hover:border-zinc-600 hover:bg-zinc-800 hover:text-white"
      >
        <span>Поділитися річчю</span>
        <ArrowRight className="h-3.5 w-3.5" />
      </Link>
    </div>
  </div>
);

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  filters,
  onChange,
  onReset,
}) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const hasActiveFilters =
    filters.category !== INITIAL_FILTERS.category ||
    filters.location !== INITIAL_FILTERS.location ||
    filters.priceFrom !== '' ||
    filters.priceTo !== '' ||
    filters.onlyFree;

  const handleCategoryChange = (category: CategoryId) => {
    onChange({ ...filters, category });
  };

  const handleLocationChange = (location: LocationId) => {
    onChange({ ...filters, location });
  };

  const handlePriceChange = (field: 'priceFrom' | 'priceTo', value: string) => {
    const sanitized = value.replace(/\D/g, '');
    onChange({
      ...filters,
      [field]: sanitized,
      onlyFree: sanitized !== '' ? false : filters.onlyFree,
    });
  };

  const handleOnlyFreeChange = (checked: boolean) => {
    onChange({
      ...filters,
      onlyFree: checked,
      priceFrom: checked ? '' : filters.priceFrom,
      priceTo: checked ? '' : filters.priceTo,
    });
  };

  const handleReset = () => {
    onChange(INITIAL_FILTERS);
    onReset?.();
  };

  return (
    <>
      <div className="mb-4 lg:hidden">
        <button
          type="button"
          onClick={() => setIsMobileOpen(true)}
          className="inline-flex items-center gap-2 rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-2.5 text-sm font-medium text-zinc-200 transition-colors hover:bg-zinc-800"
        >
          <SlidersHorizontal className="h-4 w-4 text-zinc-400" />
          <span>Фільтри</span>
          {hasActiveFilters && (
            <span className="ml-1 flex h-2 w-2 rounded-full bg-amber-400" />
          )}
        </button>
      </div>

      <aside
        aria-label="Фільтри оголошень"
        className="hidden w-68 shrink-0 lg:block"
      >
        <div className="sticky top-6 rounded-2xl border border-zinc-800/80 bg-zinc-950/60 p-5 backdrop-blur-sm">
          <FilterForm
            filters={filters}
            hasActiveFilters={hasActiveFilters}
            onCategoryChange={handleCategoryChange}
            onLocationChange={handleLocationChange}
            onPriceChange={handlePriceChange}
            onOnlyFreeChange={handleOnlyFreeChange}
            onReset={handleReset}
          />
        </div>
      </aside>

      {isMobileOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setIsMobileOpen(false)}
          />

          <div className="relative z-10 flex h-full w-full max-w-xs flex-col overflow-y-auto border-r border-zinc-800 bg-zinc-950 p-5 shadow-2xl">
            <div className="mb-4 flex items-center justify-end">
              <button
                type="button"
                onClick={() => setIsMobileOpen(false)}
                aria-label="Закрити фільтри"
                className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <FilterForm
              filters={filters}
              hasActiveFilters={hasActiveFilters}
              onCategoryChange={handleCategoryChange}
              onLocationChange={handleLocationChange}
              onPriceChange={handlePriceChange}
              onOnlyFreeChange={handleOnlyFreeChange}
              onReset={handleReset}
            />

            <button
              type="button"
              onClick={() => setIsMobileOpen(false)}
              className="mt-6 w-full rounded-xl bg-amber-400 py-2.5 text-sm font-semibold text-zinc-950 transition-colors hover:bg-amber-300"
            >
              Показати результати
            </button>
          </div>
        </div>
      )}
    </>
  );
};
