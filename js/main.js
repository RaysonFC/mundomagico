// 🎮 MUNDO MÁGICO - MAIN
import './alpha.js';
import './memory.js';
import './maze.js';

// ESTADO GLOBAL
let coins = +(localStorage.getItem('mw_coins') || 0);
let stars = {a: 0, m: 0, z: 0};

// UTILITÁRIOS
const $ = id => document.getElementById(id);
const showScreen = id => {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('on'));
  $(id)?.classList.add('on');
};

// INICIALIZAÇÃO
document.addEventListener('DOMContentLoaded', () => {
  // Carrega progresso
  stars.a = +(localStorage.getItem('mw_stars_a') || 0);
  stars.m = +(localStorage.getItem('mw_stars_m') || 0);
  stars.z = +(localStorage.getItem('mw_stars_z') || 0);
  
  // Atualiza UI
  $('starsAlpha').textContent = '★'.repeat(stars.a) + '☆'.repeat(3-stars.a);
  $('starsMemory').textContent = '★'.repeat(stars.m) + '☆'.repeat(3-stars.m);
  $('starsMaze').textContent = '★'.repeat(stars.z) + '☆'.repeat(3-stars.z);
  $('totalCoins').textContent = coins;

  // Gera estrelas
  const universe = $('universe');
  for (let i = 0; i < 100; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    star.style.cssText = `
      width: ${0.5 + Math.random() * 2}px;
      height: ${0.5 + Math.random() * 2}px;
      top: ${Math.random() * 90}vh;
      left: ${Math.random() * 100}vw;
      animation-delay: -${Math.random() * 6}s;
      animation-duration: ${2 + Math.random() * 3}s;
    `;
    universe.appendChild(star);
  }

  // Event listeners
  $('btnAlpha').onclick = () => showScreen('sAlpha');
  $('btnMemory').onclick = () => showScreen('sMemory');
  $('btnMaze').onclick = () => showScreen('sMaze');

  // Remove loading
  setTimeout(() => {
    $('sLoading').classList.remove('on');
    showScreen('sMenu');
  }, 1500);
});

// SALVAR PROGRESSO
window.saveStars = (game, score) => {
  const key = `mw_stars_${game}`;
  const current = +(localStorage.getItem(key) || 0);
  if (score > current) {
    localStorage.setItem(key, score);
    stars[game] = score;
    $(`stars${game.toUpperCase()}`).textContent = '★'.repeat(score) + '☆'.repeat(3-score);
  }
};

window.addCoins = (amount) => {
  coins += amount;
  localStorage.setItem('mw_coins', coins);
  $('totalCoins').textContent = coins;
};

