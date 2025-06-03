import React, { useState } from 'react';

// PUBLIC_INTERFACE
/**
 * TicTacToeClassic
 * The main container for the TicTacToe Classic game, 3x3 two-player mode, retro 90's style.
 */
function TicTacToeClassic() {
  // Represents the board as a 9-element array; each cell holds either 'X', 'O', or null.
  const [board, setBoard] = useState(Array(9).fill(null));
  // 'X' always starts first.
  const [isXNext, setIsXNext] = useState(true);
  // Will be 'X' | 'O' if winner, 'draw' if board is full, or null if game ongoing.
  const winner = calculateWinner(board);
  const draw = !winner && board.every(Boolean);

  // Restart the game state.
  // PUBLIC_INTERFACE
  const handleRestart = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
  };

  // PUBLIC_INTERFACE
  const handleCellClick = (idx) => {
    // Do nothing if game is over or cell is filled.
    if (winner || draw || board[idx]) return;
    const nextBoard = [...board];
    nextBoard[idx] = isXNext ? 'X' : 'O';
    setBoard(nextBoard);
    setIsXNext((prev) => !prev);
  };

  // Prepare the game status message.
  let statusMsg;
  if (winner) {
    statusMsg = `Winner: ${winner}`;
  } else if (draw) {
    statusMsg = "It's a draw!";
  } else {
    statusMsg = `Turn: ${isXNext ? 'X' : 'O'}`;
  }

  // Preload/define pixel font via Google Fonts embed
  // Only inserted once per page load.
  React.useEffect(() => {
    const id = 'retrofont-css-link';
    if (!document.getElementById(id)) {
      const link = document.createElement('link');
      link.id = id;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
      document.head.appendChild(link);
    }
  }, []);

  // Render single cell
  // PUBLIC_INTERFACE
  const Cell = ({ value, onClick, highlight }) => (
    <button
      className={`ttt-cell${highlight ? ' highlight' : ''}`}
      onClick={onClick}
      type="button"
      aria-label="cell"
    >
      {value}
    </button>
  );

  // Highlight winning cells
  const winLine = winner && winner !== 'draw' ? getWinLine(board) : [];

  return (
    <div className="ttt-outer-container">
      <div className="ttt-title">TicTacToe Classic</div>
      <div className="ttt-status">{statusMsg}</div>
      <div className="ttt-board">
        {board.map((cell, idx) => (
          <Cell
            key={idx}
            value={cell}
            onClick={() => handleCellClick(idx)}
            highlight={winLine.includes(idx)}
          />
        ))}
      </div>
      <button className="ttt-restart-btn" onClick={handleRestart}>
        &#8634; Restart Game
      </button>
      <style>{`
        /* Retro 90's TicTacToeClassic styles */
        .ttt-outer-container {
          background: #fff;
          border: 6px solid #1976d2;
          border-radius: 20px;
          max-width: 374px;
          margin: 52px auto;
          padding: 36px 28px 30px 28px;
          box-shadow: 0 6px 32px 0 rgba(39, 60, 130, 0.13), 0 2px 16px 0 #1976d233;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .ttt-title {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          font-size: 1.13rem;
          letter-spacing: 2px;
          margin-bottom: 26px;
          color: #1976d2;
          text-shadow: 2px 2px #ff980097, 0 0 2px #1976d299;
        }
        .ttt-status {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          font-size: 0.8rem;
          color: #ff9800;
          margin-bottom: 24px;
          min-height: 24px;
          letter-spacing: 1px;
          text-align: center;
        }
        .ttt-board {
          display: grid;
          grid-template-columns: repeat(3, 56px);
          grid-template-rows: repeat(3, 56px);
          gap: 0;
          border: 4px solid #1976d2;
          box-shadow: 0 3px 0 #1976d299;
          background: #ffffff;
          border-radius: 10px;
          margin-bottom: 32px;
        }
        .ttt-cell {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          font-size: 1.4rem;
          background: #fff;
          border: 4px solid #1976d2;
          outline: none;
          color: #1976d2;
          cursor: pointer;
          transition: background 0.18s, color 0.18s, box-shadow 0.14s;
          box-sizing: border-box;
          padding: 2px 1px 0 3px;
          width: 56px;
          height: 56px;
          box-shadow: 2px 2px #0004;
          position: relative;
          z-index: 1;
        }
        .ttt-cell:not(:nth-child(3n)) {
          border-right-width: 0;
        }
        .ttt-cell:not(:nth-last-child(-n+3)) {
          border-bottom-width: 0;
        }
        .ttt-cell.highlight {
          background: #ff980018;
          color: #ff9800;
          border-color: #ff9800;
          box-shadow: 0 0 10px #ff980077, 2px 2px #1976d299;
          z-index: 2;
        }
        .ttt-restart-btn {
          font-family: 'Press Start 2P', 'Courier New', monospace;
          background: #1976d2;
          color: #fff;
          font-size: 0.76rem;
          padding: 13px 14px 11px 16px;
          border-radius: 10px;
          border: 3px solid #ff9800;
          font-weight: bold;
          letter-spacing: 2px;
          cursor: pointer;
          margin-top: 5px;
          transition: background 0.18s, color 0.13s, border 0.15s;
          box-shadow: 1px 1px 0 #ff980055;
        }
        .ttt-restart-btn:hover,
        .ttt-restart-btn:focus {
          background: #ff9800;
          color: #fff;
          border-color: #1976d2;
          box-shadow: 0 2px 8px #1976d2bb;
        }
        @media (max-width: 450px) {
          .ttt-outer-container {
            max-width: 96vw;
            padding: 8vw 1.5vw 2vw 1.5vw;
          }
          .ttt-title { font-size: 0.8rem; word-break: break-all;}
          .ttt-status { font-size: 0.66rem; }
          .ttt-board { grid-template-columns: repeat(3,11vw); grid-template-rows: repeat(3,11vw);}
          .ttt-cell { font-size: 1.1rem; width:11vw; height:11vw;}
        }
      `}</style>
    </div>
  );
}

/**
 * PUBLIC_INTERFACE
 * Helper function to determine the winner given a TicTacToe board.
 * Returns 'X', 'O', or null if none; "draw" is managed in the container.
 */
function calculateWinner(squares) {
  // All possible win lines in a 3x3 grid
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],     // rows
    [0,3,6], [1,4,7], [2,5,8],     // columns
    [0,4,8], [2,4,6]               // diagonals
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[a] === squares[c]
    ) {
      return squares[a]; // 'X' or 'O'
    }
  }
  return null; // No winner found
}

// Get winning line array (for highlighting)
function getWinLine(squares) {
  const lines = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8],
    [0,4,8], [2,4,6]
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a,b,c] = lines[i];
    if (
      squares[a] &&
      squares[a] === squares[b] &&
      squares[b] === squares[c]
    ) {
      return [a, b, c];
    }
  }
  return [];
}

export default TicTacToeClassic;
