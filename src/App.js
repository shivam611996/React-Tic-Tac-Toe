import React from "react";
import styles from "./styles.module.css";

const Square = ({ value, onClick }) => {
  return (
    <div onClick={onClick} className={styles.square}>
      {value}
    </div>
  );
};

class Board extends React.Component {
  state = {
    squareMatrix: [["", "", ""], ["", "", ""], ["", "", ""]],
    nextPlayer: "X",
    winner: "None"
  };

  getTheWinner = () => {
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
  };

  onSquareClick = (row, column) => {
    const { squareMatrix, nextPlayer } = this.state;
    if (!squareMatrix[row][column]) {
      const newSquareMatrix = [...squareMatrix];
      const newNextPlayer = nextPlayer === "X" ? "O" : "X";

      newSquareMatrix[row][column] = nextPlayer;

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
      squareMatrix: [["", "", ""], ["", "", ""], ["", "", ""]],
      nextPlayer: "X",
      winner: "None"
    });
  };

  render() {
    const { squareMatrix, nextPlayer, winner } = this.state;

    return (
      <div className={styles.container}>
        <div>Next Player: {nextPlayer}</div>
        <div>Winner: {winner}</div>
        <button onClick={this.resetGame}>Reset Game</button>
        <div className={styles.squareGrid}>
          {squareMatrix[0].map((value, rowIndex) => (
            <div key={rowIndex} className={styles.row}>
              <Square
                value={squareMatrix[rowIndex][0]}
                onClick={() => this.onSquareClick(rowIndex, 0)}
              />
              <Square
                value={squareMatrix[rowIndex][1]}
                onClick={() => this.onSquareClick(rowIndex, 1)}
              />
              <Square
                value={squareMatrix[rowIndex][2]}
                onClick={() => this.onSquareClick(rowIndex, 2)}
              />
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
