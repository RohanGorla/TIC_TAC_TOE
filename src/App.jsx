import { useState } from "react";
import "./App.css";

function App() {
  const [chance, setTurn] = useState(false);
  const [game, setGame] = useState(false);
  const [winner, setWinner] = useState();
  const [selectX, setSelectX] = useState([]);
  const [selectO, setSelectO] = useState([]);

  if (game) {
  } else {
    let wins = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    wins.forEach((win) => {
      if (
        (selectX.includes(win[0]) &&
          selectX.includes(win[1]) &&
          selectX.includes(win[2])) ||
        (selectO.includes(win[0]) &&
          selectO.includes(win[1]) &&
          selectO.includes(win[2]))
      ) {
        selectX.includes(win[0]) ? setWinner("X") : setWinner("O");
        setGame(!game);
      }
    });
  }

  function setValue(index) {
    if (selectO.includes(index) || selectX.includes(index)) {
      return;
    } else {
      chance
        ? setSelectO((prev) => {
            return [...prev, index];
          })
        : setSelectX((prev) => {
            return [...prev, index];
          });
      setTurn(!chance);
    }
  }

  function reset() {
    setGame(false);
    setSelectO([]);
    setSelectX([]);
    setTurn(false);
    setWinner();
  }

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <h1 className={game ? "title" : "title nogame"}>
        {game ? `${winner} WON!` : ""}
      </h1>
      <p
        style={
          game
            ? { transition: "all 1s", opacity: "0" }
            : { transition: "all 1s" }
        }
      >
        {chance ? "Turn for O" : "Turn for X"}
      </p>
      <div
        className="container"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 100px)",
          gap: "10px",
        }}
      >
        {[...Array(9)].map((_, index) => {
          return (
            <div
              key={index}
              className="box"
              style={{
                height: "100px",
                cursor: "pointer",
              }}
              onClick={
                game
                  ? null
                  : () => {
                      setValue(index);
                    }
              }
            >
              <h1>
                {selectO.includes(index)
                  ? "O"
                  : selectX.includes(index)
                  ? "X"
                  : null}
              </h1>
            </div>
          );
        })}
      </div>
      <button
        onClick={reset}
        style={
          game
            ? { marginTop: "10px", transition: "all 0.5s" }
            : { transition: "all 0.5s", opacity: "0" }
        }
      >
        Play again!
      </button>
    </div>
  );
}

export default App;
