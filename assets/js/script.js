document.addEventListener("DOMContentLoaded", function () {
    let index = 0;
    let activeCategory = null;
    const slides = Array.from(document.querySelectorAll(".slides video"));
    const descriptionElement = document.getElementById("video-description");
    const categoryButtons = document.querySelectorAll(".category-btn");
    const carouselContainer = document.querySelector(".carousel-container");

    const descriptions = {
        "assets/images/video4_educao.mp4": {
            text: "Projeto 1: Desenvolvimento de um sistema web para gestão de pedidos.",
            link: "https://web.whatsapp.com/"
        },
        "assets/images/video4_educao.mp4": {
            text: "Projeto 2: Simulação de uma linha de produção no CoppeliaSim.",
            link: "https://www.twitch.tv/yetz"
        },
        "assets/images/video4_educao.mp4": {
            text: "Projeto 3: Aplicação JavaFX para gerenciamento de equipamentos escolares.",
            link: "https://meusite.com/videos/projeto3"
        },
        "assets/images/video4_educao.mp4": {
            text: "Projeto 4: Aplicação JavaFX para gerenciamento de equipamentos escolares.",
            link: "https://meusite.com/videos/projeto4"
        }
    };

    function getFilteredVideos() {
        return slides.filter(video => !activeCategory || video.dataset.category === activeCategory);
    }

    function showVideo(video) {
        slides.forEach(v => {
            v.classList.remove("active");
            v.style.display = "none";
            v.pause();
            v.muted = true;
        });
    
        video.classList.add("active");
        video.style.display = "block";
        video.muted = false;
        video.volume = 0.3;
        video.play();
    
        const videoInfo = descriptions[video.getAttribute("src")] || { text: "", link: "" };
        
        descriptionElement.innerHTML = `
            ${videoInfo.text} 
            ${videoInfo.link ? `<br><a href="${videoInfo.link}" target="_blank">Ver vídeo completo</a>` : ""}
        `;
    }

    function updateCarousel(category) {
        activeCategory = category;
        const filtered = getFilteredVideos();
        index = 0;

        if (filtered.length > 0) {
            showVideo(filtered[index]);
            carouselContainer.style.display = "flex"; 
        } else {
            descriptionElement.textContent = "Nenhum vídeo disponível para esta categoria.";
        }
    }

    function mudarSlide(direcao) {
        const filtered = getFilteredVideos();
        if (filtered.length === 0) return;

        filtered[index].pause();
        filtered[index].muted = true;
        filtered[index].classList.remove("active");

        index = (index + direcao + filtered.length) % filtered.length;

        showVideo(filtered[index]);
    }

    categoryButtons.forEach(button => {
        button.addEventListener("click", function () {
            updateCarousel(button.dataset.category);
        });
    });

    document.querySelector(".prev").addEventListener("click", () => mudarSlide(-1));
    document.querySelector(".next").addEventListener("click", () => mudarSlide(1));

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const video = entry.target;
            if (entry.isIntersecting) {
                if (video.classList.contains("active")) {
                    video.muted = false;
                    video.play();
                    video.volume = 0.3;
                }
            } else {
                video.pause();
                video.muted = true;
            }
        });
    }, { threshold: 0.75 });

    slides.forEach(video => observer.observe(video));

    carouselContainer.style.display = "none"; 
});

  
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav ul li a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                document.querySelector('header nav ul li a[href*=' + id + ']').classList.add('active');
            });
        }
    });
}

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

document.addEventListener("DOMContentLoaded",function(){
    function animarFeedback(){
        let elemento = document.getElementById("feedback")
        let posicao = elemento.getBoundingClientRect().top
        let alturaTela = window.innerHeight

        if(posicao < alturaTela * 0.75){
            elemento.classList.add("show")
        }
    }
    window.addEventListener("scroll",animarFeedback)
})

document.addEventListener("DOMContentLoaded", function () {
    const workingSection = document.querySelector(".working");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                workingSection.classList.add("show");
                observer.unobserve(workingSection); 
            }
        });
    }, { threshold: 0.3 }); 

    observer.observe(workingSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const workingSection = document.querySelector(".contact");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                workingSection.classList.add("show");
                observer.unobserve(workingSection); 
            }
        });
    }, { threshold: 0.3 }); 

    observer.observe(workingSection);
});


