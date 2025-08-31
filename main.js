// main.js - scaffold for future dynamic features
document.addEventListener('DOMContentLoaded', () => {
  // Theme management with localStorage persistence
  const themeToggle = document.getElementById('theme-toggle');
  const savedTheme = localStorage.getItem('theme') || 'light';
  
  // Apply saved theme on page load
  if (savedTheme === 'dark') {
    document.body.classList.add('theme-dark');
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', 'true');
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.contains('theme-dark');
      
      if (isDark) {
        document.body.classList.remove('theme-dark');
        localStorage.setItem('theme', 'light');
        themeToggle.setAttribute('aria-pressed', 'false');
      } else {
        document.body.classList.add('theme-dark');
        localStorage.setItem('theme', 'dark');
        themeToggle.setAttribute('aria-pressed', 'true');
      }
    });
  }

  // Language detection and translation
  const userLanguage = navigator.language || navigator.userLanguage;
  const languageCode = userLanguage.split('-')[0]; // Get primary language code
  
  // Only translate if not Portuguese
  if (languageCode !== 'pt') {
    translatePage(languageCode);
  }

  // Mobile navigation
  const burger = document.getElementById('nav-burger');
  const navList = document.getElementById('nav-list');
  if (burger && navList) {
    burger.addEventListener('click', () => {
      const expanded = burger.getAttribute('aria-expanded') === 'true';
      burger.setAttribute('aria-expanded', String(!expanded));
      navList.style.display = navList.style.display === 'flex' ? '' : 'flex';
      navList.style.flexDirection = 'column';
      navList.style.gap = '0.5rem';
      navList.style.background = 'var(--surface)';
      navList.style.padding = '0.8rem';
      navList.style.position = 'absolute';
      navList.style.right = '1rem';
      navList.style.top = '60px';
      navList.style.borderRadius = '8px';
      navList.style.boxShadow = '0 8px 20px rgba(0,0,0,0.08)';
    });
  }

  // Lightbox functionality (if exists)
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
  const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
  if (lightbox && lightboxImg) {
    document.querySelectorAll('.momento-media, .card-media').forEach(img => {
      img.addEventListener('click', () => {
        lightboxImg.src = img.src;
        lightbox.style.display = 'flex';
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';
      });
    });
    if (lightboxClose) {
      lightboxClose.addEventListener('click', () => {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        document.body.style.overflow = '';
      });
    }
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        lightbox.setAttribute('aria-hidden', 'true');
        lightboxImg.src = '';
        document.body.style.overflow = '';
      }
    });
  }
});

