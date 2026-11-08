// Gera o PDF do currículo a partir da página /curriculo, usando o Chrome ou o Edge instalado
// (modo headless, sem pacote extra). Precisa do site rodando: `npm run dev` ou `npm run preview`.
//
// Uso: npm run cv:pdf -- [url] [arquivo de saída]
// Padrão: http://localhost:4321/curriculo -> public/Resume/CurriculoPT.pdf
// Outro navegador: defina CHROME_PATH com o caminho do executável.

import { spawn } from 'node:child_process';
import { existsSync, statSync } from 'node:fs';
import { resolve } from 'node:path';

const url = process.argv[2] ?? 'http://localhost:4321/curriculo';
const output = resolve(process.argv[3] ?? 'public/Resume/CurriculoPT.pdf');

const browsers = [
	process.env.CHROME_PATH,
	'C:/Program Files/Google/Chrome/Application/chrome.exe',
	'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
	'/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
	'/usr/bin/google-chrome',
	'/usr/bin/chromium'
].filter(Boolean);

const browser = browsers.find((path) => existsSync(path));

if (!browser) {
	console.error('Nenhum Chrome/Edge encontrado. Defina CHROME_PATH com o caminho do navegador.');
	process.exit(1);
}

const args = [
	'--headless=new',
	'--disable-gpu',
	'--no-pdf-header-footer',
	'--run-all-compositor-stages-before-draw',
	// Dá tempo para a fonte Inter e a foto carregarem antes de imprimir.
	'--virtual-time-budget=10000',
	`--print-to-pdf=${output}`,
	url
];

const startedAt = Date.now();

spawn(browser, args, { stdio: 'inherit' }).on('exit', (code) => {
	const written = existsSync(output) && statSync(output).mtimeMs >= startedAt;
	if (code !== 0 || !written) {
		console.error(`Falha ao gerar o PDF (código ${code}). O site está rodando em ${url}?`);
		process.exit(1);
	}
	console.log(`PDF gerado: ${output}`);
});
