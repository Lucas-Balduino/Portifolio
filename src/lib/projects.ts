import { getCollection } from 'astro:content';

const isFilled = (value?: string) => Boolean(value && value.trim() && value.trim() !== 'pendente');

/** Projetos na ordem definida no frontmatter (`order`). */
export async function getSortedProjects() {
	return (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
}

/** Linha curta para o card: "Projeto acadêmico · 2026.1". Ignora campos pendentes. */
export function projectMeta(summary?: { type?: string; period?: string }) {
	return [summary?.type, summary?.period].filter(isFilled).join(' · ');
}
