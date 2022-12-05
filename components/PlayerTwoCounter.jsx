import { useContext, useEffect } from "react";
import { Utils } from "../utils/Utils";

const PlayerTwoCounter = () => {
  const { playerTwo, setPlayerTwo, timeDependsDificulty } = useContext(Utils);

  useEffect(() => {
    const intervalPlayerTwo = setInterval(() => {
      if (playerTwo.timeRemaining > 0) {
        setPlayerTwo((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }));
      }
    }, 1000);

    const time = timeDependsDificulty();

    if (
      playerTwo.timeRemaining === 0 &&
      playerTwo.nextQuestion <= Questions.length
    ) {
      setPlayerTwo((prevState) => ({
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
