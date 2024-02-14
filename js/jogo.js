let diasDiferentes = contarDiasDiferentes();

class Elemento {
    constructor() {
        this.matriz = ['🪨', '📄', '✂️', '🔥', '⚡', '💧', '🌿', '🪽'];
        this.opcoes = [];

        for (let k = 0; k < diasDiferentes + 2 && k < this.matriz.length; k++) {
            this.opcoes.push(this.matriz[k]);
        }

        //this.opcoes = this.matriz;
        //this.opcoes = ['🪨', '📄', '✂️', '🔥'];

        this.campo = document.getElementById('campo');
        this.span = null;
        this.criarSpan();
        this.mover();
    }

    criarSpan() {
        this.span = document.createElement('span');
        this.span.className = 'elemento';
        const caractereAleatorio = this.opcoes[Math.floor(Math.random() * this.opcoes.length)];
        this.span.textContent = caractereAleatorio;

        // Posicionando inicialmente dentro da área visível da tela
        this.posicionarSpan();

        this.campo.appendChild(this.span);
    }

    posicionarSpan() {
        const offsetX = Math.random() * (window.innerWidth - 50); // 50 é a largura do span
        const offsetY = Math.random() * (window.innerHeight - 20); // 20 é a altura do span
        this.span.style.left = offsetX + 'px';
        this.span.style.top = offsetY + 'px';
    }

    mover() {
        const targetX = Math.random() * (window.innerWidth - 50);
        const targetY = Math.random() * (window.innerHeight - 20);
        const startX = this.span.offsetLeft;
        const startY = this.span.offsetTop;
        const step = 1; // Define o número de pixels a serem movidos em cada passo
        const duration = 500; // Define a duração total da animação em milissegundos
        const steps = duration / step; // Calcula o número total de passos

        let stepCount = 0;

        const moveStep = () => {
            const progress = stepCount / steps;
            const currentX = startX + (targetX - startX) * progress;
            const currentY = startY + (targetY - startY) * progress;
            this.span.style.left = currentX + 'px';
            this.span.style.top = currentY + 'px';

            // Verifica se houve colisão com outros elementos
            this.verificarColisao();

            stepCount++;
            if (stepCount < steps) {
                setTimeout(moveStep, step); // Chama a próxima etapa após o intervalo de tempo definido
            } else {
                this.mover(); // Reinicia o movimento
            }
        };

        moveStep();
    }

