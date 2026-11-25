export type CategoryId =
  | 'all'
  | 'books'
  | 'electronics'
  | 'dorm'
  | 'clothes'
  | 'sport';

export type LocationId =
  | 'all'
  | 'guk'
  | 'corpus-1'
  | 'corpus-4'
  | 'corpus-5'
  | 'corpus-19'
  | 'studmistechko'
  | 'dorm-1'
  | 'dorm-3'
  | 'dorm-8'
  | 'dorm-11';

export interface FilterState {
  category: CategoryId;
  location: LocationId;
  priceFrom: string;
  priceTo: string;
  onlyFree: boolean;
}

export const INITIAL_FILTERS: FilterState = {
  category: 'all',
  location: 'all',
  priceFrom: '',
  priceTo: '',
  onlyFree: false,
};