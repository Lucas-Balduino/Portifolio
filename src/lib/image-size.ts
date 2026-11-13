import { readFileSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Largura e altura de uma imagem em `public/` (PNG ou JPEG), lidas no build.
 * Servem para `width`/`height` no <img>: a página reserva o espaço e não pula ao carregar.
 */
export function imageSize(publicPath: string): { width: number; height: number } | undefined {
	try {
		const bytes = readFileSync(join(process.cwd(), 'public', publicPath.replace(/^\/+/, '')));
		// PNG: largura e altura no cabeçalho IHDR.
		if (bytes.readUInt32BE(0) === 0x89504e47) {
			return { width: bytes.readUInt32BE(16), height: bytes.readUInt32BE(20) };
		}
		// JPEG: percorre os marcadores até o SOF (C0–C2).
		let offset = 2;
		while (offset < bytes.length) {
			if (bytes[offset] !== 0xff) {
				offset += 1;
				continue;
			}
			const marker = bytes[offset + 1];
			if (marker >= 0xc0 && marker <= 0xc2) {
				return { height: bytes.readUInt16BE(offset + 5), width: bytes.readUInt16BE(offset + 7) };
			}
			offset += 2 + bytes.readUInt16BE(offset + 2);
		}
	} catch {
		// Imagem ausente: o <img> fica sem dimensões, como antes.
	}
	return undefined;
}
