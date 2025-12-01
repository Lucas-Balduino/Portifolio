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
 * Renderiza badges de tecnologias
 */
function renderTechnologies(technologies) {
  if (!technologies) return '';
  const techs = technologies.split(',').map(t => t.trim()).filter(t => t);
  return techs.map(tech => `<span class="badge">${tech}</span>`).join('');
}

/**
 * Renderiza um card de projeto
 */
function renderProjectCard(project) {
  const imageUrl = project.image_url || 'img/ImagemEmDesenvolvimento.jpg';
  const technologies = renderTechnologies(project.technologies);
  const projectUrl = project.slug ? `projeto.html?slug=${project.slug}` : '#';
  
  return `
    <article class="card project-card reveal">
      <img class="card-media" src="${imageUrl}" alt="${project.title || 'Projeto'} screenshot" onerror="this.src='img/ImagemEmDesenvolvimento.jpg'">
      <div class="card-body">
        <h3 class="card-title">${project.title || 'Sem título'}</h3>
        <p class="card-desc">${project.short_desc || project.description || 'Sem descrição'}</p>
        <div class="card-meta">
          ${technologies}
          ${project.repo_url ? `<a class="card-link" href="${project.repo_url}" target="_blank" rel="noopener noreferrer">GitHub</a>` : ''}
          ${project.live_url ? `<a class="card-link" href="${project.live_url}" target="_blank" rel="noopener noreferrer">Live Demo</a>` : ''}
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

// Trata conteúdo rico (especialmente detalhes técnicos e como executar)
// - Mantém HTML já inserido pelo admin
// - Dá suporte simples a blocos de código com ```lang ... ```
function formatRichText(content) {
  if (!content || !content.trim) return '';
  let html = content;

  // Suporte básico a blocos ```lang ... ```
  const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g;
  html = html.replace(codeBlockRegex, (match, lang, code) => {
    const languageClass = lang ? `language-${lang}` : '';
    const escapedCode = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
    return `<pre><code class="${languageClass}">${escapedCode}</code></pre>`;
  });

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

  const imageUrl = project.image_url || 'img/ImagemEmDesenvolvimento.jpg';
  const technologies = renderTechnologies(project.technologies);
  const description = project.description || project.short_desc || 'Sem descrição disponível.';
  
  // Processa imagens da seção de imagens
  const imageUrls = processImageUrls(project.images_section);
  
  // Função auxiliar para renderizar seção apenas se tiver conteúdo
  const renderSection = (title, content, className = '') => {
    if (!content || !content.trim()) return '';

    const isCodeHeavy =
      className === 'project-technical-details' ||
      className === 'project-how-to-run';

    const innerHtml = isCodeHeavy ? formatRichText(content) : content;

    return `
      <section class="project-section ${className} reveal">
        <h2>${title}</h2>
        <div>${innerHtml}</div>
      </section>
    `;
  };

  container.innerHTML = `
    <article class="project-detail reveal">
      <header class="project-hero">
        <div style="display:flex;justify-content:space-between;align-items:flex-start;gap:1rem;flex-wrap:wrap;">
          <div style="flex:1;">
            <h1>${project.title || 'Sem título'}</h1>
            <p class="muted">${project.short_desc || ''}</p>
          </div>
          <a href="projetos.html" class="btn ghost" style="align-self:flex-start;">← Voltar para projetos</a>
        </div>
      </header>
      
      ${project.image_url ? `
      <section class="project-image reveal">
        <img src="${imageUrl}" alt="${project.title}" style="max-width:100%;height:auto;border-radius:12px;box-shadow:0 10px 30px var(--glass);" onerror="this.src='img/ImagemEmDesenvolvimento.jpg'">
      </section>
      ` : ''}
      
      ${renderSection('Introdução', project.introduction, 'project-introduction')}
      
      ${renderSection('Ideia Principal', project.main_idea, 'project-main-idea')}
      
      ${imageUrls.length > 0 ? `
      <section class="project-images reveal">
        <h2>Imagens</h2>
        <div class="project-images-grid">
          ${imageUrls.map(url => `
            <img src="${url.trim()}" alt="${project.title}" 
                 style="width:100%;height:auto;border-radius:8px;box-shadow:0 4px 12px var(--glass);" 
                 onerror="this.style.display='none'">
          `).join('')}
        </div>
      </section>
      ` : ''}
      
      ${renderSection('Detalhes Técnicos', project.technical_details, 'project-technical-details')}
      
      ${renderSection('Apresentação', project.presentation, 'project-presentation')}
      
      ${renderSection('Como Executar', project.how_to_run, 'project-how-to-run')}
      
      ${!project.introduction && !project.main_idea && !project.technical_details && !project.presentation && !project.how_to_run ? `
      <section class="project-description reveal">
        <h2>Descrição</h2>
        <div>${description}</div>
      </section>
      ` : ''}
      
      ${project.technologies ? `
      <section class="project-technologies reveal">
        <h2>Tecnologias</h2>
        <div class="card-meta">${technologies}</div>
      </section>
      ` : ''}
      
      ${(project.repo_url || project.live_url) ? `
      <section class="project-links reveal">
        <h2>Links</h2>
        <div style="display:flex;gap:1rem;flex-wrap:wrap;">
          ${project.repo_url ? `<a href="${project.repo_url}" target="_blank" rel="noopener noreferrer" class="btn">Ver no GitHub</a>` : ''}
          ${project.live_url ? `<a href="${project.live_url}" target="_blank" rel="noopener noreferrer" class="btn">Ver Demo</a>` : ''}
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

