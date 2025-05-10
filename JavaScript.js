// Observador de interseção para animar quando a seção fica visível
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            
            // Anima cada barra individualmente
            document.querySelectorAll('.skill-level').forEach(bar => {
                const level = bar.getAttribute('data-level');
                bar.style.setProperty('--level', level);
                bar.style.width = level;
            });
            
            skillsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

// Observar a seção de habilidades
const skillsSection = document.querySelector('.skills-section');
if (skillsSection) {
    skillsObserver.observe(skillsSection);
}
// Adicione estas linhas ao seu código JavaScript existente
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

// Atualize a animação para incluir as novas habilidades
document.querySelectorAll('.skill-level').forEach(bar => {
    const skillClass = bar.classList[1]; // Pega a segunda classe (html, css, etc.)
    const level = skillLevels[skillClass];
    bar.style.setProperty('--level', level);
    bar.style.width = level;
});