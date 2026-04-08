import { defineCollection} from "astro:content";
import { z } from "astro/zod";

import { glob } from "astro/loaders";

const projects = defineCollection({
    loader: glob({ pattern: "**/*.md", base: "./src/content/projects" }),

    schema: z.object({
        title: z.string(),
        description: z.string(),
        category: z.string(),
        technologies: z.array(z.string()),

        mainImage: z.string(),

        gallery: z.array(z.object({
            url: z.string(),
            alt: z.string(),
            description: z.string()
        })),
        feature: z.boolean().default(false)
    }),
});

export const collections = { 
    projects: projects 
};