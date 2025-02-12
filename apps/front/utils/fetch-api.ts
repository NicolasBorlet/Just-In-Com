type NextFetchRequestConfig = {
    revalidate?: number | false;
    tags?: string[];
  };

  interface FetchAPIOptions {
    method: "GET" | "POST" | "PUT" | "DELETE";
    authToken?: string;
    body?: Record<string, unknown>;
    next?: NextFetchRequestConfig;
  }

  export async function fetchAPI(url: string, options = {}) {
    const res = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        // Ajoutez ici votre token API si nécessaire
        // 'Authorization': `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    });

    if (!res.ok) {
      console.error('API Error:', {
        url,
        status: res.status,
        statusText: res.statusText,
      });
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }

    return res.json();
  }
