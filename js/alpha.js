// 🔤 JOGO DO ALFABETO
const ALPHA_DATA = [
  {l:'A',e:'🍎',w:'ABACAXI'}, {l:'B',e:'🎈',w:'BOLA'}, {l:'C',e:'🐱',w:'GATO'},
  {l:'D',e:'🐶',w:'CACHORRO'}, {l:'E',e:'⭐',w:'ESTRELA'}, {l:'F',e:'🌸',w:'FLOR'},
  // ... (demais cartas)
];

let currentAlpha = 0, alphaLives = 3, alphaScore = 0;

export function initAlpha() {
  currentAlpha = 0;
  alphaLives = 3;
  alphaScore = 0;
  nextAlphaQuestion();
}

function nextAlphaQuestion() {
  const data = ALPHA_DATA[currentAlpha];
  $('aEmoji').textContent = data.e;
  $('aWord').textContent = data.w;
  $('aOpts').innerHTML = ''; // Gera 4 opções
  
  // Lógica das opções (correta + 3 erradas)
  const options = [data.l];
  while(options.length < 4) {
    const rand = ALPHA_DATA[Math.floor(Math.random()*ALPHA_DATA.length)].l;
    if(!options.includes(rand)) options.push(rand);
  }
  
  options.sort(() => Math.random() - 0.5).forEach(letter => {
    const btn = document.createElement('button');
    btn.className = 'obtn';
    btn.textContent = letter;
    btn.onclick = () => checkAlphaAnswer(letter, data.l);
    $('aOpts').appendChild(btn);
  });
}

function checkAlphaAnswer(selected, correct) {
  if(selected === correct) {
    alphaScore++;
    addCoins(10);
    // Animação acerto
    setTimeout(() => nextAlphaQuestion(), 1000);
  } else {
    alphaLives--;
    // Animação erro
  }
}

