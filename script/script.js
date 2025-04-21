const palavraSecreta = "audio";
let tentativaAtual = "";
let linhaAtual = 0;
const maxTentativas = 6;

const tabuleiro = document.getElementById("tabuleiro");
const teclado = document.getElementById("teclado");
const mensagem = document.getElementById("mensagem");


for (let i = 0; i < maxTentativas; i++) {
  const linha = document.createElement("div");
  linha.classList.add("linha");
  for (let j = 0; j < 5; j++) {
    const celula = document.createElement("div");
    celula.classList.add("celula");
    linha.appendChild(celula);
  }
  tabuleiro.appendChild(linha);
}

const letras = [..."QWERTYUIOP", ..."ASDFGHJKL", ..."ZXCVBNM", "⌫", "⏎"];

letras.forEach(letra => {
  const tecla = document.createElement("button");
  tecla.textContent = letra;
  tecla.classList.add("tecla");
  tecla.setAttribute("data-letra", letra);
  tecla.addEventListener("click", () => processarTecla(letra));
  teclado.appendChild(tecla);
});

let jogoEncerrado = false;

function processarTecla(letra) {
    if (jogoEncerrado) return;
  
    if (letra === "⌫") {
      tentativaAtual = tentativaAtual.slice(0, -1);
      atualizarTabuleiro();
    } else if (letra === "⏎") {
      if (tentativaAtual.length === 5) {
        verificarTentativa(); 
      }
    } else if (tentativaAtual.length < 5) {
      tentativaAtual += letra.toLowerCase();
      atualizarTabuleiro();
    }
  }
  
function atualizarTabuleiro() {
  const linha = tabuleiro.children[linhaAtual];
  for (let i = 0; i < 5; i++) {
    const celula = linha.children[i];
    celula.textContent = tentativaAtual[i] || "";
  }
}

function verificarTentativa() {
  const linha = tabuleiro.children[linhaAtual];
  const letrasPalavra = palavraSecreta.split("");
  const tentativa = tentativaAtual;

  for (let i = 0; i < 5; i++) {
    const letra = tentativa[i];
    const celula = linha.children[i];
    celula.textContent = letra;

    if (letra === palavraSecreta[i]) {
      celula.classList.add("correta");
      atualizarTecla(letra, "correta");
    } else if (letrasPalavra.includes(letra)) {
      celula.classList.add("presente");
      atualizarTecla(letra, "presente");
    } else {
      celula.classList.add("ausente");
      atualizarTecla(letra, "ausente");
    }
  }

  if (tentativa === palavraSecreta) {
    mensagem.textContent = "Winner winner, chicken in dinner!";
    jogoEncerrado = true;
  } else if (++linhaAtual >= maxTentativas) {
    mensagem.textContent = `Fim de jogo! A palavra era ${palavraSecreta.toUpperCase()}.`;
    jogoEncerrado = true;
  }

  tentativaAtual = "";
}

function atualizarTecla(letra, classe) {
  const tecla = teclado.querySelector(`[data-letra="${letra.toUpperCase()}"]`);
  if (!tecla) return;


  if (
    tecla.classList.contains("correta") ||
    (tecla.classList.contains("presente") && classe === "ausente")
  ) {
    return;
  }

  tecla.classList.remove("correta", "presente", "ausente");
  tecla.classList.add(classe);
}
