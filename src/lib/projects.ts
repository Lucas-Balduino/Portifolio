import { getCollection } from 'astro:content';
import { imageKey } from './images';

const isFilled = (value?: string) => Boolean(value && value.trim() && value.trim() !== 'pendente');

/** Projetos na ordem definida no frontmatter (`order`). */
export async function getSortedProjects() {
	return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

/** Linha curta para o card: "Projeto acadêmico · 2026.1". Ignora campos pendentes. */
export function projectMeta(summary?: { type?: string; period?: string }) {
	return [summary?.type, summary?.period].filter(isFilled).join(' · ');
}

export type HoverScreen = { src: string; full: boolean };

/**
 * F3 — o que aparece no hover dos cards: a capa com as telas (`hover_image`, ocupa o card todo)
 * ou, enquanto ela não existe, a primeira tela da galeria que não é a capa, inteira.
 */
export function hoverScreen(data: {
	image: string;
	hover_image?: string;
	gallery: (string | { src: string })[];
}): HoverScreen | undefined {
	if (data.hover_image) return { src: data.hover_image, full: true };
	const cover = imageKey(data.image);
	const src = data.gallery
		.map((item) => (typeof item === 'string' ? item : item.src))
		.find((path) => imageKey(path) !== cover);
	return src ? { src, full: false } : undefined;
}
