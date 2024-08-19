interface ApiResponse<T> {
    status: 'success' | 'error';
    data: T | null;
    message: string | null;
}

export function formatResponse<T>(status: 'success' | 'error', data: T | null, message: string | null = null): ApiResponse<T> {
    return { status, data, message };
}
