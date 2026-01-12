import type { Product, ProductsResponse } from "@/src/types/products";

const BASE = "https://dummyjson.com";

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(`Request failed (${res.status}): ${text || res.statusText}`);
  }
  return res.json() as Promise<T>;
}

export function getProducts(): Promise<ProductsResponse> {
  return fetchJson<ProductsResponse>(`${BASE}/products`);
}

export function searchProducts(q: string): Promise<ProductsResponse> {
  const query = encodeURIComponent(q.trim());
  return fetchJson<ProductsResponse>(`${BASE}/products/search?q=${query}`);
}

export function getProductById(id: number): Promise<Product> {
  return fetchJson<Product>(`${BASE}/products/${id}`);
}
