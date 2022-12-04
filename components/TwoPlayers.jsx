import { useContext, useEffect } from "react";
import { Utils } from "../utils/Utils";
import Questions from "../questions";
import { useRouter } from "next/router";

const TwoPlayers = () => {
  const router = useRouter();
  const {
    playerOneName,
    playerTwoName,
    playerOnePoints,
    setPlayerOnePoints,
    playerTwoPoints,
    setPlayerTwoPoints,
    playerOneNextQuestion,
    setPlayerOneNextQuestion,
    playerTwoNextQuestion,
    setPlayerTwoNextQuestion,
    playerOneTimeRemaining,
    setPlayerOneTimeRemaining,
    playerTwoTimeRemaining,
    setPlayerTwoTimeRemaining,
    playerOneGameOver,
    setPlayerOneGameOver,
    playerTwoGameOver,
    setPlayerTwoGameOver,
    setPlayerOneDisabled,
    setPlayerTwoDisabled,
    turnToPlayerOne,
    setTurnToPlayerOne,
    turnToPlayerTwo,
    setTurnToPlayerTwo,
    dificulty,
  } = useContext(Utils);

  useEffect(() => {
    document.title = `${playerOneName} / ${playerTwoName} - Preguntas y respuestas`;

    const intervalAllPlayers = setInterval(() => {
      if (playerOneTimeRemaining > 0) {
        setPlayerOneTimeRemaining((prev) => prev - 1);
      }
      if (playerTwoTimeRemaining > 0) {
        setPlayerTwoTimeRemaining((prev) => prev - 1);
      }
    }, 1000);

    const time = timeDependsDificulty();

    if (playerOneTimeRemaining === 0) {
      setPlayerOneNextQuestion((prev) => prev + 1);
      setPlayerOneTimeRemaining(time[playerOneNextQuestion + 1]);
      setTurnToPlayerOne(!turnToPlayerOne);
      setTurnToPlayerTwo(!turnToPlayerTwo);
    }
    if (playerTwoTimeRemaining === 0) {
      setPlayerTwoNextQuestion((prev) => prev + 1);
      setPlayerTwoTimeRemaining(time[playerTwoNextQuestion + 1]);
      setTurnToPlayerOne(!turnToPlayerOne);
      setTurnToPlayerTwo(!turnToPlayerTwo);
    }
    if (
      playerOneTimeRemaining === 0 &&
      playerOneNextQuestion >= Questions.length
    ) {
      setPlayerOneGameOver(true);
    }
    if (
      playerTwoTimeRemaining === 0 &&
      playerTwoNextQuestion >= Questions.length
    ) {
      setPlayerTwoGameOver(true);
    }

    return () => clearInterval(intervalAllPlayers);
  });

  const handlePlayersGameOver = () => {
    setTimeout(() => {
      setPlayerOneGameOver(false);
      setPlayerTwoGameOver(false);
    }, 100);
  };

  const timeDependsDificulty = () => {
    const time = 0;
    if (dificulty === "easy") {
      time = Questions.map((question) => question.easy_mode_time_response);
    } else if (dificulty === "medium") {
      time = Questions.map((question) => question.medium_mode_time_response);
    } else {
      time = Questions.map((question) => question.hard_mode_time_response);
    }
    return time;
  };

  const resetTime = () => {
    const time = timeDependsDificulty();
    setTimeout(() => {
      if (playerTwoGameOver || playerOneGameOver) {
        setPlayerOneTimeRemaining(time[playerOneNextQuestion]);
        setPlayerTwoTimeRemaining(time[playerOneNextQuestion]);
      }
    }, 100);
  };

  const resetQuestions = () => {
    setTimeout(() => {
      setPlayerOneNextQuestion(0);
      setPlayerTwoNextQuestion(0);
    }, 100);
  };

  const handlePlayerOneCorrectAnswer = (e, isCorrect) => {
    setPlayerOneDisabled(true);
    const correctPoints = Questions.map((question) => question.points_correct);
    const time = timeDependsDificulty();
    e.target.classList.add(isCorrect ? "!bg-green-500" : "!bg-red-500");
    if (isCorrect)
      setPlayerOnePoints((prev) => prev + correctPoints[playerOneNextQuestion]);
    setTimeout(() => {
      setPlayerOneNextQuestion((prev) => prev + 1);
      setPlayerOneTimeRemaining(time[playerOneNextQuestion]);
      setPlayerOneDisabled(false);
      setTurnToPlayerTwo(!turnToPlayerTwo);
      setTurnToPlayerOne(!turnToPlayerOne);
    }, 500);
  };

  const handlePlayerTwoCorrectAnswer = (e, isCorrect) => {
    setPlayerTwoDisabled(true);
    const correctPoints = Questions.map((question) => question.points_correct);
    const time = timeDependsDificulty();
    e.target.classList.add(isCorrect ? "!bg-green-500" : "!bg-red-500");
    if (isCorrect)
      setPlayerTwoPoints((prev) => prev + correctPoints[playerTwoNextQuestion]);
    setTimeout(() => {
      setPlayerTwoNextQuestion((prev) => prev + 1);
      setPlayerTwoTimeRemaining(time[playerTwoNextQuestion]);
      setPlayerTwoDisabled(false);
      setTurnToPlayerOne(!turnToPlayerOne);
      setTurnToPlayerTwo(!turnToPlayerTwo);
    }, 500);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-10 text-center">
        <div className="flex items-center justify-between space-x-14">
          <div className="flex flex-col max-w-sm">
            <h1 className="mb-20">
              Jugador: <span className="text-red-600">{playerOneName}</span>
            </h1>
            {Questions.slice(
              playerOneNextQuestion,
              playerOneNextQuestion + 1
            ).map((question) => (
              <div
                key={question.id}
                className={!turnToPlayerOne ? `blur-md` : null}
              >
                <p>
                  Pregunta nº{question.id + 1} de {Questions.length}
                </p>
                <h2 className="mb-3 text-2xl">{question.question}</h2>
                <div className="flex flex-col space-y-2">
                  {Questions[playerOneNextQuestion].answers.map(
                    (question, i) => (
                      <div key={i}>
                        {!playerOneGameOver ? (
                          <button
                            disabled={!turnToPlayerOne}
                            className="w-full py-2 text-white bg-black border rounded"
                            onClick={(e) =>
                              handlePlayerOneCorrectAnswer(
                                e,
                                question.isCorrect
                              )
                            }
                          >
                            {question.answer}
                          </button>
                        ) : null}
                      </div>
                    )
                  )}
                  <h2 className="text-lg">Puntos: {playerOnePoints}</h2>
                  <div>
                    {playerOneTimeRemaining <= 5 ? (
                      <p className="ml-2">
                        Tiempo restante:
                        <span className="ml-1 text-base text-red-600">
                          {playerOneTimeRemaining}
                        </span>
                      </p>
                    ) : (
                      <p>Tiempo restante: {playerOneTimeRemaining}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {playerOneNextQuestion >= Questions.length ? (
              <div>
                <h1>Juego finalizado.</h1>
                <p className="mb-6">Puntos conseguidos: {playerOnePoints}</p>
                <button
                  className="w-full py-2 text-white bg-black border rounded"
                  onClick={() => {
                    router.push("/NameSection");
                    resetQuestions();
                    resetTime();
                    setPlayerOnePoints(0);
                    setPlayerTwoPoints(0);
                  }}
                >
                  Volver a jugar
                </button>
              </div>
            ) : null}
          </div>
          <div className="flex flex-col max-w-sm">
            <h1 className="mb-20">
              Jugador: <span className="text-blue-600">{playerTwoName}</span>
            </h1>
            {Questions.slice(
              playerTwoNextQuestion,
              playerTwoNextQuestion + 1
            ).map((question) => (
              <div
                key={question.id}
                className={!turnToPlayerTwo ? `blur-md` : null}
              >
                <p>
                  Pregunta nº{question.id + 1} de {Questions.length}
                </p>
                <h2 className="mb-3 text-2xl">{question.question}</h2>
                <div className="flex flex-col space-y-2">
                  {Questions[playerTwoNextQuestion].answers.map(
                    (question, i) => (
                      <div key={i}>
                        {!playerTwoGameOver ? (
                          <button
                            disabled={!turnToPlayerTwo}
                            className="w-full py-2 text-white bg-black border rounded"
                            onClick={(e) =>
                              handlePlayerTwoCorrectAnswer(
                                e,
                                question.isCorrect
                              )
                            }
                          >
                            {question.answer}
                          </button>
                        ) : null}
                      </div>
                    )
                  )}
                  <h2 className="text-lg">Puntos: {playerTwoPoints}</h2>
                  <div>
                    {playerTwoTimeRemaining <= 5 ? (
                      <p>
                        Tiempo restante:
                        <span className="ml-1 text-base text-red-600">
                          {playerTwoTimeRemaining}
                        </span>
                      </p>
                    ) : (
                      <p>Tiempo restante: {playerTwoTimeRemaining}</p>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {playerTwoNextQuestion >= Questions.length ? (
              <div>
                <h1>Juego finalizado.</h1>
                <p className="mb-6">Puntos conseguidos: {playerTwoPoints}</p>
                <button
                  className="w-full py-2 text-white bg-black border rounded"
                  onClick={() => {
                    router.push("/NameSection");
                    resetQuestions();
                    resetTime();
                    setPlayerTwoPoints(0);
                    setPlayerOnePoints(0);
                  }}
                >
                  Volver a jugar
                </button>
              </div>
            ) : null}
          </div>
        </div>
        {playerOneNextQuestion && playerTwoNextQuestion >= Questions.length ? (
          <div className="p-5 mt-20 border-2 border-black rounded">
            {playerOnePoints > playerTwoPoints ? (
              <div>
                <h1>
                  ¡<span className="text-red-600">{playerOneName}</span> le ganó
                  a <span className="text-blue-600">{playerTwoName}</span> por{" "}
                  {playerOnePoints - playerTwoPoints} puntos!
                </h1>
                <h1>Total: {playerOnePoints}.</h1>
              </div>
            ) : (
              <div>
                <h1>
                  ¡<span className="text-blue-600">{playerTwoName}</span> le
                  ganó a <span className="text-red-600">{playerOneName}</span>{" "}
                  por {playerTwoPoints - playerOnePoints} puntos!
                </h1>
                <h1>Total: {playerTwoPoints}.</h1>
              </div>
            )}
          </div>
        ) : null}
      </div>
    </>
  );
};

export default TwoPlayers;
