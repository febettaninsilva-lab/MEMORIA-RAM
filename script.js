const canvas = document.getElementById('ramCanvas');
const ctx = canvas.getContext('2d');
const binaryValueEl = document.getElementById('binaryValue');

// Configurações gerais
const taxaVazamento = 0.3;
const limiarBit1 = 20;

// Estrutura para 4 Bits (Array de Objetos)
// Cada bit tem sua própria carga de 0 a 100
let bits = [
  { carga: 0 },
  { carga: 0 },
  { carga: 0 },
  { carga: 0 }
];

// Escreve um valor de 4 bits recebendo um Array como [1, 0, 1, 0]
function escreverByte(padrao) {
  for (let i = 0; i < 4; i++) {
    bits[i].carga = padrao[i] === 1 ? 100 : 0;
  }
}

// Recarrega todos os bits que ainda estão ativos (>= 20%)
function executarRefreshGlobal() {
  for (let i = 0; i < 4; i++) {
    if (bits[i].carga >= limiarBit1) {
      bits[i].carga = 100;
    }
  }
}

// Loop Principal de Atualização
function atualizar() {
  let resultadoBinario = "";

  // 1. Atualiza a carga de cada um dos 4 bits
  for (let i = 0; i < 4; i++) {
    if (bits[i].carga > 0) {
      bits[i].carga -= taxaVazamento;
      if (bits[i].carga < 0) bits[i].carga = 0;
    }

    // Determina se o bit atual é 1 ou 0
    const valorBit = bits[i].carga >= limiarBit1 ? "1" : "0";
    resultadoBinario += valorBit;
  }

  // 2. Atualiza o texto na tela mostrando a sequência binária (ex: 1010)
  binaryValueEl.innerText = resultadoBinario;

  // 3. Renderiza visualmente os 4 capacitores no Canvas
  desenharCapacitores();

  requestAnimationFrame(atualizar);
}

// Função responsável por desenhar a linha de 4 capacitores
function desenharCapacitores() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const larguraCapacitor = 70;
  const alturaMax = 180;
  const espacamento = 50;
  const margemEsquerda = 40;
  const yBase = 40;

  for (let i = 0; i < 4; i++) {
    const xPos = margemEsquerda + i * (larguraCapacitor + espacamento);
    const cargaAtual = bits[i].carga;
    const bitAtivo = cargaAtual >= limiarBit1;

    // Desenha o contorno de cada capacitor
    ctx.strokeStyle = '#ffffff';
    ctx.lineWidth = 3;
    ctx.strokeRect(xPos, yBase, larguraCapacitor, alturaMax);

    // Calcula a altura do preenchimento de carga
    const alturaCarga = (cargaAtual / 100) * alturaMax;
    const yCarga = yBase + (alturaMax - alturaCarga);

    // Define a cor da carga
    ctx.fillStyle = bitAtivo ? '#00b4d8' : '#e94560';

    if (cargaAtual > 0) {
      ctx.fillRect(xPos + 2, yCarga + 2, larguraCapacitor - 4, alturaCarga - 2);
    }

    // Desenha a identificação do Bit no topo (Bit 3, Bit 2, Bit 1, Bit 0)
    ctx.fillStyle = '#ffffff';
    ctx.font = '14px Arial';
    ctx.fillText(`Bit ${3 - i}`, xPos + 18, yBase - 10);

    // Linha limite pontilhada (Limiar)
    const yLimiar = yBase + (alturaMax - (limiarBit1 / 100) * alturaMax);
    ctx.strokeStyle = '#ffcc00';
    ctx.lineWidth = 1;
    ctx.setLineDash([4, 4]);
    ctx.beginPath();
    ctx.moveTo(xPos - 5, yLimiar);
    ctx.lineTo(xPos + larguraCapacitor + 5, yLimiar);
    ctx.stroke();
    ctx.setLineDash([]);
  }
}

// Inicia a animação
atualizar();