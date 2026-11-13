import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posixPath = z
	.string()
	.min(1)
	.refine((value) => !value.includes('\\'), {
		message: 'paths de imagem devem usar /'
	});

const hexColor = z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'cor deve ser hex #RRGGBB');

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
		// D2 — uma frase "problema → o que fiz → o que saiu", escrita pelo autor. "pendente" não aparece.
		outcome: z.string().optional(),
		// Cada tela: só o caminho, ou { src, caption } com a legenda que também vira o alt.
		gallery: z.array(
			z.union([posixPath, z.object({ src: posixPath, caption: z.string().min(1) })])
		),
		// Painel visual do design system do case (cores, tipografia, componentes).
		design_system: z
			.object({
				title: z.string().optional(),
				colors: z.array(z.object({ name: z.string().min(1), hex: hexColor })).default([]),
				fonts: z
					.array(
						z.object({
							role: z.string().min(1),
							family: z.string().min(1),
							weights: z.string().optional(),
							// true = família existe no Google Fonts e é carregada só nesta página.
							webfont: z.boolean().default(false)
						})
					)
					.default([]),
				// Página externa com o design system completo (opcional).
				link: z.object({ href: z.string().url(), label: z.string().min(1) }).optional()
			})
			.optional(),
		// Ficha no topo do case. Valor "pendente" (ou ausente) não aparece no site.
		summary: z
			.object({
				type: z.string(),
				context: z.string(),
				period: z.string(),
				role: z.string(),
				team: z.string(),
				advisor: z.string(),
				deliverable: z.string()
			})
			.partial()
			.optional()
	})
});

export const collections = { projects };
