export type User = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  address: string;
  number: string;
  city: string;
  state: string;
  zip_code: string;
  terms_accepted: boolean;
  created_at?: string;
}

export type PaginationInfo = {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

export type SortField = 'full_name' | 'email' | 'city' | 'state' | 'created_at';
export type SortOrder = 'asc' | 'desc';