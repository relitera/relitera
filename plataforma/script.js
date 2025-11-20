document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const tabs = document.querySelectorAll('.tab');
    const courseCards = document.querySelectorAll('.course-card');
    const coursePopup = document.getElementById('coursePopup');
    const popupBtn = document.querySelector('.popup-btn');
    const searchInput = document.querySelector('.search-input');
    const scrollArrow = document.querySelector('.scroll-arrow');
    const coursesContainer = document.querySelector('.courses-container');
    const continueBtn = document.querySelector('.continue-btn');
    const videoPlaceholder = document.querySelector('.video-placeholder');

    const courses = {
        'cristianismo': {
            title: '(CRISTIANISMO) Comece por aqui!',
            description: 'Fundamentos do cristianismo e ensinamentos bíblicos.',
            progress: 20,
            totalLessons: 15,
            completedLessons: 3
        },
        'candomble': {
            title: 'Candomblé - Tradição Africana',
            description: 'Conhecimentos sobre os orixás e tradições do candomblé.',
            progress: 0,
            totalLessons: 25,
            completedLessons: 0
        },
        'umbanda': {
            title: 'Umbanda Brasileira',
            description: 'Espiritualidade brasileira e trabalho com entidades.',
            progress: 0,
            totalLessons: 30,
            completedLessons: 0
        },
        'espiritismo': {
            title: 'Espiritismo & Mediunidade',
            description: 'Estudo do espiritismo e desenvolvimento mediúnico.',
            progress: 0,
            totalLessons: 20,
            completedLessons: 0
        },
        'budismo': {
            title: 'Budismo Zen',
            description: 'Filosofia budista e práticas de meditação.',
            progress: 0,
            totalLessons: 35,
            completedLessons: 0
        },
        'hinduismo': {
            title: 'Hinduísmo - Vedas',
            description: 'Conhecimentos sobre os Vedas e tradições hindus.',
            progress: 0,
            totalLessons: 18,
            completedLessons: 0
        },
        'islamismo': {
            title: 'Islamismo',
            description: 'Fundamentos do Islã e ensinamentos do Alcorão.',
            progress: 0,
            totalLessons: 22,
            completedLessons: 0
        },
        'judaismo': {
            title: 'Judaísmo - Torá',
            description: 'Estudo da Torá e tradições judaicas.',
            progress: 0,
            totalLessons: 28,
            completedLessons: 0
        },
        'wicca': {
            title: 'Wicca - Bruxaria',
            description: 'Práticas wiccanas e magia natural.',
            progress: 0,
            totalLessons: 24,
            completedLessons: 0
        },
        'meditacao': {
            title: 'Meditação Mindfulness',
            description: 'Técnicas de meditação e atenção plena.',
            progress: 0,
            totalLessons: 16,
            completedLessons: 0
        }
    };

    function openMobileMenu() {
        const sidebar = document.createElement('div');
        sidebar.className = 'mobile-sidebar';
        sidebar.innerHTML = `
            <div class="sidebar-content">
                <div class="sidebar-header">
                    <h3>Relitera</h3>
                    <button class="close-sidebar">&times;</button>
                </div>
                <nav class="sidebar-nav">
                    <a href="#" class="nav-link">Dashboard</a>
                    <a href="#" class="nav-link">Meus Cursos</a>
                    <a href="#" class="nav-link">Progresso</a>
                    <a href="#" class="nav-link">Configurações</a>
                </nav>
            </div>
        `;
        
        document.body.appendChild(sidebar);
        
        const style = document.createElement('style');
        style.textContent = `
            .mobile-sidebar {
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                z-index: 3000;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            .sidebar-content {
                background-color: #2c3e50;
                padding: 2rem;
                border-radius: 12px;
                width: 90%;
                max-width: 400px;
            }
            .sidebar-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 2rem;
            }
            .sidebar-header h3 {
                color: #ffffff;
                font-size: 1.5rem;
            }
            .close-sidebar {
                background: none;
                border: none;
                color: #ffffff;
                font-size: 2rem;
                cursor: pointer;
            }
            .sidebar-nav {
                display: flex;
                flex-direction: column;
                gap: 1rem;
            }
            .nav-link {
                color: #cccccc;
                text-decoration: none;
                padding: 1rem;
                border-radius: 8px;
                transition: all 0.3s;
            }
            .nav-link:hover {
                background-color: #34495e;
                color: #ffffff;
            }
        `;
        document.head.appendChild(style);

        sidebar.querySelector('.close-sidebar').addEventListener('click', () => {
            document.body.removeChild(sidebar);
            document.head.removeChild(style);
        });

        sidebar.addEventListener('click', (e) => {
            if (e.target === sidebar) {
                document.body.removeChild(sidebar);
                document.head.removeChild(style);
            }
        });
    }

    function switchTab(activeTab) {
        tabs.forEach(tab => {
            tab.classList.remove('active');
        });
        activeTab.classList.add('active');

        const tabType = activeTab.dataset.tab;
        const sectionTitle = document.querySelector('.section-title');
        
        if (tabType === 'conteudos') {
            sectionTitle.textContent = 'Trilhas';
        } else if (tabType === 'trilhas') {
            sectionTitle.textContent = 'Trilhas';
        } else if (tabType === 'sobre') {
            sectionTitle.textContent = 'Sobre o Curso';
        }
    }

    function showCoursePopup(courseId) {
        const course = courses[courseId];
        if (course) {
            const popupTitle = document.querySelector('.popup-title');
            popupTitle.textContent = course.title;
            coursePopup.setAttribute('data-course', courseId);
            coursePopup.classList.add('show');
        }
    }

    function closeCoursePopup() {
        coursePopup.classList.remove('show');
    }

    function searchCourses(query) {
        const cards = document.querySelectorAll('.course-card');
        cards.forEach(card => {
            const title = card.querySelector('.card-title').textContent.toLowerCase();
            const subtitle = card.querySelector('.card-subtitle').textContent.toLowerCase();
            const searchTerm = query.toLowerCase();
            
            if (title.includes(searchTerm) || subtitle.includes(searchTerm)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    function scrollCourses(direction) {
        const scrollAmount = 300;
        if (direction === 'right') {
            coursesContainer.scrollLeft += scrollAmount;
        } else {
            coursesContainer.scrollLeft -= scrollAmount;
        }
    }

    function playVideo() {
        videoPlaceholder.innerHTML = '<i class="fas fa-pause"></i>';
        videoPlaceholder.style.backgroundColor = '#8B5CF6';
        
        setTimeout(() => {
            videoPlaceholder.innerHTML = '<i class="fas fa-play"></i>';
            videoPlaceholder.style.backgroundColor = '#1a1a2e';
            alert('Vídeo iniciado! (Simulação)');
        }, 2000);
    }

    function continueWatching() {
        alert('Continuando de onde parou... (Simulação)');
    }

    function updateProgress() {
        const progressFill = document.querySelector('.progress-fill');
        const progressText = document.querySelector('.progress-text');
        
        const randomProgress = Math.floor(Math.random() * 100);
        progressFill.style.width = randomProgress + '%';
        progressText.textContent = `43/2929 conteúdos — ${randomProgress}%`;
    }

    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            padding: 1rem 2rem;
            border-radius: 8px;
            z-index: 4000;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    }

    menuBtn.addEventListener('click', openMobileMenu);

    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab));
    });

    courseCards.forEach(card => {
        card.addEventListener('click', () => {
            const courseId = card.dataset.course;
            console.log('Clicou no curso:', courseId);
            // Redirecionar diretamente para a página de curso
            window.location.href = `course.html?course=${courseId}`;
        });
    });

    popupBtn.addEventListener('click', () => {
        closeCoursePopup();
        // Redirecionar para a página de curso
        const courseId = document.querySelector('.course-popup.show').getAttribute('data-course') || 'cristianismo';
        window.location.href = `course.html?course=${courseId}`;
    });

    coursePopup.addEventListener('click', (e) => {
        if (e.target === coursePopup) {
            closeCoursePopup();
        }
    });

    searchInput.addEventListener('input', (e) => {
        searchCourses(e.target.value);
    });

    scrollArrow.addEventListener('click', () => {
        scrollCourses('right');
    });

    continueBtn.addEventListener('click', continueWatching);

    videoPlaceholder.addEventListener('click', playVideo);

    setInterval(updateProgress, 30000);

    function animateOnScroll() {
        const cards = document.querySelectorAll('.course-card');
        cards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(30px)';
                card.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 100);
            }, index * 100);
        });
    }

    setTimeout(animateOnScroll, 500);

    courseCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeCoursePopup();
        }
        
        if (e.key === 'Enter' && e.target === searchInput) {
            searchCourses(e.target.value);
        }
    });

    const notificationStyles = document.createElement('style');
    notificationStyles.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(notificationStyles);

    setTimeout(() => {
        showNotification('Bem-vindo à Relitera! 🎓', 'success');
    }, 1000);
});