import { defineCollection, z } from 'astro:content';

const experience = defineCollection({
  type: 'content',
  schema: z.object({
    company: z.string(),
    role: z.string(),
    period: z.string(),
    location: z.string(),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(99),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string().url(),
        })
      )
      .default([]),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    url: z.string().url(),
    language: z.string(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(99),
  }),
});

const skills = defineCollection({
  type: 'content',
  schema: z.object({
    groups: z.array(
      z.object({
        label: z.string(),
        ids: z.array(z.string()),
      })
    ),
    spokenLabel: z.string(),
    spokenValue: z.string(),
  }),
});

const publications = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    url: z.string().url(),
    source: z.string(),
    date: z.string(),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { experience, projects, skills, publications };
