// =============================================
// Configurações Globais e Variáveis
// =============================================
const skillLevels = {
    html: '90%',
    css: '85%',
    js: '80%',
    jquery: '75%',
    figma: '70%',
    bootstrap: '85%',
    angular: '40%',
    sql: '65%',
    advpl: '40%'
};

// =============================================
// Observador de Interseção para Animações
// =============================================
const setupIntersectionObservers = () => {
    // Observador para a seção de habilidades
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                
                // Anima cada barra individualmente
                document.querySelectorAll('.skill-level').forEach(bar => {
                    const skillClass = bar.classList[1]; // Pega a segunda classe (html, css, etc.)
                    const level = skillLevels[skillClass];
                    bar.style.setProperty('--level', level);
                    bar.style.width = level;
                });

                skillsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    // Observador geral para elementos animáveis
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.skill-card, .project-card, .section-title, .testimonial-card');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate__animated', 'animate__fadeInUp');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        
        elements.forEach(element => {
            observer.observe(element);
        });
    };

    // Aplicar observadores
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
    
    animateOnScroll();
};

// =============================================
// Navegação e Scroll Suave
// =============================================
const setupSmoothScrolling = () => {
    // Scroll suave para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
                
                // Fecha o menu mobile se estiver aberto
                const navbarCollapse = document.querySelector('.navbar-collapse.show');
                if (navbarCollapse) {
                    const navbarToggler = document.querySelector('.navbar-toggler');
                    navbarToggler.click();
                }
            }
        });
    });

    // Adiciona classe active ao navbar durante o scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
};

// =============================================
// Formulário de Contato
// =============================================
const setupContactForm = () => {
    const contactForm = document.getElementById('contactForm');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const form = e.target;
        const formData = new FormData(form);
        const submitBtn = form.querySelector('button[type="submit"]');
        const successMessage = document.getElementById('successMessage');
        
        // Mostrar estado de carregamento
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
        
        // Envio real com FormSubmit.co
        fetch("https://formsubmit.co/ajax/andreosmartins98@gmail.com", {
            method: "POST",
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Erro na rede');
        })
        .then(data => {
            successMessage.style.display = 'block';
            form.reset();
            
            // Esconde a mensagem após 5 segundos
            setTimeout(() => {
                successMessage.style.display = 'none';
            }, 5000);
        })
        .catch(error => {
            alert('Ocorreu um erro ao enviar. Por favor, tente novamente mais tarde.');
            console.error('Erro:', error);
        })
        .finally(() => {
            submitBtn.disabled = false;
            submitBtn.textContent = 'Enviar Mensagem';
        });
    });
};

// =============================================
// Filtro de Projetos
// =============================================
const setupProjectFilters = () => {
    const filterButtons = document.querySelectorAll('.project-filters button');
    if (filterButtons.length === 0) return;

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove a classe active de todos os botões
            filterButtons.forEach(btn => {
                btn.classList.remove('active');
            });
            
            // Adiciona active ao botão clicado
            this.classList.add('active');
            
            const filter = this.getAttribute('data-filter');
            const projects = document.querySelectorAll('.project-card');
            
            projects.forEach(project => {
                if (filter === 'all') {
                    project.style.display = 'block';
                } else {
                    const techs = project.querySelector('.project-techs').textContent.toLowerCase();
                    if (techs.includes(filter)) {
                        project.style.display = 'block';
                    } else {
                        project.style.display = 'none';
                    }
                }
            });
        });
    });
};

// =============================================
// Efeitos Interativos
// =============================================
const setupInteractiveEffects = () => {
    // Efeito de rotação na imagem do herói
    const heroImg = document.querySelector('.hero-img');
    if (heroImg) {
        let spinInterval;
        
        heroImg.addEventListener('mousedown', function() {
            // Inicia a rotação após um pequeno atraso
            spinInterval = setTimeout(() => {
                this.classList.add('spinning');
            }, 300);
        });
        
        heroImg.addEventListener('mouseup', function() {
            clearTimeout(spinInterval);
            this.classList.remove('spinning');
        });
        
        heroImg.addEventListener('mouseleave', function() {
            clearTimeout(spinInterval);
            this.classList.remove('spinning');
        });
    }

    // Botão "Voltar ao Topo"
    const backToTopButton = document.querySelector('.back-to-top');
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('active');
            } else {
                backToTopButton.classList.remove('active');
            }
        });
    }

    // Efeito de hover nos cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.transform = 'translateY(-10px)';
            card.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.2)';
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.boxShadow = '';
        });
    });
};

// =============================================
// Inicialização
// =============================================
document.addEventListener('DOMContentLoaded', () => {
    setupIntersectionObservers();
    setupSmoothScrolling();
    setupContactForm();
    setupProjectFilters();
    setupInteractiveEffects();
    
    // Atualiza o ano no footer
    const currentYear = new Date().getFullYear();
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = currentYear;
    }
});

// =============================================
// Tratamento de Erros Globais
// =============================================
window.addEventListener('error', (event) => {
    console.error('Erro capturado:', event.error);
    // Aqui você pode adicionar lógica para lidar com erros globais
});