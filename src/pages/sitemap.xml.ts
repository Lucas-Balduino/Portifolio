import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { canonicalUrl } from '../site-config';

// H4 — o currículo é página pública (link no Sobre), então entra no sitemap.
const staticPaths = ['/', '/projetos', '/sobre', '/contato', '/curriculo'];

export const GET: APIRoute = async () => {
	const projects = (await getCollection('projects')).sort((a, b) => a.data.order - b.data.order);
	const urls = [
		...staticPaths.map((path) => canonicalUrl(path)),
		...projects.map((project) => canonicalUrl(`/projetos/${project.data.slug}`))
	];

	const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((loc) => `  <url>\n    <loc>${loc}</loc>\n  </url>`).join('\n')}
</urlset>
`;

	return new Response(body, {
		headers: {
			'Content-Type': 'application/xml; charset=utf-8'
		}
	});
};
