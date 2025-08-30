import { fetchWithTimeout } from './fetch-with-timeout';

type apiResponse<T> = {
  data?: T;
  error: string | null;
  status: number;
};

export async function fetchHandler<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit,
  timeoutMs = 5000,
): Promise<apiResponse<T>> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), timeoutMs);
  const signal = init?.signal || controller.signal;

  try {
    const resp = await fetchWithTimeout(input, {
      ...init,
      signal: signal,
    });

    if (!resp.ok) {
      const errorBody = await resp.json().catch(() => null);
      let message = null;

      if (errorBody) {
        message = Object.values(errorBody).join(', ');
      } else {
        message = `HTTP ${resp.status}`;
      }

      return {
        error: message,
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
