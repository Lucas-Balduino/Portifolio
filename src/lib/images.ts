import type { ImageMetadata } from 'astro';
import { getImage } from 'astro:assets';

/**
 * Imagens dos projetos (A5/H2). Ficam em `src/assets/img/` e o Astro gera WebP em vários tamanhos.
 * Nos MDX o caminho continua curto: `img/Kinetic/Kinetic.png` (com ou sem `/` no começo).
 */
const files = import.meta.glob<ImageMetadata>('/src/assets/img/**/*.{png,jpg,jpeg,webp}', {
	eager: true,
	import: 'default'
});
const byKey = new Map(
	Object.entries(files).map(([path, meta]) => [path.replace('/src/assets/', ''), meta])
);

/** `/img/x.png` e `img/x.png` são a mesma imagem. */
export const imageKey = (path: string) => path.trim().replace(/^\/+/, '');

export function projectImage(path: string): ImageMetadata {
	const meta = byKey.get(imageKey(path));
	if (!meta) {
		throw new Error(`Imagem "${path}" não está em src/assets/img (confira o caminho no MDX).`);
	}
	return meta;
}

export type ResponsiveImage = {
	src: string;
	srcset: string;
	sizes: string;
	width: number;
	height: number;
};

/**
 * WebP nas larguras pedidas (sem passar do tamanho original), com `width`/`height` para a
 * página reservar o espaço antes de a imagem chegar.
 */
export async function responsiveImage(
	path: string,
	widths: number[],
	sizes: string
): Promise<ResponsiveImage> {
	const meta = projectImage(path);
	const usable = widths.filter((width) => width < meta.width);
	if (usable.length === 0 || usable[usable.length - 1] < Math.max(...widths)) {
		usable.push(meta.width);
	}
	const image = await getImage({ src: meta, widths: usable, format: 'webp' });
	return {
		src: image.src,
		srcset: image.srcSet.attribute,
		sizes,
		width: meta.width,
		height: meta.height
	};
}

/** Uma versão só, ex.: a imagem grande do lightbox ou a do Open Graph. */
export async function singleImage(
	path: string,
	width: number,
	format: 'webp' | 'jpg' = 'webp'
): Promise<string> {
	const meta = projectImage(path);
	const image = await getImage({ src: meta, width: Math.min(width, meta.width), format });
	return image.src;
}

/** GIF transparente de 1px: `src` de reserva quando a imagem de verdade vem de um `<source>`. */
export const BLANK_IMAGE = 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==';

/**
 * Imagem inteira dentro de uma caixa (`object-fit: contain`): largura em que ela aparece e
 * versões 1x/2x. Usada na segunda tela do hover dos projetos (F3).
 */
export async function containedImage(
	path: string,
	boxWidth: number,
	boxHeight: number
): Promise<ResponsiveImage> {
	const meta = projectImage(path);
	const width = Math.round(Math.min(boxWidth, (boxHeight * meta.width) / meta.height));
	return responsiveImage(path, [width, width * 2], `${width}px`);
}
