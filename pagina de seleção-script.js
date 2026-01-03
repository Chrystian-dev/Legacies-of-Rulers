document.addEventListener('DOMContentLoaded', () => {
    const frames = document.querySelectorAll('.character-frame');
    const selectionContainer = document.querySelector('.selection-container');
    const descriptionBox = document.getElementById('description-box');
    const descriptionText = document.getElementById('description-text');

    // Elementos do Modal
    const modal = document.getElementById('confirmation-modal');
    const modalTitle = document.getElementById('modal-title');
    const characterNameDisplay = document.getElementById('character-name-display');
    const btnConfirm = document.getElementById('btn-confirm-next');
    const btnCancel = document.getElementById('btn-cancel');

    // Variável para armazenar a chave do personagem atualmente selecionado
    let selectedCharacterKey = '';
    
    // Fundo padrão (o fundo de estrelas)
    const DEFAULT_BACKGROUND_URL = "url('./assets/fundo da pagina de seleção.png')"; 
    
    // Mapeamento dos fundos
    const backgroundMap = {
        'Rogue': './assets/fundo do ladino.png', 
        'Prince': './assets/fundo do guerreiro.png', 
        'Archer': './assets/fundo da arqueira.png', 
        'Viking': './assets/fundo do barbaro.png', 
        'Mage': './assets/fundo do mago.png',

    };
    
    // Garante que o fundo inicial está aplicado corretamente
    selectionContainer.style.backgroundImage = DEFAULT_BACKGROUND_URL;
    selectionContainer.style.backgroundSize = 'cover';
    selectionContainer.style.backgroundPosition = 'center top'; 


    // --- FUNÇÕES DE CONTROLE DO MODAL ---
    
    const showModal = (characterName) => {
        characterNameDisplay.textContent = characterName;
        modal.classList.add('visible');
    };

    const hideModal = () => {
        modal.classList.remove('visible');
    };
    
    // --- LISTENERS DOS BOTÕES DO MODAL ---
    
    // Ação do Botão CANCELAR
    btnCancel.addEventListener('click', hideModal);

    // Ação do Botão SEGUIR EM FRENTE
    btnConfirm.addEventListener('click', () => {
        // Altere 'next-story-page.html' para o nome da sua próxima página (ex: 'historia.html')
        const nextPage = `next-story-page.html?char=${selectedCharacterKey}`;
        
        // Simplesmente redireciona o usuário para a próxima página
        window.location.href = nextPage;
    });


    // --- LISTENERS DOS QUADROS DE PERSONAGEM ---
    
    frames.forEach(frame => {
        
        // 1. LÓGICA DE CLIQUE (AGORA ABRE O MODAL)
        frame.addEventListener('click', () => {
            frames.forEach(f => f.classList.remove('selected'));
            frame.classList.add('selected');
            
            // Pega a chave do personagem (ex: 'Rogue')
            selectedCharacterKey = frame.getAttribute('data-character'); 
            
            // Pega o nome do personagem (ex: 'Ladino') para exibir no modal
            const characterAltName = frame.querySelector('.char-image').alt; 
            
            showModal(characterAltName);
            
            // Opcional: Esconde a caixa de descrição ao abrir o modal
            descriptionBox.classList.remove('visible');
        });

        // 2. LÓGICA DE HOVER (Troca de Fundo e Descrição)
        
        frame.addEventListener('mouseenter', () => {
            const characterKey = frame.getAttribute('data-character');
            const description = frame.getAttribute('data-description');
            const newBackgroundUrl = backgroundMap[characterKey];

            // Troca o fundo
            if (newBackgroundUrl) {
                selectionContainer.style.backgroundImage = `url('${newBackgroundUrl}')`;
            }
            
            // Mostra a descrição
            if (description) {
                descriptionText.textContent = description;
                descriptionBox.classList.add('visible');
            }
        });

        frame.addEventListener('mouseleave', () => {
            // Restaura o fundo padrão
            selectionContainer.style.backgroundImage = DEFAULT_BACKGROUND_URL;
            
            // Esconde a descrição
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