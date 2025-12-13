document.addEventListener('DOMContentLoaded', () => {
    const frames = document.querySelectorAll('.character-frame');
    const selectionContainer = document.querySelector('.selection-container');
    const descriptionBox = document.getElementById('description-box');
    const descriptionText = document.getElementById('description-text');
    
    // CORREÇÃO ESSENCIAL: Define explicitamente a URL do fundo padrão (o fundo de estrelas)
    // Se o seu arquivo de fundo de estrelas tiver outro nome, ajuste aqui:
    const DEFAULT_BACKGROUND_URL = "url('fundo da pagina de seleção.png')"; 
    
    // Mapeamento dos fundos (mantido)
    const backgroundMap = {
        'Rogue': 'fundo do ladino.png', 
        'Prince': 'fundo do guerreiro.png', 
        'Archer': 'fundo da arqueira.png', 
        'Viking': 'fundo do barbaro.png', 
        'Mage': 'fundo do mago.png',
    };
    
    // Garante que o fundo inicial está aplicado corretamente
    selectionContainer.style.backgroundImage = DEFAULT_BACKGROUND_URL;
    selectionContainer.style.backgroundSize = 'cover';
    selectionContainer.style.backgroundPosition = 'center top'; 


    frames.forEach(frame => {
        
        // --- LÓGICA DE CLIQUE (SELECIONA O QUADRO) ---
        frame.addEventListener('click', () => {
            frames.forEach(f => f.classList.remove('selected'));
            frame.classList.add('selected');
            
            const characterKey = frame.getAttribute('data-character');
            console.log(`Personagem selecionado: ${characterKey}`);
            // Adicione aqui a navegação para o jogo se necessário.
        });

        // --- LÓGICA DE HOVER (Troca de Fundo e Descrição) ---
        
        frame.addEventListener('mouseenter', () => {
            const characterKey = frame.getAttribute('data-character');
            const description = frame.getAttribute('data-description');
            const newBackgroundUrl = backgroundMap[characterKey];

            // 1. Troca o fundo
            if (newBackgroundUrl) {
                selectionContainer.style.backgroundImage = `url('${newBackgroundUrl}')`;
            }
            
            // 2. Mostra a descrição
            if (description) {
                descriptionText.textContent = description;
                descriptionBox.classList.add('visible');
            }
        });

        frame.addEventListener('mouseleave', () => {
            // 1. RESTAURA O FUNDO PADRÃO USANDO A VARIÁVEL CORRIGIDA
            selectionContainer.style.backgroundImage = DEFAULT_BACKGROUND_URL;
            
            // 2. Esconde a descrição
            descriptionBox.classList.remove('visible');
            descriptionText.textContent = ''; 
        });
    });
});

// --- CONTROLE DA TELA DE CARREGAMENTO (LOADER) ---
window.onload = function() {
    const loaderWrapper = document.getElementById('loader-wrapper');
    if (loaderWrapper) {
        loaderWrapper.classList.add('loaded');
    }
};