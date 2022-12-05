import { useContext, useEffect } from "react";
import { Utils } from "../utils/Utils";
import Questions from "../questions";
import { useRouter } from "next/router";

const TwoPlayers = () => {
  const router = useRouter();
  const {
    playerOne,
    setPlayerOne,
    playerTwo,
    setPlayerTwo,
    timeDependsDificulty,
  } = useContext(Utils);

  useEffect(() => {
    document.title = `${playerOne.name} / ${playerTwo.name} - Preguntas y respuestas`;

    const intervalAllPlayers = setInterval(() => {
      if (playerOne.timeRemaining > 0) {
        setPlayerOne((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }));
      }
      if (playerTwo.timeRemaining > 0) {
        setPlayerTwo((prevState) => ({
          ...prevState,
          timeRemaining: prevState.timeRemaining - 1,
        }));
      }
    }, 1000);

    const time = timeDependsDificulty();

    if (
      playerOne.timeRemaining === 0 &&
      playerOne.nextQuestion <= Questions.length
    ) {
      setPlayerOne((prevState) => ({
        ...prevState,
        nextQuestion: prevState.nextQuestion + 1,
        timeRemaining: time[playerOne.nextQuestion + 1],
        turn: !playerOne.turn,
        disabled: true,
      }));
      setPlayerTwo((prevState) => ({
        ...prevState,
        turn: !playerTwo.turn,
        disabled: false,
      }));
    }
    if (
      playerTwo.timeRemaining === 0 &&
      playerOne.nextQuestion <= Questions.length
    ) {
      setPlayerTwo((prevState) => ({
        ...prevState,
        nextQuestion: prevState.nextQuestion + 1,
        timeRemaining: time[playerTwo.nextQuestion + 1],
        turn: !playerTwo.turn,
        disabled: true,
      }));
      setPlayerOne((prevState) => ({
        ...prevState,
        turn: !playerOne.turn,
        disabled: false,
      }));
    }

    // if (
    //   playerOne.timeRemaining === 0 &&
    //   playerOne.nextQuestion >= Questions.length
    // )
    //   setPlayerOne((prevState) => ({ ...prevState, gameOver: true }));

    // if (
    //   playerTwo.timeRemaining === 0 &&
    //   playerTwo.nextQuestion >= Questions.length
    // )
    //   setPlayerTwo((prevState) => ({ ...prevState, gameOver: true }));

    return () => clearInterval(intervalAllPlayers);
  });

  const resetGame = () => {
    const time = timeDependsDificulty();
    setTimeout(() => {
      // if (playerTwo.gameOver || playerOne.gameOver) {
      if (!playerTwo.gameOver || !playerOne.gameOver) {
        setPlayerOne((prevState) => ({
          ...prevState,
          timeRemaining: time[playerOne.nextQuestion],
          nextQuestion: 0,
          points: 0,
        }));
        setPlayerTwo((prevState) => ({
          ...prevState,
          timeRemaining: time[playerTwo.nextQuestion],
          nextQuestion: 0,
          points: 0,
        }));
      }
    }, 100);
  };

  const handlePlayerOneCorrectAnswer = (e, isCorrect) => {
    setPlayerOne((prevState) => ({ ...prevState, disabled: true }));
    const correctPoints = Questions.map((question) => question.points_correct);
    const time = timeDependsDificulty();
    e.target.classList.add(isCorrect ? "!bg-green-500" : "!bg-red-500");
    if (isCorrect)
      setPlayerOne((prevState) => ({
        ...prevState,
        points: playerOne.points + correctPoints[playerOne.nextQuestion],
      }));
    setTimeout(() => {
      setPlayerOne((prevState) => ({
        ...prevState,
        nextQuestion: prevState.nextQuestion + 1,
        timeRemaining: time[playerOne.nextQuestion],
        turn: !playerOne.turn,
      }));
      setPlayerTwo((prevState) => ({
        ...prevState,
        turn: !playerTwo.turn,
        disabled: false,
      }));
    }, 500);
  };

  const handlePlayerTwoCorrectAnswer = (e, isCorrect) => {
    setPlayerTwo((prevState) => ({ ...prevState, disabled: true }));
    const correctPoints = Questions.map((question) => question.points_correct);
    const time = timeDependsDificulty();
    e.target.classList.add(isCorrect ? "!bg-green-500" : "!bg-red-500");
    if (isCorrect)
      setPlayerTwo((prevState) => ({
        ...prevState,
        points: playerTwo.points + correctPoints[playerTwo.nextQuestion],
      }));
    setTimeout(() => {
      setPlayerTwo((prevState) => ({
        ...prevState,
        nextQuestion: prevState.nextQuestion + 1,
        timeRemaining: time[playerTwo.nextQuestion],
        turn: !playerTwo.turn,
      }));
      setPlayerOne((prevState) => ({
        ...prevState,
        turn: !playerOne.turn,
        disabled: false,
      }));
    }, 500);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-10 text-center">
        <div className="flex items-center justify-between space-x-14">
          <div className="flex flex-col max-w-sm">
            <h1 className="mb-20">
              Jugador: <span className="text-red-600">{playerOne.name}</span>
            </h1>
            {Questions.slice(
              playerOne.nextQuestion,
              playerOne.nextQuestion + 1
            ).map((question) => (
              <div
                key={question.id}
                className={!playerOne.turn ? `blur-md` : null}
              >
                <p>
                  Pregunta nº{question.id + 1} de {Questions.length}
                </p>
                <h2 className="mb-3 text-2xl">{question.question}</h2>
                <div className="flex flex-col space-y-2">
                  {Questions[playerOne.nextQuestion].answers.map(
                    (question, i) => (
                      <div key={i}>
                        <button
                          disabled={playerOne.disabled}
                          className="w-full py-2 text-white bg-black border rounded"
                          onClick={(e) =>
                            handlePlayerOneCorrectAnswer(e, question.isCorrect)
                          }
                        >
                          {question.answer}
                        </button>
                      </div>
                    )
                  )}
                  <h2 className="text-lg">Puntos: {playerOne.points}</h2>
                  <div>
                    {playerOne.timeRemaining <= 5 ? (
                      <p className="ml-2">
                        Tiempo restante:
                        <span className="ml-1 text-base text-red-600">
                          {playerOne.timeRemaining}
                        </span>
                      </p>
                    ) : (
                      <p>Tiempo restante: {playerOne.timeRemaining}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {playerOne.nextQuestion >= Questions.length ? (
              <div>
                <h1>Juego finalizado.</h1>
                <p className="mb-6">Puntos conseguidos: {playerOne.points}</p>
                <button
                  // disabled={!playerOne.gameOver}
                  disabled={playerOne.gameOver}
                  className="w-full py-2 text-white bg-black border rounded"
                  onClick={() => {
                    router.push("/NameSection");
                    resetGame();
                  }}
                >
                  Volver a jugar
                </button>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col max-w-sm">
            <h1 className="mb-20">
              Jugador: <span className="text-blue-600">{playerTwo.name}</span>
            </h1>
            {Questions.slice(
              playerTwo.nextQuestion,
              playerTwo.nextQuestion + 1
            ).map((question) => (
              <div
                key={question.id}
                className={!playerTwo.turn ? `blur-md` : null}
              >
                <p>
                  Pregunta nº{question.id + 1} de {Questions.length}
                </p>
                <h2 className="mb-3 text-2xl">{question.question}</h2>
                <div className="flex flex-col space-y-2">
                  {Questions[playerTwo.nextQuestion].answers.map(
                    (question, i) => (
                      <div key={i}>
                        <button
                          disabled={playerTwo.disabled}
                          className="w-full py-2 text-white bg-black border rounded"
                          onClick={(e) =>
                            handlePlayerTwoCorrectAnswer(e, question.isCorrect)
                          }
                        >
                          {question.answer}
                        </button>
                      </div>
                    )
                  )}
                  <h2 className="text-lg">Puntos: {playerTwo.points}</h2>
                  <div>
                    {playerTwo.timeRemaining <= 5 ? (
                      <p>
                        Tiempo restante:
                        <span className="ml-1 text-base text-red-600">
                          {playerTwo.timeRemaining}
                        </span>
                      </p>
                    ) : (
                      <p>Tiempo restante: {playerTwo.timeRemaining}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {playerTwo.nextQuestion >= Questions.length ? (
              <div>
                <h1>Juego finalizado.</h1>
                <p className="mb-6">Puntos conseguidos: {playerTwo.points}</p>
                <button
                  // disabled={!playerTwo.gameOver}
                  disabled={playerTwo.gameOver}
                  className="w-full py-2 text-white bg-black border rounded"
                  onClick={() => {
                    router.push("/NameSection");
                    resetGame();
                  }}
                >
                  Volver a jugar
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {playerOne.nextQuestion &&
        playerTwo.nextQuestion >= Questions.length ? (
          <div className="p-5 mt-20 border-2 border-black rounded">
            {playerOne.points > playerTwo.points ? (
              <div>
                <h1>
                  ¡<span className="text-red-600">{playerOne.name}</span> le
                  ganó a <span className="text-blue-600">{playerTwo.name}</span>{" "}
                  por {playerOne.points - playerTwo.points} puntos!
                </h1>
                <h1>Total: {playerOne.points}.</h1>
              </div>
            ) : (
              <div>
                <h1>
                  ¡<span className="text-blue-600">{playerTwo.name}</span> le
                  ganó a <span className="text-red-600">{playerOne.name}</span>{" "}
                  por {playerTwo.points - playerOne.points} puntos!
                </h1>
                <h1>Total: {playerTwo.points}.</h1>
              </div>
            )}
            {playerOne.points === playerTwo.points ? (
              <div>
                <h1>¡EMPATE!</h1>
              </div>
            ) : null}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TwoPlayers;
