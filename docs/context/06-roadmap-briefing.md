# 06 — Briefing para gerar o ROADMAP

Este documento **não é o roadmap**. É a instrução para um modelo, lendo `00`–`04` mais este arquivo, produzir ou atualizar `ROADMAP.md` (skill `roadmap-sdd`). As restrições abaixo **pesam mais** do que a ordem óbvia de “construir um produto do zero”.

## Restrições

- **Solo.** Lucas é o único autor. Fases sequenciais e pequenas. Sem trilhas paralelas que assumam time.
- **O trabalho agora é migração de um site que já existe**, não caderno e não MVP greenfield. “Artefato útil antes de produto” **já foi cumprido** (HTML no ar + Fase E). O ROADMAP **não** começa com templates de nota nem com “validar se deve haver site”.
- **Núcleo = o portfólio publicado e os cinco projetos.** Não criar collection extra, playground ou filtro para “completar o produto”.
- **Paridade antes de estética e i18n.** Primeiro o mesmo conteúdo nas rotas Astro, no ar na Vercel. Dark-first (A4) e seletor PT+EN (A5) são fases **depois** da paridade, ainda no Checkpoint A, não misturadas no scaffold.
- **Não reabrir Fase 0 / 1 / E.** Aparecem no Progresso como `[x]`. Não reescrever aquelas tarefas no formato SDD para reexecutar.
- **Conteúdo segue o uso real.** Não traduzir os cinco cases numa tarefa. Não exigir screenshots da Agência nem GIF do JetPack para fechar a migração. Não adicionar o agrupamento “design gráfico e editorial” (E5, consciente, fora).
- **Dogfooding.** `AGENTS.md` e este `06` mandam. O ROADMAP não os contradiz.
- **Curadoria fechada.** Sem contas, submissão, CMS hospedado.
- **Sem infra paga obrigatória.** Vercel no plano gratuito cabe em A3. Sem backend, auth, banco. EmailJS continua opcional (mailto é o fallback).
- **Gate do autor** no início da migração: gerenciador de pacotes (não há `package.json` hoje) e criação do projeto Vercel (URL `(pendente)`). Sem esses, o agente não inventa npm vs pnpm nem domínio.
- **SDD para modelo menor.** Uma tarefa = um objetivo, docs explícitos, aceite testável, um commit. Sem “faça a Fase 2 inteira”.
- **Windows.** Commits em uma linha: `git commit -m "type(id): descrição"`.

## Formato esperado do ROADMAP.md

Alinhar ao `roadmap-sdd` (este fluxo do autor):

- Topo: spec vs execução; agente não lê o arquivo inteiro; Como usar; prompts mestre (agente / autor / continuação); Fechar uma tarefa; Decisão do autor; Regras permanentes.
- Progresso: fases 0, 1, E `[x]`; Fase 2+ com checkboxes; tabela de decisões `(pendente)`.
- Cada tarefa: tipo, bloqueio, docs, arquivos permitidos, fazer, fora de escopo, aceite, como testar, commit `type(id): descrição` em português.
- **PARAR — decisão do autor** nos forks da tabela abaixo.
- **Fora do roadmap atual:** antiga Fase 3 (playground, filtros, widget GH, GSAP, PWA), artefatos opcionais (GIF JetPack, shots Agência, SVG sociais), terceiro idioma ES.

## O que é fase (neste repo)

| Fase | Papel |
|---|---|
| 0, 1, E | Histórico cumprido no site estático. Não executar. |
| 2 | Migração paridade: Astro + React islands + MDX + Vercel, mesmas páginas e cinco projetos. |
| 3 | Identidade dark-first (A4), **depois** da 2. |
| 4 | i18n PT+EN com seletor e rotas `/en/` (A5), **depois** da 2. Pode começar depois da 3 ou em paralelo só se o autor mudar este briefing — o default é sequencial (2 → 3 → 4). |
| — | Diferenciação e extras = **Fora do roadmap atual**. |

DoD da Fase 2: `astro build` gera o site; as rotas equivalentes às páginas atuais abrem; Kinetic, IdA, Cerrado, JetPack e Agência renderizam do MDX; CV baixa; mailto funciona; URL Vercel no ar; HTML legado / `admin/` / JSON runtime **removidos só depois** dessa paridade.

## Decisões ainda abertas

| Tarefa futura (id sugerido) | O que decidir | Registrada |
|---|---|---|
| 2.1 | Gerenciador de pacotes para o Astro | `(pendente)` — npm / pnpm / yarn |
| 2.12 | Criar projeto na Vercel e URL de produção | `(pendente)` |
| 2.10 / depois | EmailJS via env na Vercel vs só mailto | `(pendente)` — default operacional: mailto até o autor configurar |
| 3.1 | Hex de acento + fonte display | `(pendente)` — sugestões Kinetic `#005CEE` + Lexend **não** são escolha |
| 4.x | Quais cases ganham MDX em EN na primeira leva | `(pendente)` — chrome primeiro; cases gradual |
| — | Adapter Vercel vs só estático no dashboard | Estático já está em `03` / A3 — não reabrir a menos que o deploy falhe |

## O que o roadmap não deve fazer

- Estimar prazos em datas (o 05/08 da CEIA já passou no calendário do autor; não vira critério de pronto).
- Usar tráfego/SEO como “pronto”.
- Tratar horizonte (PWA, playground, GSAP) como fase 0 ou 2.
- Uma tarefa “migrar o site para Astro”.
- Deixar o modelo escolher gerenciador de pacotes, hex, fonte ou URL.
- Gerar a spec de novo no lugar de `docs/context/`.
- Scaffoldar Astro **nesta** conversa em que só se escreve o ROADMAP.
- Marcar `[x]` em tarefa nova.
- Apagar o site estático no primeiro commit da Fase 2.
