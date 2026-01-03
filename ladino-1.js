document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById('intro-video');
    const finalImage = document.getElementById('final-image');
    const dialogueContainer = document.getElementById('dialogue-container');
    const narrativeText = document.getElementById('narrative-text');
    const choicesContainer = document.getElementById('choices-container');
    const countdownDisplay = document.getElementById('countdown');

    const textoNarrado = "O mercado está agitado e os guardas se aproximam. Você sente o peso da adaga em sua cintura. Escolha um desses caminhos!";
    let tempoRestante = 20;
    let timerInterval;

    // 1. Inicia o vídeo (mudo para permitir autoplay)
    setTimeout(() => {
        video.play();
    }, 1000);

    // 2. Quando o vídeo termina
    video.onended = () => {
        video.classList.add('hidden');
        finalImage.classList.remove('hidden');
        dialogueContainer.classList.remove('hidden');
        iniciarTypewriter();
    };

    // 3. Efeito de texto sendo escrito
    function iniciarTypewriter() {
        let i = 0;
        narrativeText.textContent = "";
        function type() {
            if (i < textoNarrado.length) {
                narrativeText.textContent += textoNarrado.charAt(i);
                i++;
                setTimeout(type, 50);
            } else {
                aparecerBotoesETimer();
            }
        }
        type();
    }

    // 4. Aparece botões e inicia os 20 segundos
    function aparecerBotoesETimer() {
        choicesContainer.classList.remove('hidden');
        timerInterval = setInterval(() => {
            tempoRestante--;
            countdownDisplay.textContent = tempoRestante;

            if (tempoRestante <= 0) {
                clearInterval(timerInterval);
                escolhaAleatoria();
            }
        }, 1000);
    }

    // 5. Escolha aleatória se o tempo acabar
    function escolhaAleatoria() {
        const caminhos = ['fugir.html', 'esconder.html'];
        const random = caminhos[Math.floor(Math.random() * caminhos.length)];
        makeChoice(random);
    }
});

// 6. Função para mudar de página
function makeChoice(url) {
    // Aqui você pode adicionar um som de clique ou transição
    window.location.href = url;
}