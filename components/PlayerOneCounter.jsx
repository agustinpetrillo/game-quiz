import { useContext, useEffect } from "react";
import { Utils } from "../utils/Utils";

const PlayerOneCounter = () => {
  const { playerOne, setPlayerOne, timeDependsDificulty } = useContext(Utils);

  useEffect(() => {
    const intervalPlayerOne = setInterval(() => {
      if (playerOne.timeRemaining > 0) {
        setPlayerOne((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
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
