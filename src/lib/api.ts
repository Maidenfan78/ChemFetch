// filepath: src/lib/api.ts
import { z } from "zod";

// ---------- Runtime schema ----------
export const productSchema = z.object({
  id: z.string(),
  gtin: z.string(),
  name: z.string(),
  vendor: z.string().optional(),
  sdsUrl: z.string().url().optional(),
  lastRevision: z.string().optional(), // ISO yyyy-mm-dd
});
export type Product = z.infer<typeof productSchema>;

// ---------- Fetch helper ----------
const API_BASE = process.env.EXPO_PUBLIC_API_BASE ?? "";

export async function fetchProduct(gtin: string): Promise<Product | null> {
  if (!API_BASE)
    throw new Error("API base URL not set (EXPO_PUBLIC_API_BASE).");

  const res = await fetch(`${API_BASE}/products/${gtin}`, { method: "GET" });

  if (res.status === 202) {
    return null;
  }
  if (!res.ok) {
    throw new Error(`Product ${gtin} not found (HTTP ${res.status}).`);
  }
  return productSchema.parse(await res.json());
}
