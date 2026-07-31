// projects.js - Carrega projetos dinamicamente da API
// Este arquivo deve ser incluído nas páginas que precisam exibir projetos

const PROJECTS_DATA_URL = 'data/projects.json';

/**
 * Busca todos os projetos a partir do arquivo JSON estático
 */
async function fetchProjects() {
  try {
    const response = await fetch(PROJECTS_DATA_URL, { cache: 'no-store' });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const projects = await response.json();
    return projects;
  } catch (error) {
    console.error('Erro ao buscar projetos:', error);
    return [];
  }
}

/**
 * Busca um projeto específico por ID (usando os dados estáticos)
 * Mantido por compatibilidade, mas no fluxo atual o principal é o slug.
 */
async function fetchProject(id) {
  try {
    const projects = await fetchProjects();
    return projects.find(p => String(p.id) === String(id)) || null;
  } catch (error) {
    console.error('Erro ao buscar projeto:', error);
    return null;
  }
}

/**
 * Busca um projeto por slug
 */
async function fetchProjectBySlug(slug) {
  try {
    const projects = await fetchProjects();
    return projects.find(p => p.slug === slug) || null;
  } catch (error) {
    console.error('Erro ao buscar projeto por slug:', error);
    return null;
  }
}

/**
 * Escapa caracteres especiais HTML para prevenir XSS
 */
function escapeHtml(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Renderiza badges de tecnologias
 */
function renderTechnologies(technologies) {
  if (!technologies) return '';
  const techs = technologies.split(',').map(t => t.trim()).filter(t => t);
  return techs.map(tech => `<span class="badge">${escapeHtml(tech)}</span>`).join('');
}

/**
 * Renderiza um card de projeto
 */
function renderProjectCard(project) {
  const imageUrl = escapeHtml(project.image_url || 'img/ImagemEmDesenvolvimento.jpg');
  const title = escapeHtml(project.title || 'Sem título');
  const shortDesc = escapeHtml(project.short_desc || project.description || 'Sem descrição');
  const technologies = renderTechnologies(project.technologies);
  const projectUrl = project.slug ? `projeto.html?slug=${encodeURIComponent(project.slug)}` : '#';
  const repoUrl = project.repo_url ? escapeHtml(project.repo_url) : '';
  const liveUrl = project.live_url ? escapeHtml(project.live_url) : '';
  
  return `
    <article class="card project-card reveal">
      <img class="card-media" src="${imageUrl}" alt="${title} screenshot" loading="lazy" onerror="this.src='img/ImagemEmDesenvolvimento.jpg'">
      <div class="card-body">
        <h3 class="card-title">${title}</h3>
        <p class="card-desc">${shortDesc}</p>
        <div class="card-meta">
          ${technologies}
          ${repoUrl ? `<a class="card-link" href="${repoUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
          ${liveUrl ? `<a class="card-link" href="${liveUrl}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ''}
          ${project.slug ? `<a class="card-link" href="${projectUrl}">Ver detalhes</a>` : ''}
        </div>
      </div>
    </article>
  `;
}

/**
 * Renderiza uma lista de projetos em um container
 */
function renderProjectsList(projects, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container com id "${containerId}" não encontrado`);
    return;
  }

  if (!projects || projects.length === 0) {
    container.innerHTML = `
      <article class="card project-card placeholder reveal">
        <div class="media-placeholder" aria-hidden="true"></div>
        <div class="card-body">
          <h3 class="card-title">Nenhum projeto encontrado</h3>
          <p class="card-desc">Adicione projetos através da interface administrativa.</p>
        </div>
      </article>
    `;
    return;
  }

  container.innerHTML = projects.map(project => renderProjectCard(project)).join('');
  
  // Reaplica animações reveal aos novos elementos
  const revealElements = container.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = (index * 30) + 'ms';
    observer.observe(el);
  });
}

/**
 * Renderiza projetos recentes (limitado a 3)
 */
function renderRecentProjects(projects, containerId) {
  const recentProjects = projects.slice(0, 3);
  renderProjectsList(recentProjects, containerId);
}

/**
 * Processa URLs de imagens (suporta vírgulas e quebras de linha)
 */
function processImageUrls(imagesSection) {
  if (!imagesSection || !imagesSection.trim()) return [];
  
  // Divide por vírgula ou quebra de linha
  return imagesSection
    .split(/[,\n]/)
    .map(url => url.trim())
    .filter(url => url.length > 0);
}

/**
 * Trata conteúdo rico das seções do projeto:
 * - Mantém HTML já inserido (h3, p, ul, pre…)
 * - Converte blocos ```lang ... ``` em <pre><code>
 * - Se for texto puro, preserva parágrafos (\\n\\n → <p>)
 */
function formatRichText(content) {
  if (!content || !content.trim) return '';
  let html = content;

  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  html = html.replace(codeBlockRegex, (match, lang, code) => {
    const languageClass = lang ? `language-${lang}` : '';
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code class="${languageClass}">${escapedCode}</code></pre>`;
  });

  const hasBlockHtml = /<(p|h[1-6]|ul|ol|li|pre|div|section|blockquote|table)\b/i.test(html);
  if (!hasBlockHtml) {
    const paragraphs = html
      .split(/\n{2,}/)
      .map(block => block.trim())
      .filter(Boolean)
      .map(block => `<p>${block.replace(/\n/g, '<br>')}</p>`);
    html = paragraphs.join('');
  }

  return html;
}

