import React, { useEffect } from "react";
import { useState } from "react";
import ReactDOM from "react-dom";
import "./index.css";

interface SquarePropsInterface {
    value: string;
    onClick: () => void;
}

function Square(props: SquarePropsInterface) {
    return (
        <button className="square" onClick={props.onClick}>
            {props.value}
        </button>
    );
}

type BoardPropsInterface = {
    squares: string[];
    xIsNext: boolean;
};

function Board(props: BoardPropsInterface) {
    const [squares, setSquares] = useState<string[]>(Array(9).fill(""));
    const [xIsNext, setXIsNext] = useState<boolean>(true);
    const [winner, setWinner] = useState<string>("");
    const [status, setStatus] = useState<string>("");

    const handleClick = (i: number) => {
        if (winner || squares[i]) return;
        const nWinner = calculateWinner(squares);
        if (nWinner) {
            setWinner(nWinner);
        }
        const nSquares: string[] = squares;
        nSquares[i] = xIsNext ? "X" : "O";
        setSquares(nSquares);
        setXIsNext(!xIsNext);
    };

    const renderSquare = (i: number) => {
        return <Square value={squares[i]} onClick={() => handleClick(i)} />;
    };

    useEffect(() => {
        const winner = calculateWinner(squares);
        setStatus(
            winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? "X" : "O"}`
        );
        setWinner(winner);
    }, [xIsNext]);

    return (
        <div>
            <div className="status">{status}</div>
            <div className="board-row">
                {renderSquare(0)}
                {renderSquare(1)}
                {renderSquare(2)}
            </div>
            <div className="board-row">
                {renderSquare(3)}
                {renderSquare(4)}
                {renderSquare(5)}
            </div>
            <div className="board-row">
                {renderSquare(6)}
                {renderSquare(7)}
                {renderSquare(8)}
            </div>
        </div>
    );
}

function Game() {
    return (
        <div className="game">
            <div className="game-board">
                <Board squares={Array(9).fill("")} xIsNext={true} />
            </div>
            <div className="game-info">
                <div>{/* status */}</div>
                <ol>{/* TODO */}</ol>
            </div>
        </div>
    );
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));

function calculateWinner(squares: Array<string>): string {
    const lines = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
        const [a, b, c] = lines[i];
        if (
            squares[a] &&
            squares[a] === squares[b] &&
            squares[a] === squares[c]
        ) {
            return squares[a];
        }
    }
    return "";
}
