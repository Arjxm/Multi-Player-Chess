import React, { useEffect, useRef, useState } from 'react';

const ChessBoard = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [piece, setPiece] = useState(
 [
          'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
          'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
          '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '',
          'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
          'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
        ]

          )

  useEffect(() => {
    const canvas = canvasRef.current;
    const squareSize = 122;
    const boardSize = 8;

    if (canvas) {
      const ctx = canvas.getContext("2d");

      canvas.width = squareSize * boardSize;
      canvas.height = squareSize * boardSize;
      if (ctx) {
        // Draw chessboard squares
        for (let row = 0; row < boardSize; row++) {
          for (let col = 0; col < boardSize; col++) {
            const x = row * squareSize;
            const y = col * squareSize;

            if ((row + col) % 2 === 0) {
              ctx.fillStyle = "black";
            } else {
              ctx.fillStyle = "white";
            }

            ctx.fillRect(x, y, squareSize, squareSize);
          }
        }

        // Draw chess pieces
        const pieces = [
          'r', 'n', 'b', 'q', 'k', 'b', 'n', 'r',
          'p', 'p', 'p', 'p', 'p', 'p', 'p', 'p',
          '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '',
          '', '', '', '', '', '', '', '',
          'P', 'P', 'P', 'P', 'P', 'P', 'P', 'P',
          'R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'
        ];

        const pieceSize = squareSize - 20;

        for (let row = 0; row < boardSize; row++) {
          for (let col = 0; col < boardSize; col++) {
            const piece = pieces[row * boardSize + col];

            if (piece !== '') {
              const x = col * squareSize + (squareSize - pieceSize) / 2;
              const y = row * squareSize + (squareSize - pieceSize) / 2;

              ctx.font = `${pieceSize}px Arial`;
              ctx.textAlign = 'center';
              ctx.textBaseline = 'middle';
              ctx.fillStyle = 'black';
              ctx.fillText(piece, x, y);
            }
          }
        }
      }
    }
  }, []);

  const handlePieceMove = (fromRow: number, fromCol: number, toRow: number, toCol: number) => {
    // Implement move validation logic here
    // ...
    console.log(`Moving piece from (${fromRow}, ${fromCol}) to (${toRow}, ${toCol})`);
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    const rect = canvas?.getBoundingClientRect();

    if (canvas && rect) {
      const squareSize = rect.width / 8;
      const clickX = event.clientX - rect.left;
      const clickY = event.clientY - rect.top;
      const fromCol = Math.floor(clickX / squareSize);
      const fromRow = Math.floor(clickY / squareSize);

      // Implement your own logic to determine the destination square (toRow, toCol) based on the click coordinates
      let toRow:any; 
      let toCol:any;
      handlePieceMove(fromRow, fromCol, toRow, toCol);
    }
  };

  return (<> <canvas ref={canvasRef} onClick={handleClick} /> </>); 

  }

  export default ChessBoard;
