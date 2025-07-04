document.addEventListener('DOMContentLoaded', () => {
    // аанимированное лого
    const logoBrackets = document.querySelectorAll('.logo-svg .bracket');
    if(logoBrackets.length > 0) {
        setTimeout(() => {
            logoBrackets.forEach(bracket => {
                bracket.style.strokeDashoffset = '0';
            });
        }, 300); // небольшая задержка для заметности
    }

    // Меню
    const menuToggle = document.querySelector('.menu-toggle');
    const sidePanel = document.querySelector('.side-panel');
    const closeBtn = document.querySelector('.close-btn');

    if (menuToggle && sidePanel && closeBtn) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('is-active');
            sidePanel.classList.toggle('is-open');
        });

        closeBtn.addEventListener('click', () => {
             menuToggle.classList.remove('is-active');
             sidePanel.classList.remove('is-open');
        });

        // закрыть панель по внешнему щелчку
        document.addEventListener('click', (event) => {
            if (sidePanel.classList.contains('is-open') && !sidePanel.contains(event.target) && !menuToggle.contains(event.target)) {
                menuToggle.classList.remove('is-active');
                sidePanel.classList.remove('is-open');
            }
        });
    }

    // эффект параллакса
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            const scrollPosition = window.scrollY;
            // '0.5' значение контроллирует скорость паралакса.
            hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
        });
    }

    // "Intersection Observer" для анимации
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // общая анимация постепенного появления
                entry.target.classList.add('visible');
                
                // анимация ступенчатого списка "пишущей машинки"
                if (entry.target.matches('.equipment-list ul') || entry.target.matches('.personnel-info ul')) {
                    const listItems = entry.target.querySelectorAll('li');
                    listItems.forEach((item, index) => {
                        setTimeout(() => {
                            item.classList.add('visible');
                            typewriter(item, item.dataset.text);
                        }, index * 150); // задержка между началом печати каждой строки
                    });
                    observer.unobserve(entry.target); // анимировать только один раз
                }

                // анимация
                if (entry.target.matches('.advantages-timeline')) {
                    const timelineItems = entry.target.querySelectorAll('.timeline-item');
                    timelineItems.forEach((item, index) => {
                        item.style.transitionDelay = `${index * 200}ms`;
                        item.classList.add('visible');
                    });
                    observer.unobserve(entry.target); // анимировать только один раз
                }

                // SVG анимация
                const svgPath = entry.target.querySelector('.line-drawing path');
                if (svgPath) {
                    svgPath.style.strokeDashoffset = '0';
                }
            }
        });
    }, {
        threshold: 0.2 // запуск анимации при 20% видимости
    });

    // функция эффекта пишущей машинки
    function typewriter(element, text, index = 0) {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            setTimeout(() => typewriter(element, text, index + 1), 20); // регуляция скорости
        }
    }

    const sectionsToAnimate = document.querySelectorAll('section, .section-divider');
    sectionsToAnimate.forEach(section => {
        section.classList.add('hidden');
        observer.observe(section);
    });

    const listsToAnimate = document.querySelectorAll('.equipment-list ul, .personnel-info ul');
    listsToAnimate.forEach(list => {
        list.querySelectorAll('li').forEach(li => {
            const originalText = li.textContent;
            li.textContent = '';
            li.dataset.text = originalText;
            li.classList.add('hidden');
        });
        observer.observe(list);
    });

    const timelineToAnimate = document.querySelector('.advantages-timeline');
    if (timelineToAnimate) {
        timelineToAnimate.querySelectorAll('.timeline-item').forEach(item => item.classList.add('hidden'));
        observer.observe(timelineToAnimate);
    }

    // Кнопка "Наверх"
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    if (scrollTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollTopBtn.classList.add('show');
            } else {
                scrollTopBtn.classList.remove('show');
            }
        });

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
}); 