/** URL canônica de produção (tarefa 2.12). */
export const SITE_URL = 'https://lucasbalduino.vercel.app';
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
			'Cases de design e projetos de código de Lucas Balduino: UX/UI, protótipos no Figma e front-end.'
	},
	project: {
		title: 'Projeto — Lucas',
		description: 'Case study de projeto — detalhes técnicos, stack e links.'
	},
	about: {
		title: 'Sobre mim — Lucas',
		description:
			'Lucas Gonçalves Balduino estuda Design na UnB e Ciência da Computação no UniCEUB. Como trabalha e o que procura: estágio em UX/UI e front-end.'
	},
	contact: {
		title: 'Contato — Lucas',
		description:
			'Fale com Lucas Balduino sobre estágio em UX/UI e front-end ou projetos freelance: email, LinkedIn e GitHub.'
	},
	notFound: {
		title: 'Página não encontrada — Lucas',
		description: 'O endereço pode ter mudado ou não existir mais.'
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
