import React from "react";
import styles from "./styles.module.css";

const Square = ({ value, onClick }) => {
  return (
    <div role="button" onClick={onClick} className={styles.square}>
      {value}
    </div>
  );
};

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squareMatrix: [Array(3).fill(""), Array(3).fill(""), Array(3).fill("")],
      nextPlayer: "X",
      winner: "None"
    };

    this.movesCount = 0;
  }

  getTheWinner = () => {
    if (this.movesCount > 4) {
      const { squareMatrix, winner: stateWinner } = this.state;

      const sqSize = squareMatrix.length;
      let winner = stateWinner || "None";

      if (winner === "None")
        for (let r = 0; r < sqSize; r++) {
          // row wise
          if (
            squareMatrix[r][0] &&
            squareMatrix[r][0] === squareMatrix[r][1] &&
            squareMatrix[r][1] === squareMatrix[r][2]
          ) {
            winner = squareMatrix[r][0];
            break;
          }

          // column wise
          if (
            squareMatrix[0][r] &&
            squareMatrix[0][r] === squareMatrix[1][r] &&
            squareMatrix[1][r] === squareMatrix[2][r]
          ) {
            winner = squareMatrix[0][r];
            break;
          }
        }

      // daigonal wise
      if (winner === "None")
        if (
          squareMatrix[0][0] &&
          squareMatrix[0][0] === squareMatrix[1][1] &&
          squareMatrix[0][0] === squareMatrix[1][1]
        ) {
          winner = squareMatrix[0][0];
        } else if (
          squareMatrix[0][2] &&
          squareMatrix[0][2] === squareMatrix[1][1] &&
          squareMatrix[1][1] === squareMatrix[2][0]
        ) {
          winner = squareMatrix[0][2];
        }

      this.setState({
        winner
      });
    }
  };

  onSquareClick = (row, column) => {
    const { squareMatrix, nextPlayer } = this.state;
    if (!squareMatrix[row][column]) {
      const newSquareMatrix = [...squareMatrix];
      const newNextPlayer = nextPlayer === "X" ? "O" : "X";

      newSquareMatrix[row][column] = nextPlayer;
      this.movesCount++;
      this.setState(
        {
          squareMatrix: newSquareMatrix,
          nextPlayer: newNextPlayer
        },
        () => this.getTheWinner()
      );
    }
  };

  resetGame = () => {
    this.setState({
      squareMatrix: [Array(3).fill(""), Array(3).fill(""), Array(3).fill("")],
      nextPlayer: "X",
      winner: "None"
    });
    this.movesCount = 0;
  };

  render() {
    const { squareMatrix, nextPlayer, winner } = this.state;

    return (
      <div className={styles.container}>
        <div>Next Player: {nextPlayer}</div>
        <div>Winner: {winner}</div>
        <button onClick={this.resetGame}>Reset Game</button>
        <div className={styles.squareGrid}>
          {squareMatrix.map((value, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              {squareMatrix.map((value, columnIndex) => (
                <Square
                  key={columnIndex}
                  value={squareMatrix[rowIndex][columnIndex]}
                  onClick={() => this.onSquareClick(rowIndex, columnIndex)}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

const App = () => {
  return (
    <div className={styles.app}>
      <h1>Welcome to Tic Tac Toe!</h1>
      <Board />
    </div>
  );
};

export default App;
