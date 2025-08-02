export async function fetchWrapper(url, options = {}) {
    const token = localStorage.getItem('token');
    const headers = {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers
    };

    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
        ...options,
        headers
    });

    if (!response.ok) {
        const error = new Error('API request failed');
        error.response = await response.json();
        throw error;
    }

    return response.json();
}