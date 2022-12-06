import { useContext, useEffect } from "react";
import { Utils } from "../utils/Utils";

const PlayerOneCounter = () => {
  const {
    playerOne,
    setPlayerOne,
    playerTwo,
    totalPlayers,
    timeDependsDificulty,
  } = useContext(Utils);

  useEffect(() => {
    const intervalPlayerOne = setInterval(() => {
      if (playerOne.timeRemaining > 0) {
        setPlayerOne((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }));
      }
      if (totalPlayers === 2)
        if (playerTwo.turn) {
          setPlayerOne((prevState) => ({
            ...prevState,
            timeRemaining: time[playerOne.nextQuestion],
          }));
        }
    }, 1000);

    const time = timeDependsDificulty();

    if (playerOne.timeRemaining === 0) {
      setPlayerOne((prevState) => ({
        ...prevState,
        nextQuestion: prevState.nextQuestion + 1,
        timeRemaining: time[playerOne.nextQuestion + 1],
      }));
    }

    return () => clearInterval(intervalPlayerOne);
  });
  return (
    <>
      <p className="ml-1">{playerOne.timeRemaining}</p>
    </>
  );
};

export default PlayerOneCounter;
