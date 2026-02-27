// 🔤 JOGO DO ALFABETO - COMPLETO
export const ALPHA_DATA = [
  {l:'A',e:'🍎',w:'ABACAXI'}, {l:'B',e:'🎈',w:'BOLA'}, {l:'C',e:'🐱',w:'GATO'},
  {l:'D',e:'🐶',w:'CACHORRO'}, {l:'E',e:'⭐',w:'ESTRELA'}, {l:'F',e:'🌸',w:'FLOR'},
  {l:'G',e:'🦒',w:'GIRAFA'}, {l:'H',e:'🏠',w:'CASA'}, {l:'I',e:'🌈',w:'ARCO-ÍRIS'},
  {l:'J',e:'🐞',w:'JOANINHA'}, {l:'K',e:'🥝',w:'KIWI'}, {l:'L',e:'🦁',w:'LEÃO'},
  {l:'M',e:'🐒',w:'MACACO'}, {l:'N',e:'☁️',w:'NUVEM'}, {l:'O',e:'🐻',w:'URSO'},
  {l:'P',e:'🦜',w:'PAPAGAIO'}, {l:'Q',e:'🧀',w:'QUEIJO'}, {l:'R',e:'🐸',w:'RÃ'},
  {l:'S',e:'🐍',w:'COBRA'}, {l:'T',e:'🐢',w:'TARTARUGA'}, {l:'U',e:'🍇',w:'UVA'},
  {l:'V',e:'🦋',w:'BORBOLETA'}, {l:'W',e:'🌊',w:'ONDA'}, {l:'X',e:'🎸',w:'VIOLÃO'},
  {l:'Y',e:'🧘',w:'YOGA'}, {l:'Z',e:'🦓',w:'ZEBRA'}
];

let currentAlpha = 0, alphaLives = 3, alphaScore = 0, alphaTotal = 10;

export function initAlpha() {
  currentAlpha = 0; alphaLives = 3; alphaScore = 0; alphaTotal = ALPHA_DATA.length;
  $('aScore').textContent = alphaScore;
  $('aLives').textContent = '❤️❤️❤️'.slice(0, alphaLives);
  $('aCur').textContent = currentAlpha + 1;
  $('aTotal').textContent = alphaTotal;
  nextAlphaQuestion();
}

function nextAlphaQuestion() {
  const data = ALPHA_DATA[currentAlpha];
  $('aEmoji').textContent = data.e;
  $('aWord').textContent = data.w;
  $('aHint').textContent = `Começa com ${data.l}? 🤔`;
  
  const options = [data.l];
  while(options.length < 4) {
    const rand = ALPHA_DATA[Math.floor(Math.random() * ALPHA_DATA.length)].l;
    if(!options.includes(rand)) options.push(rand);
  }
  
  options.sort(() => Math.random() - 0.5);
  $('aOpts').innerHTML = '';
  options.forEach((letter, i) => {
    const btn = document.createElement('button');
    btn.className = 'obtn';
    btn.textContent = letter;
    btn.onclick = () => checkAlphaAnswer(letter === data.l, letter);
    $('aOpts').appendChild(btn);
  });
  
  $('aProgress').style.width = `${(currentAlpha / alphaTotal) * 100}%`;
  $('aCur').textContent = currentAlpha + 1;
}

function checkAlphaAnswer(isCorrect, letter) {
  const buttons = $('aOpts').children;
  for(let btn of buttons) btn.disabled = true;
  
  if(isCorrect) {
    buttons[Array.from(buttons).indexOf(event.target)].classList.add('hit');
    alphaScore++;
    $('aScore').textContent = alphaScore;
    addCoins(10);
    setTimeout(() => {
      currentAlpha++;
      if(currentAlpha < alphaTotal) {
        nextAlphaQuestion();
      } else {
        showResult('alpha', alphaScore, 3);
      }
    }, 800);
  } else {
    alphaLives--;
    $('aLives').textContent = '❤️'.repeat(alphaLives) + '💔'.repeat(3-alphaLives);
    event.target.classList.add('miss');
    setTimeout(() => nextAlphaQuestion(), 1000);
  }
}
