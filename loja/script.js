
document.addEventListener('DOMContentLoaded', function() {

    const menuToggle = document.querySelector('.menu-toggle');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            alert('Menu será implementado em breve!');
        });
    }


    const sobreButtons = document.querySelectorAll('.btn-sobre');
    const comprarButtons = document.querySelectorAll('.btn-comprar');


    sobreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title');
            
            if (productTitle) {
                alert(`Informações sobre: ${productTitle.textContent}\n\nEste curso oferece conhecimento aprofundado sobre a religião e cultura apresentada.`);
            } else {
                alert('Informações sobre este produto serão disponibilizadas em breve!');
            }
        });
    });

  
    comprarButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.product-card');
            const productTitle = productCard.querySelector('.product-title');
            
            if (productTitle) {
                const confirmacao = confirm(`Deseja adicionar "${productTitle.textContent}" ao carrinho?`);
                if (confirmacao) {
                    alert('Produto adicionado ao carrinho com sucesso!');
                    
                }
            } else {
                alert('Este produto estará disponível para compra em breve!');
            }
        });
    });

    
    const productCards = document.querySelectorAll('.product-card');
    
    productCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    
    productCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});
