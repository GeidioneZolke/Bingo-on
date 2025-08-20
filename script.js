let cartela = [];
let sorteados = [];
let intervalo = null;

function gerarCartela() {
  cartela = [];
  let tabela = document.createElement("table");
  let letras = ["B", "I", "N", "G", "O"];
  let div = document.getElementById("cartela");
  div.innerHTML = "";

  for (let i = 0; i < 5; i++) {
    for (let j = 0; j < 5; j++) {
      let num;
      do {
        num = Math.floor(Math.random() * 15) + 1 + j * 15;
      } while (cartela.includes(num));
      if (i === 2 && j === 2) {
        num = "★"; // Espaço livre
      }
      cartela.push(num);

      let cel = document.createElement("div");
      cel.classList.add("celula");
      cel.textContent = num;
      cel.onclick = () => cel.classList.toggle("marcada");
      div.appendChild(cel);
    }
  }
}

function sortearNumero() {
  if (sorteados.length >= 75) return;
  let num;
  do {
    num = Math.floor(Math.random() * 75) + 1;
  } while (sorteados.includes(num));
  sorteados.push(num);

  document.getElementById("ultimo").textContent = num;
  document.getElementById("historico").textContent = sorteados.join(", ");

  // marcar cartela automaticamente
  document.querySelectorAll(".celula").forEach(cel => {
    if (cel.textContent == num) {
      cel.classList.add("marcada");
    }
  });

  verificarVitoria();
}

function autoSortear() {
  if (!intervalo) {
    intervalo = setInterval(sortearNumero, 1500);
  }
}

function pararAuto() {
  clearInterval(intervalo);
  intervalo = null;
}

function novaCartela() {
  gerarCartela();
  sorteados = [];
  document.getElementById("ultimo").textContent = "";
  document.getElementById("historico").textContent = "";
  document.getElementById("vitorias").textContent = "";
}

function limparCartela() {
  document.querySelectorAll(".celula").forEach(cel => {
    cel.classList.remove("marcada");
  });
  document.getElementById("vitorias").textContent = "";
}

function reiniciar() {
  sorteados = [];
  document.getElementById("ultimo").textContent = "";
  document.getElementById("historico").textContent = "";
  document.getElementById("vitorias").textContent = "";
  gerarCartela();
}

function verificarVitoria() {
  let celulas = document.querySelectorAll(".celula");
  let matriz = [];
  for (let i = 0; i < 5; i++) {
    matriz[i] = [];
    for (let j = 0; j < 5; j++) {
      let idx = i * 5 + j;
      matriz[i][j] = celulas[idx].classList.contains("marcada") || celulas[idx].textContent === "★";
    }
  }

  // linhas
  for (let i = 0; i < 5; i++) {
    if (matriz[i].every(x => x)) {
      document.getElementById("vitorias").textContent = "Linha completa!";
    }
  }

  // colunas
  for (let j = 0; j < 5; j++) {
    if (matriz.every(row => row[j])) {
      document.getElementById("vitorias").textContent = "Coluna completa!";
    }
  }

  // diagonais
  if ([0,1,2,3,4].every(i => matriz[i][i])) {
    document.getElementById("vitorias").textContent = "Diagonal completa!";
  }
  if ([0,1,2,3,4].every(i => matriz[i][4-i])) {
    document.getElementById("vitorias").textContent = "Diagonal completa!";
  }

  // cartela cheia
  if (matriz.flat().every(x => x)) {
    document.getElementById("vitorias").textContent = "BINGO! Cartela completa 🎉";
  }
}

// gerar cartela ao carregar
window.onload = gerarCartela;
