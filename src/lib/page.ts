/**
 * F1 — com as transições de página (`<ClientRouter />`), os scripts dos componentes rodam uma vez
 * só. `onPage` roda `setup` em cada página carregada (inclusive a primeira) e, antes da próxima
 * troca, aborta o `signal`: ouvintes registrados com `{ signal }` saem sozinhos.
 */
export function onPage(setup: (signal: AbortSignal) => void) {
	document.addEventListener('astro:page-load', () => {
		const controller = new AbortController();
		document.addEventListener('astro:before-swap', () => controller.abort(), { once: true });
		setup(controller.signal);
	});
}
