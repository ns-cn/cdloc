import { z } from "zod";

// gray-matter 把 YAML 日期解析成 Date，统一在这里转成 yyyy-mm-dd 字符串
const dateString = z.preprocess(
  (v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v),
  z.string()
);

/**
 * 装修阶段（时间线）
 */
export const PhaseSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: dateString,
  order: z.number().int(),
  stage: z.enum([
    "design",
    "demolition",
    "plumbing",
    "masonry",
    "carpentry",
    "painting",
    "installation",
    "soft-decoration",
  ]),
  tags: z.array(z.string()).default([]),
  cover: z.string().optional(),
  excerpt: z.string().optional(),
  body: z.string().optional(),
});

export type Phase = z.infer<typeof PhaseSchema>;

/**
 * N 宗（问题/事项）
 */
export const IssueSchema = z.object({
  slug: z.string(),
  title: z.string(),
  date: dateString,
  severity: z.enum(["low", "medium", "high"]),
  category: z.string(),
  resolved: z.boolean().default(false),
  excerpt: z.string().optional(),
  body: z.string().optional(),
});

export type Issue = z.infer<typeof IssueSchema>;
