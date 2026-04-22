// --- SCRIPT DE FUNDO ESPACIAL EXATO DO MODELO PRO ---
const canvas = document.getElementById('espaco');
const ctx = canvas.getContext('2d');

// Ajusta o tamanho do canvas ao tamanho da janela
function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.onresize = resize;
resize();

let stars = [];
// Criando 250 estrelas com as propriedades exatas do modelo Pro
for(let i=0; i<250; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 1.8, // Tamanhos variados
        speedY: Math.random() * 0.4 + 0.1, // Velocidade vertical
        speedX: (Math.random() - 0.5) * 0.1, // A deriva lateral exata que você curtiu
        opacity: Math.random(), // Brilho inicial aleatório
        blinkSpeed: Math.random() * 0.02 // Velocidade de piscar
    });
}

function draw() {
    // Limpa o canvas mantendo a transparência para ver o degradê do CSS
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    stars.forEach(s => {
        // Lógica de cintilação (piscar)
        s.opacity += s.blinkSpeed;
        if(s.opacity > 1 || s.opacity < 0) s.blinkSpeed *= -1;

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI*2);
        // Aplica o brilho variável exato do modelo Pro
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.abs(s.opacity)})`;
        ctx.fill();

        // Movimento (vertical e lateral)
        s.y += s.speedY;
        s.x += s.speedX;

        // Reset quando sai da tela (volta para o topo)
        if(s.y > canvas.height) {
            s.y = -5;
            s.x = Math.random() * canvas.width;
        }
        // Faz a estrela "dar a volta" nas laterais
        if(s.x > canvas.width) s.x = 0;
        if(s.x < 0) s.x = canvas.width;
    });
    
    // Chama o próximo frame de animação
    requestAnimationFrame(draw);
}

// Inicia a animação
draw();

// Faz isso assim que a página carregar
window.onload = function() {
    // Busca os pontos salvos no "disco" do navegador
    let pontosSalvos = localStorage.getItem('userPoints') || 0;
    
    // Procura o elemento do contador na tela
    let contador = document.getElementById('pontos-valor');
    
    if (contador) {
        contador.innerText = pontosSalvos;
    }
};