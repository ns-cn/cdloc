import { promises as fs } from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { IssueSchema, PhaseSchema, type Issue, type Phase } from "./schemas";

const CONTENT_ROOT = path.join(process.cwd(), "src", "content");

async function readMdxDir(subdir: string) {
  const dir = path.join(CONTENT_ROOT, subdir);
  let entries: string[];
  try {
    entries = await fs.readdir(dir);
  } catch {
    return [];
  }
  return Promise.all(
    entries
      .filter((name) => name.endsWith(".mdx") || name.endsWith(".md"))
      .map(async (name) => {
        const raw = await fs.readFile(path.join(dir, name), "utf-8");
        const { data, content } = matter(raw);
        const slug = name.replace(/\.mdx?$/, "");
        return { data, body: content, slug };
      })
  );
}

export async function getPhases(): Promise<Phase[]> {
  const files = await readMdxDir("phases");
  return files
    .map(({ data, body, slug }) => PhaseSchema.parse({ ...data, slug, body }))
    .sort((a, b) => a.order - b.order);
}

export async function getIssues(): Promise<Issue[]> {
  const files = await readMdxDir("issues");
  return files
    .map(({ data, body, slug }) => IssueSchema.parse({ ...data, slug, body }))
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}