/**
* Renderiza a página completa de um projeto individual
*/
function renderProjectDetail(project, containerId) {
  const container = document.getElementById(containerId);
  if (!container) {
    console.error(`Container com id "${containerId}" não encontrado`);
    return;
  }

  if (!project) {
    container.innerHTML = `
      <article class="project-detail">
        <h1>Projeto não encontrado</h1>
        <p>O projeto solicitado não foi encontrado.</p>
        <a href="projetos.html" class="btn">Voltar para projetos</a>
      </article>
    `;
    return;
  }

  const title = escapeHtml(project.title || 'Sem título');
  const shortDesc = escapeHtml(project.short_desc || '');
  const imageUrl = escapeHtml(project.image_url || 'img/ImagemEmDesenvolvimento.jpg');
  const technologies = renderTechnologies(project.technologies);
  const description = project.description || project.short_desc || 'Sem descrição disponível.';
  const repoUrl = project.repo_url ? escapeHtml(project.repo_url) : '';
  const liveUrl = project.live_url ? escapeHtml(project.live_url) : '';
  
  // Processa imagens da seção de imagens
  const imageUrls = processImageUrls(project.images_section);
  
  // Projetos de design usam rótulos próprios (ex.: "Processo" no lugar de "Detalhes Técnicos")
  const sectionTitle = (key, fallback) => {
    const custom = project.section_titles?.[key];
    return typeof custom === 'string' && custom.trim() ? custom : fallback;
  };

  // Função auxiliar para renderizar seção apenas se tiver conteúdo
  const renderSection = (secTitle, content, className = '') => {
    if (!content || !content.trim()) return '';

    return `
      <section class="project-section ${className} reveal">
        <h2>${escapeHtml(secTitle)}</h2>
        <div class="project-rich-text">${formatRichText(content)}</div>
      </section>
    `;
  };

  container.innerHTML = `
    <article class="project-detail reveal">
      <header class="project-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap;">
          <div style="flex:1;">
            <h1>${title}</h1>
            <p class="muted">${shortDesc}</p>
          </div>
          <a href="projetos.html" class="btn ghost" style="align-self:flex-start;">← Voltar para projetos</a>
        </div>
      </header>
      
      ${project.image_url ? `
      <section class="project-image reveal">
        <img class="project-hero-img" src="${imageUrl}" alt="${title}" loading="lazy" onerror="this.src='img/ImagemEmDesenvolvimento.jpg'">
      </section>
      ` : ''}
      
      ${renderSection(sectionTitle('introduction', 'Introdução'), project.introduction, 'project-introduction')}
      
      ${renderSection(sectionTitle('main_idea', 'Ideia Principal'), project.main_idea, 'project-main-idea')}
      
      ${imageUrls.length > 0 ? `
      <section class="project-images reveal">
        <h2>${escapeHtml(sectionTitle('images', 'Imagens'))}</h2>
        <div class="project-images-grid">
          ${imageUrls.map(url => `
            <figure class="project-shot">
              <img src="${escapeHtml(url.trim())}" alt="${title}" loading="lazy" onerror="this.closest('figure').style.display='none'">
            </figure>
          `).join('')}
        </div>
      </section>
      ` : ''}
      
      ${renderSection(sectionTitle('technical_details', 'Detalhes Técnicos'), project.technical_details, 'project-technical-details')}
      
      ${renderSection(sectionTitle('presentation', 'Apresentação'), project.presentation, 'project-presentation')}
      
      ${renderSection(sectionTitle('how_to_run', 'Como Executar'), project.how_to_run, 'project-how-to-run')}
      
      ${!project.introduction && !project.main_idea && !project.technical_details && !project.presentation && !project.how_to_run ? `
      <section class="project-description reveal">
        <h2>Descrição</h2>
        <div>${formatRichText(description)}</div>
      </section>
      ` : ''}
      
      ${project.technologies ? `
      <section class="project-technologies reveal">
        <h2>Tecnologias</h2>
        <div class="card-meta">${technologies}</div>
      </section>
      ` : ''}
      
      ${(repoUrl || liveUrl) ? `
      <section class="project-links reveal">
        <h2>Links</h2>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
          ${repoUrl ? `<a href="${repoUrl}" target="_blank" rel="noopener noreferrer" class="btn">Ver no GitHub</a>` : ''}
          ${liveUrl ? `<a href="${liveUrl}" target="_blank" rel="noopener noreferrer" class="btn">Ver Demo</a>` : ''}
        </div>
      </section>
      ` : ''}
    </article>
  `;

  // Aplica animações reveal
  const revealElements = container.querySelectorAll('.reveal');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: 0.1 });

  revealElements.forEach((el, index) => {
    el.style.transitionDelay = (index * 30) + 'ms';
    observer.observe(el);
  });
}

// Exporta funções para uso global
window.ProjectsAPI = {
  fetchProjects,
  fetchProject,
  fetchProjectBySlug,
  renderProjectsList,
  renderRecentProjects,
  renderProjectDetail
};

