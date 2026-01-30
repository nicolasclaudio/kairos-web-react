export interface ApiResponse<T> {
    data: T;
    message?: string;
    success: boolean;
}

export interface PaginatedResponse<T> {
    data: T[];
    total: number;
    page: number;
    pageSize: number;
    hasMore: boolean;
}

export interface ApiError {
    message: string;
    code: string;
    details?: unknown;
}

export type SortOrder = 'asc' | 'desc';

export interface PaginationParams {
    page?: number;
    pageSize?: number;
}

export interface SortParams<T> {
    sortBy?: keyof T;
    sortOrder?: SortOrder;
}
