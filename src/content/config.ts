import { defineCollection} from "astro:content";
import { z } from "astro/zod";

const project = defineCollection({
    
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

export const collections = { project };