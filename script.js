document.addEventListener('DOMContentLoaded', () => {
  const board = document.getElementById('board');
  const piecesContainer = document.getElementById('pieces-container');
  const levelDisplay = document.getElementById('level');
  let currentLevel = 1;
  
  const levels = [
    {
      grid: [
        ['+', '=', '', '', ''],
        ['', '', '', '', ''],
        ['', '', '', '=', ''],
        ['', '', '', '', ''],
        ['', '', '', '', '']
      ],
      pieces: ['3', '5', '10', '2'],
      solution: [[0, 0, 3], [2, 3, 2]]
    },
    // Define levels 2 to 20 here...
  ];
  
  function loadLevel(level) {
    const levelData = levels[level - 1];
    
    // Clear previous board
    board.innerHTML = '';
    piecesContainer.innerHTML = '';

    // Setup grid
    for (let row = 0; row < 5; row++) {
      for (let col = 0; col < 5; col++) {
        const cell = document.createElement('div');
        cell.classList.add('puzzle-cell');
        cell.setAttribute('data-row', row);
        cell.setAttribute('data-col', col);
        if (levelData.grid[row][col]) {
          cell.textContent = levelData.grid[row][col];
        }
        board.appendChild(cell);
      }
    }

    // Setup pieces
    levelData.pieces.forEach(piece => {
      const pieceElement = document.createElement('div');
      pieceElement.classList.add('piece');
      pieceElement.textContent = piece;
      pieceElement.setAttribute('draggable', true);
      pieceElement.addEventListener('dragstart', dragStart);
      piecesContainer.appendChild(pieceElement);
    });
  }

  function dragStart(e) {
    e.dataTransfer.setData('text', e.target.textContent);
  }

  board.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  board.addEventListener('drop', (e) => {
    const row = e.target.getAttribute('data-row');
    const col = e.target.getAttribute('data-col');
    const pieceValue = e.dataTransfer.getData('text');

    if (row && col) {
      e.target.textContent = pieceValue; 
    }
  });

  document.getElementById('checkSolution').addEventListener('click', () => {
    // Validate solution for the current level
    alert('Checking solution...');
  });

  document.getElementById('nextLevel').addEventListener('click', () => {
    currentLevel++;
    levelDisplay.textContent = currentLevel;
    loadLevel(currentLevel);
  });

  loadLevel(currentLevel);
});

