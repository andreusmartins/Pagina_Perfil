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
document.getElementById('contactForm').addEventListener('submit', function (e) {
    e.preventDefault(); // Impede o redirecionamento

    const form = e.target;
    const formData = new FormData(form);

    fetch("https://formsubmit.co/andreosmartins98@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
            'Accept': 'application/json'
        }
    }).then(response => {
        if (response.ok) {
            document.getElementById('successMessage').style.display = 'block';
            form.reset();
        } else {
            alert('Ocorreu um erro ao enviar. Tente novamente.');
        }
    }).catch(error => {
        alert('Erro ao conectar. Tente novamente.');
    });
});

// Adicione este script
document.addEventListener('DOMContentLoaded', function () {
    const heroImg = document.querySelector('.hero-img');

    if (heroImg) {
        heroImg.addEventListener('mousedown', function () {
            this.classList.add('spinning');
        });

        heroImg.addEventListener('mouseup', function () {
            this.classList.remove('spinning');
        });

        heroImg.addEventListener('mouseleave', function () {
            this.classList.remove('spinning');
        });
    }
});