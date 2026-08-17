import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posixPath = z
	.string()
	.min(1)
	.refine((value) => !value.includes('\\'), {
		message: 'paths de imagem devem usar /'
	});

const projects = defineCollection({
	loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
	schema: z.object({
		title: z.string().min(1),
		slug: z.string().trim().min(1, 'slug não pode ser vazio'),
		short_desc: z.string().min(1),
		image: posixPath,
		repo_url: z.string(),
		live_url: z.string(),
		technologies: z.array(z.string().min(1)),
		order: z.number().int(),
		section_titles: z
			.object({
				introduction: z.string().optional(),
				main_idea: z.string().optional(),
				images: z.string().optional(),
				technical_details: z.string().optional(),
				presentation: z.string().optional(),
				how_to_run: z.string().optional()
			})
			.optional(),
		gallery: z.array(posixPath)
	})
});

export const collections = { projects };
