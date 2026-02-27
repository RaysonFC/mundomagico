// 🧠 JOGO DA MEMÓRIA - COMPLETO
export const MEMORY_CARDS = [
  {e:'🦁',s:'RAUUU!'}, {e:'🐯',s:'RRRR!'}, {e:'🐱',s:'MIAU!'},
  {e:'🐶',s:'AU AU!'}, {e:'🐴',s:'HIIII!'}, {e:'🦄',s:'MAGIA!'},
  {e:'🐘',s:'BRRR!'}, {e:'🦒',s:'OOH!'}, {e:'🐒',s:'UU-AA!'},
  {e:'🐸',s:'CROAC!'}, {e:'🦋',s:'FLUTTER!'}, {e:'🐧',s:'SQUAWK!'}
];

let memoryGrid = [], flipped = [], matches = 0, moves = 0, timer = 0, gameSize = 6;

export function initMemory(size = 6) {
  gameSize = size; matches = 0; moves = 0; timer = 0; flipped = [];
  $('mMov').textContent = moves;
  $('mPairs').textContent = `${matches}/${gameSize}`;
  $('mTimer').textContent = timer;
  
  const cardsNeeded = gameSize;
  const selectedCards = MEMORY_CARDS.slice(0, cardsNeeded).concat(
    MEMORY_CARDS.slice(0, cardsNeeded)
  );
  
  memoryGrid = shuffle(selectedCards);
  renderMemoryGrid();
  clearInterval(window.memoryTimer);
  window.memoryTimer = setInterval(() => {
    timer++;
    $('mTimer').textContent = timer;
  }, 1000);
}

function renderMemoryGrid() {
  const grid = $('mgrid');
  grid.style.gridTemplateColumns = `repeat(${Math.sqrt(gameSize * 2)}, 1fr)`;
  grid.innerHTML = '';
  
  memoryGrid.forEach((card, i) => {
    const mc = document.createElement('div');
    mc.className = 'mc';
    mc.innerHTML = `
      <div class="mci">
        <div class="mcf"><div class="mcq">?</div></div>
        <div class="mcb">
          <span class="mcc">${card.e}</span>
          <span class="mclb">${card.s}</span>
        </div>
      </div>
    `;
    mc.onclick = () => flipCard(i);
    grid.appendChild(mc);
  });
}

function flipCard(index) {
  if(flipped.length === 2 || flipped.includes(index) || memoryGrid[index] === null) return;
  
  const card = document.querySelectorAll('.mc')[index];
  card.classList.add('fp');
  
  flipped.push(index);
  if(flipped.length === 2) {
    moves++;
    $('mMov').textContent = moves;
    setTimeout(checkMatch, 800);
  }
}

function checkMatch() {
  const [i1, i2] = flipped;
  const card1 = memoryGrid[i1], card2 = memoryGrid[i2];
  
  if(card1.e === card2.e) {
    matches++;
    $('mPairs').textContent = `${matches}/${gameSize}`;
    memoryGrid[i1] = memoryGrid[i2] = null;
    
    if(matches === gameSize) {
      clearInterval(window.memoryTimer);
      showResult('memory', moves, 3);
      addCoins(50 - moves * 2);
    }
  } else {
    document.querySelectorAll('.mc')[i1].classList.add('mx');
    document.querySelectorAll('.mc')[i2].classList.add('mx');
    setTimeout(() => {
      document.querySelectorAll('.mc')[i1].classList.remove('fp', 'mx');
      document.querySelectorAll('.mc')[i2].classList.remove('fp', 'mx');
    }, 600);
  }
  
  flipped = [];
}

