import { z } from "zod";

export const sdsSchema = z.object({
  id: z.string().uuid(),
  productName: z.string(),
  revisionDate: z.string().datetime(),          // ISO 8601
  sections: z.record(z.string(), z.string())    // e.g. {"Hazards": "..."}
});

export type SDS = z.infer<typeof sdsSchema>;
