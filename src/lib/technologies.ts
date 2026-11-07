import {
	siCss,
	siExpo,
	siFigma,
	siFirebase,
	siHtml5,
	siJavascript,
	siMysql,
	siOpenjdk,
	siReact,
	siWebgl,
	type SimpleIcon
} from 'simple-icons';

/**
 * Ferramentas (linguagens, frameworks, softwares) ganham ícone.
 * Tudo que não estiver aqui é tratado como competência e vira etiqueta de texto.
 * `null` = ferramenta sem logo disponível no Simple Icons.
 */
const TOOL_ICONS: Record<string, SimpleIcon | null> = {
	Figma: siFigma,
	Firebase: siFirebase,
	Expo: siExpo,
	React: siReact,
	'React Native': siReact,
	JavaScript: siJavascript,
	HTML: siHtml5,
	CSS: siCss,
	MySQL: siMysql,
	WebGL: siWebgl,
	Java: siOpenjdk,
	JavaSwing: null
};

export interface Tool {
	label: string;
	icon: SimpleIcon | null;
}

export function splitTechnologies(technologies: string[]) {
	const tools: Tool[] = [];
	const skills: string[] = [];
	for (const label of technologies) {
		if (label in TOOL_ICONS) tools.push({ label, icon: TOOL_ICONS[label] });
		else skills.push(label);
	}
	return { tools, skills };
}
