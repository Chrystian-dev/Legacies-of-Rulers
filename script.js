document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os botões que têm a propriedade data-clicked-src
    const buttons = document.querySelectorAll('[data-clicked-src]');

    buttons.forEach(button => {
        // Armazena as URLs das imagens
        const originalSrc = button.src;
        const clickedSrc = button.getAttribute('data-clicked-src');
        
        // 1. Ação ao Pressionar (mousedown/touchstart)
        // Muda a imagem para a versão clicada
        button.addEventListener('mousedown', () => {
            button.src = clickedSrc;
            button.classList.add('is-clicked');
        });
        
        button.addEventListener('touchstart', (e) => {
            e.preventDefault(); // Previne o comportamento padrão do touch para manter o efeito
            button.src = clickedSrc;
            button.classList.add('is-clicked');
        });

        // 2. Ação ao Soltar (mouseup/touchend/mouseleave)
        // Retorna a imagem para a versão normal
        const restoreButton = () => {
            button.src = originalSrc;
            button.classList.remove('is-clicked');
        };

        button.addEventListener('mouseup', restoreButton);
        button.addEventListener('touchend', restoreButton);
        
        // O mouseleave é importante para casos onde o mouse desliga
        // enquanto o botão ainda está pressionado
        button.addEventListener('mouseleave', restoreButton);
        
        // Exemplo de funcionalidade (você pode adicionar a lógica real aqui)
        button.addEventListener('click', () => {
            // alert(`Você clicou no botão: ${button.alt}`);
            // Aqui você adicionaria o código para começar o jogo, 
            // ou redirecionar para a rede social, etc.
            
            // Exemplo de redirecionamento para o botão de rede social
            if (button.id === 'btn-github') {
                window.open('https://github.com', '_blank');
            } else if (button.id === 'btn-instagram') {
                window.open('https://instagram.com', '_blank');
            } else if (button.id === 'btn-youtube') {
                window.open('https://youtube.com', '_blank');
            } else if (button.id === 'btn-pinterest') {
                window.open('https://pinterest.com', '_blank');
            }
        });
    });
});