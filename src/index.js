import React, {useState} from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'bootstrap/dist/css/bootstrap.css';

function Square({value, onClick}) {

    return (
        <button className="square" onClick={onClick}>
            {value}
        </button>
    );
}


function Game() {
    const [squares, setSquares] = useState(Array(9).fill(null));
    const [isXNext, setIsXNext] = useState(true);
    const winner = calculateWinner(squares);

    function renderSquare(i) {
        return <Square
            value={squares[i]}
            onClick={() => {
                if (squares[i] != null || winner != null) {
                    return;
                }
                const nextSquares = squares.slice();
                nextSquares[i] = isXNext ? "X" : "O";
                setSquares(nextSquares);

                setIsXNext(!isXNext); // toggle turns
            }}
        />;
    }

    function renderRestartButton() {
        return (
            <Restart
                onClick={() => {
                    setSquares(Array(9).fill(null));
                    setIsXNext(true);
                }}/>
        );
    }

    function getStatus() {
        if (winner) {
            return "Winner: " + winner;
        } else if (isBoardFull(squares)) {
            return "Draw!";
        } else {
            return "Next player: " + (isXNext ? "X" : "O");
        }
    }

    return (
        <div>
            <h2 className= "title">TicTacToe</h2>
            <div className="container">
                <div className="game">
                    <div className="game-board">
                        <div className="board-row">
                            <div className="row no-gutters">
                                <div className="col">
                                    {renderSquare(0)}
                                </div>
                                <div className="col">
                                    {renderSquare(1)}
                                </div>
                                <div className="col">
                                    {renderSquare(2)}
                                </div>
                            </div>
                        </div>
                        <div className="board-row">
                            <div className="row no-gutters">
                                <div className="col">
                                    {renderSquare(3)}
                                </div>
                                <div className="col">
                                    {renderSquare(4)}
                                </div>
                                <div className="col">
                                    {renderSquare(5)}
                                </div>
                            </div>
                        </div>
                        <div className="board-row">
                            <div className="row no-gutters">
                                <div className="col">
                                    {renderSquare(6)}
                                </div>
                                <div className="col">
                                    {renderSquare(7)}
                                </div>
                                <div className="col">
                                    {renderSquare(8)}
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="game-info">{getStatus()}</div>
                    <div className="restart-button">{renderRestartButton()}</div>
                </div>
            </div>
        </div>
    );
}

function Restart({onClick}) {

    return (
        <button className="restart" onClick={onClick}>
            New game
        </button>
    );
}


function isBoardFull(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (squares[i] == null) {
            return false;
        }
    }
    return true;
}

function calculateWinner(squares) {
    const possibleLines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let i = 0; i < possibleLines.length; i++) {
        const [a, b, c] = possibleLines[i];
        if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
            return squares[a];
        }
    }
    return null;


}


ReactDOM.render(<Game/>, document.getElementById("root"));