// Translation function
async function translatePage(targetLanguage) {
  const translations = {
    'en': {
      'nav.home': 'Home',
      'nav.projects': 'Projects',
      'nav.about': 'About',
      'nav.contact': 'Contact',
      'hero.title': 'Hello, I\'m <span class="accent">Lucas</span>',
      'hero.subtitle': 'Front-end developer in training — I design intuitive interfaces, focused on performance and accessibility.',
      'hero.viewProjects': 'View projects',
      'hero.hireMe': 'Hire me',
      'hero.skills': 'Accessibility • Responsive',
      'projects.title': 'Projects',
      'projects.subtitle': 'Code, deploys and architecture notes.',
      'projects.recent': 'Recent projects',
      'projects.viewAll': 'View all →',
      'projects.viewProject': 'View project',
      'projects.technologies': 'Technologies:',
      'projects.status': 'Status:',
      'projects.jetpack.description': '2D game/simulation with keyboard control — simple physics practices and frame animation. Remake of JetPack JoyRide for web, exploring game mechanics and responsive input.',
      'projects.travel.title': 'Travel Agency',
      'projects.travel.description': 'Management system for travel agency with customer registration (national/foreign), tour packages and services. Developed in Java with MySQL.',
      'projects.comingSoon.title': 'New Project',
      'projects.comingSoon.description': 'Project in development — focused on product design, PWA and APIs. More details about this new application coming soon.',
      'projects.comingSoon.badge': 'Coming soon',
      'contact.title': 'Contact',
      'contact.subtitle': 'Let\'s work together! Get in touch for projects, collaborations or just to chat about technology.',
      'contact.directEmail': 'Direct email:',
      'contact.availability': 'Availability:',
      'contact.availabilityText': 'Open to freelance projects and opportunities',
      'contact.form.name': 'Full name',
      'contact.form.namePlaceholder': 'Your full name',
      'contact.form.email': 'Email',
      'contact.form.emailPlaceholder': 'your@email.com',
      'contact.form.subject': 'Subject',
      'contact.form.subjectPlaceholder': 'Project, collaboration, question...',
      'contact.form.message': 'Message',
      'contact.form.messagePlaceholder': 'Tell me about your project or idea...',
      'contact.form.send': 'Send message',
      'contact.form.clear': 'Clear form',
      'about.title': 'About me',
      'about.subtitle': 'Front-end developer in training, passionate about creating intuitive and accessible interfaces.',
      'about.who.title': 'Who I am',
      'about.who.description': 'Hello! I\'m <strong>Lucas Gonçalves Balduino</strong>, a Computer Science and Design student. I develop web projects that combine interactive front-end engineering with user-centered design. I enjoy prototyping interfaces, improving usability and transforming visual ideas into functional code.',
      'about.education.title': 'Education',
      'about.education.cs': 'Bachelor in Computer Science',
      'about.education.cs.institution': 'UniCEUB, Brasília',
      'about.education.cs.period': 'Expected completion: 2027 (2nd semester)',
      'about.education.design': 'Design',
      'about.education.design.institution': 'University of Brasília (UnB), Brasília',
      'about.education.design.period': 'Expected completion: 2028 (1st semester)',
      'about.experience.title': 'Experience',
      'about.experience.monitor': 'HTML & CSS Teaching Assistant',
      'about.experience.monitor.description': 'Helping students learn practical web layout and styling techniques.',
      'about.experience.projects': 'Personal project development',
      'about.experience.projects.description': 'Creating front-end applications focused on UX and accessibility.',
      'about.skills.title': 'Technologies & Tools',
      'about.skills.languages': 'Languages',
      'about.skills.frontend': 'Frontend',
      'about.skills.database': 'Databases',
      'about.skills.others': 'Others',
      'about.languages.title': 'Languages',
      'about.languages.portuguese': 'Portuguese',
      'about.languages.english': 'English',
      'about.languages.spanish': 'Spanish',
      'about.languages.native': 'Native',
      'about.languages.advanced': 'Advanced',
      'about.languages.intermediate': 'Intermediate',
      'about.availability.title': 'Availability',
      'about.availability.description': 'Available for <strong>freelance projects</strong>. Open to front-end, UI/UX and small full-stack opportunities.',
      'about.downloadCV': 'Download CV',
      'about.contact': 'Get in Touch',
      'footer.tagline': 'Minimal design • Clean code • UX'
    },
    'es': {
      'nav.home': 'Inicio',
      'nav.projects': 'Proyectos',
      'nav.about': 'Sobre mí',
      'nav.contact': 'Contacto',
      'hero.title': 'Hola, soy <span class="accent">Lucas</span>',
      'hero.subtitle': 'Desarrollador front-end en formación — diseño interfaces intuitivas, pensadas para rendimiento y accesibilidad.',
      'hero.viewProjects': 'Ver proyectos',
      'hero.hireMe': 'Contrátame',
      'hero.skills': 'Accesibilidad • Responsivo',
      'projects.title': 'Proyectos',
      'projects.subtitle': 'Código, despliegues y notas sobre arquitectura.',
      'projects.recent': 'Proyectos recientes',
      'projects.viewAll': 'Ver todos →',
      'projects.viewProject': 'Ver proyecto',
      'projects.technologies': 'Tecnologías:',
      'projects.status': 'Estado:',
      'projects.jetpack.description': 'Juego/simulación 2D con control por teclado — prácticas de física simple y animación por frame. Remake de JetPack JoyRide para web, explorando mecánicas de juego y entrada responsiva.',
      'projects.travel.title': 'Agencia de Viajes',
      'projects.travel.description': 'Sistema de gestión para agencia de viajes con registro de clientes (nacionales/extranjeros), paquetes turísticos y servicios. Desarrollado en Java con MySQL.',
      'projects.comingSoon.title': 'Nuevo Proyecto',
      'projects.comingSoon.description': 'Proyecto en desarrollo — enfocado en diseño de producto, PWA y APIs. Más detalles sobre esta nueva aplicación próximamente.',
      'projects.comingSoon.badge': 'Próximamente',
      'contact.title': 'Contacto',
      'contact.subtitle': '¡Trabajemos juntos! Ponte en contacto para proyectos, colaboraciones o solo para charlar sobre tecnología.',
      'contact.directEmail': 'Email directo:',
      'contact.availability': 'Disponibilidad:',
      'contact.availabilityText': 'Abierto a proyectos freelance y oportunidades',
      'contact.form.name': 'Nombre completo',
      'contact.form.namePlaceholder': 'Tu nombre completo',
      'contact.form.email': 'Email',
      'contact.form.emailPlaceholder': 'tu@email.com',
      'contact.form.subject': 'Asunto',
      'contact.form.subjectPlaceholder': 'Proyecto, colaboración, pregunta...',
      'contact.form.message': 'Mensaje',
      'contact.form.messagePlaceholder': 'Cuéntame sobre tu proyecto o idea...',
      'contact.form.send': 'Enviar mensaje',
      'contact.form.clear': 'Limpiar formulario',
      'about.title': 'Sobre mí',
      'about.subtitle': 'Desarrollador front-end en formación, apasionado por crear interfaces intuitivas y accesibles.',
      'about.who.title': 'Quién soy',
      'about.who.description': '¡Hola! Soy <strong>Lucas Gonçalves Balduino</strong>, estudiante de Ciencias de la Computación y Diseño. Desarrollo proyectos web que unen ingeniería de front-end interactiva con diseño centrado en el usuario. Me gusta prototipar interfaces, mejorar la usabilidad y transformar ideas visuales en código funcional.',
      'about.education.title': 'Formación',
      'about.education.cs': 'Licenciatura en Ciencias de la Computación',
      'about.education.cs.institution': 'UniCEUB, Brasília',
      'about.education.cs.period': 'Previsión de conclusión: 2027 (2º semestre)',
      'about.education.design': 'Diseño',
      'about.education.design.institution': 'Universidad de Brasília (UnB), Brasília',
      'about.education.design.period': 'Previsión de conclusión: 2028 (1º semestre)',
      'about.experience.title': 'Experiencia',
      'about.experience.monitor': 'Monitor de HTML & CSS',
      'about.experience.monitor.description': 'Ayuda a los estudiantes en el aprendizaje de técnicas prácticas de diseño web y estilización.',
      'about.experience.projects': 'Desarrollo de proyectos personales',
      'about.experience.projects.description': 'Creación de aplicaciones front-end con enfoque en UX y accesibilidad.',
      'about.skills.title': 'Tecnologías & Herramientas',
      'about.skills.languages': 'Lenguajes',
      'about.skills.frontend': 'Frontend',
      'about.skills.database': 'Bases de Datos',
      'about.skills.others': 'Otros',
      'about.languages.title': 'Idiomas',
      'about.languages.portuguese': 'Portugués',
      'about.languages.english': 'Inglés',
      'about.languages.spanish': 'Español',
      'about.languages.native': 'Nativo',
      'about.languages.advanced': 'Avanzado',
      'about.languages.intermediate': 'Intermedio',
      'about.availability.title': 'Disponibilidad',
      'about.availability.description': 'Disponible para <strong>proyectos freelance</strong>. Abierto a oportunidades en front-end, UI/UX y full-stack de pequeño porte.',
      'about.downloadCV': 'Descargar CV',
      'about.contact': 'Ponerse en Contacto',
      'footer.tagline': 'Diseño minimal • Código limpio • UX'
    }
  };

  if (translations[targetLanguage]) {
    const elements = document.querySelectorAll('[data-i18n]');
    elements.forEach(element => {
      const key = element.getAttribute('data-i18n');
      if (translations[targetLanguage][key]) {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
          element.placeholder = translations[targetLanguage][key];
        } else {
          element.innerHTML = translations[targetLanguage][key];
        }
      }
    });

    // Handle placeholder translations
    const placeholderElements = document.querySelectorAll('[data-i18n-placeholder]');
    placeholderElements.forEach(element => {
      const key = element.getAttribute('data-i18n-placeholder');
      if (translations[targetLanguage][key]) {
        element.placeholder = translations[targetLanguage][key];
      }
    });
    
    // Update page language
    document.documentElement.lang = targetLanguage;
  }
}
