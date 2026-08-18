/** URL canônica enquanto a tarefa 2.12 (Vercel) estiver pendente. Não inventar `*.vercel.app`. */
export const SITE_URL = 'https://lucas-balduino.github.io/Portifolio';
export const SITE_NAME = 'Lucas Balduino';

export const META = {
	home: {
		title: 'Lucas — Portfólio',
		description:
			'Portfólio de Lucas Balduino — designer e desenvolvedor UX/UI em formação. Projetos de interface, front-end e case studies.'
	},
	projects: {
		title: 'Projetos — Lucas',
		description:
			'Projetos de Lucas Balduino: código, deploys e notas sobre arquitetura de software e front-end.'
	},
	project: {
		title: 'Projeto — Lucas',
		description: 'Case study de projeto — detalhes técnicos, stack e links.'
	},
	about: {
		title: 'Sobre mim — Lucas',
		description:
			'Lucas Gonçalves Balduino — estudante de Design (UnB) e Ciência da Computação. UX/UI, front-end e acessibilidade.'
	},
	contact: {
		title: 'Contato — Lucas',
		description:
			'Entre em contato com Lucas para projetos freelance, colaborações e oportunidades em front-end e UI/UX.'
	},
	notFound: {
		title: 'Projeto não encontrado — Lucas',
		description: 'O projeto solicitado não foi encontrado.'
	}
} as const;

export function canonicalUrl(pathname: string): string {
	const trimmed = pathname.replace(/\/+$/, '');
	if (trimmed === '' || trimmed === '/') return `${SITE_URL}/`;
	const path = trimmed.startsWith('/') ? trimmed : `/${trimmed}`;
	return `${SITE_URL}${path}`;
}

export function absoluteUrl(pathOrUrl: string): string {
	if (/^https?:\/\//.test(pathOrUrl)) return pathOrUrl;
	const path = pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`;
	return `${SITE_URL}${path}`;
}
