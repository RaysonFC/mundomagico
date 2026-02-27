
// 🌿 LABIRINTO MÁGICO - COMPLETO
export const MAZE_LEVELS = [
  {name:'🌿 Floresta Encantada', size:7, maxSteps:35},
  {name:'🏖️ Praia Mística', size:9, maxSteps:55},
  {name:'🏔️ Pico Celestial', size:11, maxSteps:80}
];

let mazeCanvas, ctx, mazeData, player = {x:1, y:1}, mazeLevel = 0, mazeSteps = 0, hintsUsed = 0;

export function initMaze(restart = false) {
  if(restart) mazeLevel = 0;
  mazeData = generateMaze(MAZE_LEVELS[mazeLevel].size);
  player = {x:1, y:1}; mazeSteps = 0; hintsUsed = 0;
  $('mzLvl').textContent = mazeLevel + 1;
  $('mzName').textContent = MAZE_LEVELS[mazeLevel].name;
  $('mzSteps').textContent = mazeSteps;
  updateHintDots();
  renderMaze();
}

function generateMaze(size) {
  const maze = Array(size).fill().map(() => Array(size).fill(1));
  // Algoritmo recursivo para gerar labirinto (simplificado)
  function carve(x, y) {
    maze[y][x] = 0;
    const dirs = [[0,-1],[1,0],[0,1],[-1,0]];
    shuffle(dirs).forEach(([dx, dy]) => {
      const nx = x + dx * 2, ny = y + dy * 2;
      if(nx > 0 && nx < size-1 && ny > 0 && ny < size-1 && maze[ny][nx] === 1) {
        maze[y + dy][x + dx] = 0;
        carve(nx, ny);
      }
    });
  }
  carve(1, 1);
  maze[size-2][size-2] = 0; // Saída
  return maze;
}

function renderMaze() {
  mazeCanvas = $('mc');
  ctx = mazeCanvas.getContext('2d');
  mazeCanvas.width = mazeCanvas.offsetWidth;
  mazeCanvas.height = mazeCanvas.offsetWidth;
  const cell = mazeCanvas.width / mazeData.length;
  
  ctx.fillStyle = '#0a1628';
  ctx.fillRect(0, 0, mazeCanvas.width, mazeCanvas.height);
  
  for(let y = 0; y < mazeData.length; y++) {
    for(let x = 0; x < mazeData[y].length; x++) {
      if(mazeData[y][x] === 1) {
        ctx.fillStyle = '#1a2a44';
        ctx.fillRect(x * cell, y * cell, cell, cell);
      }
    }
  }
  
  // Jogador
  ctx.fillStyle = '#ffd700';
  ctx.beginPath();
  ctx.arc(player.x * cell + cell/2, player.y * cell + cell/2, cell/3, 0, Math.PI * 2);
  ctx.fill();
  
  // Saída
  ctx.fillStyle = '#ffeb3b';
  ctx.fillRect((mazeData.length-2) * cell + cell/4, (mazeData.length-2) * cell + cell/4, cell/2, cell/2);
}

window.mv = (dx, dy) => {
  const newX = player.x + dx, newY = player.y + dy;
  if(newX >= 0 && newX < mazeData[0].length && newY >= 0 && newY < mazeData.length && mazeData[newY][newX] === 0) {
    player = {x: newX, y: newY};
    mazeSteps++;
    $('mzSteps').textContent = mazeSteps;
    renderMaze();
    
    if(player.x === mazeData.length-2 && player.y === mazeData.length-2) {
      showResult('maze', mazeSteps, 3);
      addCoins(100 - mazeSteps - hintsUsed * 20);
      mazeLevel = Math.min(mazeLevel + 1, MAZE_LEVELS.length - 1);
    }
  }
};

window.useHint = () => {
  if(hintsUsed < 3) {
    hintsUsed++;
    updateHintDots();
    // Mostra caminho mais curto (simplificado)
    showToast('💡 Dica: Vá em direção à estrela dourada!');
  }
};

function updateHintDots() {
  for(let i = 0; i < 3; i++) {
    $(`hd${i}`).className = i < hintsUsed ? 'hdot used' : 'hdot';
  }
}