    verificarColisao() {

        let elementos = document.querySelectorAll('.elemento');

        let primeiroIcone = elementos[0].textContent;
        if (elementos.length > 1) {
            let todosIguais = true; // Assume all elements are equal initially

            for (let i = 1; i < elementos.length; i++) {
                if (elementos[i].textContent !== primeiroIcone) {
                    todosIguais = false;
                    break; // Exit the loop as soon as a different element is found
                }
            }
            if (todosIguais) {
                // Limpar conteúdo da div
                document.getElementById('campo').innerHTML = '';

                // Aumentar o nível
                nivel++;

                // Iniciar um novo jogo
                newGame();
                return;
            }
        }

        elementos.forEach(elemento => {
            if (elemento !== this.span) {
                const rect1 = this.span.getBoundingClientRect();
                const rect2 = elemento.getBoundingClientRect();


                if (rect1.x < rect2.x + rect2.width &&
                    rect1.x + rect1.width > rect2.x &&
                    rect1.y < rect2.y + rect2.height &&
                    rect1.y + rect1.height > rect2.y) {
                    // Colisão detectada, troca os ícones
                    let tocarSom = false;
                    const temp = this.span.textContent;
                    if ((elemento.textContent == "🪨" && temp == "✂️") ||
                        (elemento.textContent == "✂️" && temp == "📄") ||
                        (elemento.textContent == "📄" && temp == "🪨") ||
                        (elemento.textContent == "🪨" && temp == "🔥") ||
                        (elemento.textContent == "🔥" && temp == "✂️") ||
                        (elemento.textContent == "⚡" && temp == "✂️") ||
                        (elemento.textContent == "🔥" && temp == "⚡") ||
                        (elemento.textContent == "🪨" && temp == "⚡") ||
                        (elemento.textContent == "💧" && temp == "✂️") ||
                        (elemento.textContent == "💧" && temp == "🪨") ||
                        (elemento.textContent == "💧" && temp == "📄") ||
                        (elemento.textContent == "⚡" && temp == "💧") ||
                        (elemento.textContent == "✂️" && temp == "🌿") ||
                        (elemento.textContent == "🌿" && temp == "🪨") ||
                        (elemento.textContent == "🌿" && temp == "💧") ||
                        (elemento.textContent == "🌿" && temp == "📄") ||
                        (elemento.textContent == "⚡" && temp == "🌿") ||
                        (elemento.textContent == "🔥" && temp == "🌿") ||
                        (elemento.textContent == "✂️" && temp == "🪽") ||
                        (elemento.textContent == "🪽" && temp == "🌿") ||
                        (elemento.textContent == "🪽" && temp == "💧") ||
                        (elemento.textContent == "🪽" && temp == "📄") ||
                        (elemento.textContent == "🪨" && temp == "🪽") ||
                        (elemento.textContent == "🔥" && temp == "🪽") ||
                        (elemento.textContent == "⚡" && temp == "🪽")
                    ) {

                        this.span.textContent = elemento.textContent;
                        tocarSom = true;
                    }

                    if ((elemento.textContent == "⚡" && temp == "📄")) {

                        this.span.textContent = "🔥";
                        tocarSom = true;
                    }

                    if (tocarSom) {
                        let som;
                        if (elemento.textContent == "🪨") {
                            som = 'sound_stone'
                        }
                        if (elemento.textContent == "📄") {
                            som = 'sound_paper'
                        }
                        if (elemento.textContent == "🔥") {
                            som = 'sound_fire'
                        }
                        if (elemento.textContent == "✂️") {
                            som = 'sound_scissors'
                        }
                        let somColisao = document.getElementById(som);
                        somColisao.play()
                    }


                    if ((elemento.textContent == "📄" && temp == "🔥") ||
                        (elemento.textContent == "🔥" && temp == "💧")
                    ) {


                        let som;

                        if (temp == "🔥") {
                            som = 'sound_fire'
                        }

                        let somColisao = document.getElementById(som);
                        somColisao.play()
                        elemento.remove();
                        if (elementos.length == 1) {
                            newGame();
                        }
                        let todosIguais2 = true; // Assume all elements are equal initially

                        for (let i = 1; i < elementos.length; i++) {
                            if (elementos[i].textContent !== primeiroIcone) {
                                todosIguais2 = false;
                                break; // Exit the loop as soon as a different element is found
                            }
                        }

                        if (todosIguais2) {
                            // Limpar conteúdo da div
                            document.getElementById('campo').innerHTML = '';

                            // Aumentar o nível
                            nivel++;

                            // Iniciar um novo jogo
                            newGame();
                            return;
                        }


                    }




                }
            }
        });
    }
}
nivel = 3;
let elementosLista;
function newGame() {

    elementosLista = [];
    for (let k = 0; k < nivel; k++) {
        elementosLista.push(new Elemento());
    }
}

newGame();

function verificaSozinho() {
    let elementos = document.querySelectorAll('.elemento');

    if (elementos.length < 2) {

        // Limpar conteúdo da div
        document.getElementById('campo').innerHTML = '';

        // Aumentar o nível
        nivel++;

        // Iniciar um novo jogo
        newGame();
        return;

    }
}

setInterval(verificaSozinho, 10 * 1000);
function registrarVisita() {
    // Obtenha a data atual
    const dataAtual = new Date();
    // Formate a data como AAAA-MM-DD
    const dataFormatada = dataAtual.toISOString().slice(0, 10);

    // Verifique se a data já foi registrada
    let visitas = localStorage.getItem('visitas');
    if (visitas) {
        visitas = JSON.parse(visitas);
        // Verifique se a data já está na lista de visitas
        if (!visitas.includes(dataFormatada)) {
            // Se não estiver, adicione-a
            visitas.push(dataFormatada);
            localStorage.setItem('visitas', JSON.stringify(visitas));
        }
    } else {
        // Se não houver visitas registradas, crie uma nova lista com a data atual
        localStorage.setItem('visitas', JSON.stringify([dataFormatada]));
    }
}

function contarDiasDiferentes() {
    // Recupere as visitas do localStorage
    const visitas = localStorage.getItem('visitas');
    if (visitas) {
        // Converta para array
        const visitasArray = JSON.parse(visitas);
        // Use um Set para garantir que cada dia seja contado apenas uma vez
        const diasDiferentes = new Set(visitasArray);
        // Retorne o número de dias diferentes
        return diasDiferentes.size;
    } else {
        // Se não houver visitas registradas, retorne 0
        return 0;
    }
}

// Registre a visita sempre que o usuário acessar o jogo
registrarVisita();

// Obtenha e imprima o número de dias diferentes que o usuário visitou o jogo

//console.log("O usuário entrou no jogo em " + diasDiferentes + " dias diferentes.");