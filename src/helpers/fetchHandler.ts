import { fetchWithTimeout } from './fetchWithTimeout';

type apiResponse<T> = {
  data?: T;
  error: string | null;
  status?: number;
};

export async function fetchHandler<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs = 5000,
): Promise<apiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const resp = await fetchWithTimeout(input, {
      ...init,
      signal: controller.signal,
    });

    if (!resp.ok) {
      let errorBody = await resp.json().catch(() => null);
      if (errorBody) errorBody = Object.values(errorBody).join(', ');

      return {
        error: errorBody,
        status: resp.status,
      };
    }

    const data = await resp.json();
    return { data, error: null, status: resp.status };
  } catch (err) {
    if (err instanceof DOMException && err.name === 'AbortError') {
      return { error: 'Request Timeout', status: 504 };
    }
    return { error: 'Network error', status: 500 };
  } finally {
    clearTimeout(timeoutId);
  }
}
