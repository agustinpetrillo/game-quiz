import { useContext, useEffect } from "react";
import { Utils } from "../utils/Utils";
import Questions from "../questions";
import { Players } from "../types";

const PlayerTwoCounter = () => {
  const { playerTwo, setPlayerTwo, playerOne, timeDependsDificulty } =
    useContext(Utils);

  useEffect(() => {
    const intervalPlayerTwo = setInterval(() => {
      if (playerTwo.timeRemaining > 0) {
        setPlayerTwo((prevState: Players) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }));
      }
      if (playerOne.turn)
        setPlayerTwo((prevState: Players) => ({
          ...prevState,
          timeRemaining: time[playerTwo.nextQuestion],
        }));
    }, 1000);

    const time = timeDependsDificulty();

    if (
      playerTwo.timeRemaining === 0 &&
      playerTwo.nextQuestion <= Questions.length
    ) {
      setPlayerTwo((prevState: Players) => ({
        ...prevState,
        nextQuestion: prevState.nextQuestion + 1,
        timeRemaining: time[playerTwo.nextQuestion + 1],
        turn: !playerTwo.turn,
        disabled: true,
      }));
    }

    return () => clearInterval(intervalPlayerTwo);
  });
  return (
    <>
      <p className="ml-1">{playerTwo.timeRemaining}</p>
    </>
  );
};

export default PlayerTwoCounter;
