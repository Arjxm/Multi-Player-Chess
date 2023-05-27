
import React, { useState, useEffect, useRef } from 'react';
import {socket} from '../utils/socket/socket';

// Constants
const BOARD_SIZE = 8;
const SQUARE_SIZE = 118;
const CANVAS_SIZE = SQUARE_SIZE * BOARD_SIZE;

const Chessboard: React.FC = () => {
  const [selectedPiece, setSelectedPiece] = useState<[number, number] | null>(null);
  const [board, setBoard] = useState<string[][]>(initializeBoard());

  // Helper function to initialize the chessboard
  function initializeBoard(): string[][] {
    // Implement your own logic to set up the initial board state
    // This example just sets up a standard chess starting position
    const initialBoard: string[][] = Array.from({ length: BOARD_SIZE }, () => Array(BOARD_SIZE).fill(null));

    // Place white pieces
    initialBoard[0] = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];
    initialBoard[1] = Array(BOARD_SIZE).fill('P');

    // Place black pieces
    initialBoard[7] = ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'];
    initialBoard[6] = Array(BOARD_SIZE).fill('p');

    return initialBoard;
  }

  // Function to handle square click events
  function handleSquareClick(row: number, col: number) {
    const piece = board[row][col];

    if (selectedPiece) {
      // Move the selected piece to the new location
      const [prevRow, prevCol] = selectedPiece;
      console.log(selectedPiece)
      const newBoard = [...board];
      newBoard[row][col] = newBoard[prevRow][prevCol];
      newBoard[prevRow][prevCol] = "";

      socket.emit("move", newBoard);
      setBoard(newBoard);
      setSelectedPiece(null);
    } else if (piece) {
      // Select the piece if it belongs to the current player
      setSelectedPiece([row, col]);
    }
  }

  socket.on("mo", (m) => {
        console.log(m)
          })

  // Function to validate the movement of each chess piece
  function validateMove(
    prevRow: number,
    prevCol: number,
    newRow: number,
    newCol: number,
    piece: string
  ): boolean {
    if (piece === null) {
      return false;
    }

    const isWhitePiece = piece === piece.toUpperCase();
    const isBlackPiece = piece === piece.toLowerCase();
    const rowDiff = newRow - prevRow;
    const colDiff = newCol - prevCol;

    switch (piece.toLowerCase()) {
      case 'p':
        if (isWhitePiece && rowDiff === -1 && colDiff === 0 && !board[newRow][newCol]) {
          return true;
        } else if (isBlackPiece && rowDiff === 1 && colDiff === 0 && !board[newRow][newCol]) {
          return true;
        } else if (isWhitePiece && rowDiff === -1 && Math.abs(colDiff) === 1 && isBlackPiece) {
          return true;
        } else if (isBlackPiece && rowDiff === 1 && Math.abs(colDiff) === 1 && isWhitePiece) {
          return true;
        }
        break;
      case 'r':
      case 'R':
        if (rowDiff === 0 || colDiff === 0) {
          if (rowDiff === 0) {
            const start = Math.min(prevCol, newCol);
            const end = Math.max(prevCol, newCol);
            for (let i = start + 1; i < end; i++) {
              if (board[prevRow][i]) return false;
            }
          } else if (colDiff === 0) {
            const start = Math.min(prevRow, newRow);
            const end = Math.max(prevRow, newRow);
            for (let i = start + 1; i < end; i++) {
              if (board[i][prevCol]) return false;
            }
          }
          return true;
        }
        break;
      case 'n':
      case 'N':
        if (
          (Math.abs(rowDiff) === 2 && Math.abs(colDiff) === 1) ||
          (Math.abs(rowDiff) === 1 && Math.abs(colDiff) === 2)
        ) {
          return true;
        }
        break;
      case 'b':
      case 'B':
        if (Math.abs(rowDiff) === Math.abs(colDiff)) {
          const rowStep = rowDiff > 0 ? -1 : 1;
          const colStep = colDiff > 0 ? -1 : 1;
          let currentRow = prevRow + rowStep;
          let currentCol = prevCol + colStep;

          while (currentRow !== newRow && currentCol !== newCol) {
            if (board[currentRow][currentCol]) return false;
            currentRow += rowStep;
            currentCol += colStep;
          }

          return true;
        }
        break;
      case 'q':
      case 'Q':
        if (
          (rowDiff === 0 || colDiff === 0) || // Rook-like movement
          (Math.abs(rowDiff) === Math.abs(colDiff)) // Bishop-like movement
        ) {
          if (rowDiff === 0) {
            const start = Math.min(prevCol, newCol);
            const end = Math.max(prevCol, newCol);
            for (let i = start + 1; i < end; i++) {
              if (board[prevRow][i]) return false;
            }
          } else if (colDiff === 0) {
            const start = Math.min(prevRow, newRow);
            const end = Math.max(prevRow, newRow);
            for (let i = start + 1; i < end; i++) {
              if (board[i][prevCol]) return false;
            }
          } else if (Math.abs(rowDiff) === Math.abs(colDiff)) {
            const rowStep = rowDiff > 0 ? -1 : 1;
            const colStep = colDiff > 0 ? -1 : 1;
            let currentRow = prevRow + rowStep;
            let currentCol = prevCol + colStep;

            while (currentRow !== newRow && currentCol !== newCol) {
              if (board[currentRow][currentCol]) return false;
              currentRow += rowStep;
              currentCol += colStep;
            }
          }

          return true;
        }
        break;
      case 'k':
      case 'K':
        if (Math.abs(rowDiff) <= 1 && Math.abs(colDiff) <= 1) {
          return true;
        }
        break;
      default:
        return false;
    }

    return false;
  }

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const context = canvas.getContext('2d');
    if (!context) return;

    context.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

    // Draw squares
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const isEvenSquare = (row + col) % 2 === 0;
        const color = isEvenSquare ? '#769656' : '#eeeed2';
        context.fillStyle = color;
        context.fillRect(col * SQUARE_SIZE, row * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);

        // Draw piece
        const piece = board[row][col];
        if (piece) {
          context.font = '36px Arial';
          context.textAlign = 'center';
          context.textBaseline = 'middle';
          context.fillStyle = 'black';
          context.fillText(piece, col * SQUARE_SIZE + SQUARE_SIZE / 2, row * SQUARE_SIZE + SQUARE_SIZE / 2);
        }
      }
    }
  }, [board]);

  return (
    <canvas
      ref={canvasRef}
      width={CANVAS_SIZE}
      height={CANVAS_SIZE}
      onClick={(e) => {
      const rect = e.currentTarget.getBoundingClientRect();
        const x = Math.floor((e.clientX - rect.left) / SQUARE_SIZE);
        const y = Math.floor((e.clientY - rect.top) / SQUARE_SIZE);
        handleSquareClick(y, x);
      }}
    />
  );
};

export default Chessboard;

