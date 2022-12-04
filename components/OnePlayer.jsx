import { useContext, useEffect } from "react";
import { Utils } from "../utils/Utils";
import Questions from "../questions";
import { useRouter } from "next/router";

const OnePlayer = () => {
  const router = useRouter();
  const {
    playerOneName,
    playerOnePoints,
    setPlayerOnePoints,
    playerOneNextQuestion,
    setPlayerOneNextQuestion,
    setPlayerOneTimeRemaining,
    playerOneTimeRemaining,
    playerOneGameOver,
    setPlayerOneGameOver,
    playerOneDisabled,
    setPlayerOneDisabled,
    dificulty,
  } = useContext(Utils);

  useEffect(() => {
    document.title = `${playerOneName} - Preguntas y respuestas`;

    const intervalOnePlayer = setInterval(() => {
      if (playerOneTimeRemaining > 0) {
        setPlayerOneTimeRemaining((prev) => prev - 1);
      }
    }, 1000);

    const time = timeDependsDificulty();

    if (playerOneTimeRemaining === 0) {
      setPlayerOneNextQuestion((prev) => prev + 1);
      setPlayerOneTimeRemaining(time[playerOneNextQuestion + 1]);
    }
    if (
      playerOneTimeRemaining === 0 &&
      playerOneNextQuestion >= Questions.length
    ) {
      setPlayerOneGameOver(true);
    }

    return () => clearInterval(intervalOnePlayer);
  });

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

  const randomQuestion = () => {
    const arrayUserQuestionResponse = [];
    const actualQuestion = Questions.map((question) => question.id);
    const randomQuestion =
      actualQuestion[Math.floor(Math.random() * actualQuestion.length)];
    actualQuestion.slice(randomQuestion, randomQuestion + 1);
    arrayUserQuestionResponse.push(randomQuestion);
    // console.log(arrayUserQuestionResponse);
    // return arrayUserQuestionResponse[playerOneNextQuestion];
    console.log(arrayUserQuestionResponse);
    return randomQuestion;
  };

  const handlePlayerOneGameOver = () => {
    setTimeout(() => {
      setPlayerOneGameOver(false);
    }, 100);
  };

  const resetTime = () => {
    const time = timeDependsDificulty();
    setTimeout(() => {
      setPlayerOneTimeRemaining(time[playerOneNextQuestion]);
    }, 100);
  };

  const resetQuestions = () => {
    setTimeout(() => {
      setPlayerOneNextQuestion(0);
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
    }, 500);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-10 text-center">
        <div className="max-w-lg">
          <h1 className="mb-20">Jugador: {playerOneName}</h1>
          {Questions.slice(
            playerOneNextQuestion,
            playerOneNextQuestion + 1
          ).map((question) => (
            <div key={question.id}>
              <p>
                Pregunta nº{question.id + 1} de {Questions.length}
              </p>
              <h2 className="mb-3 text-2xl">{question.question}</h2>
              <div className="flex flex-col space-y-2">
                {Questions[playerOneNextQuestion].answers.map((question, i) => (
                  <div key={i}>
                    {!playerOneGameOver ? (
                      <button
                        disabled={playerOneDisabled}
                        className="w-full py-2 text-white bg-black border rounded"
                        onClick={(e) =>
                          handlePlayerOneCorrectAnswer(e, question.isCorrect)
                        }
                      >
                        {question.answer}
                      </button>
                    ) : null}
                  </div>
                ))}
                <div>
                  {playerOneTimeRemaining <= 5 ? (
                    <p>
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
              <h2 className="mt-5 text-2xl">Puntos: {playerOnePoints}</h2>
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
                  setPlayerOnePoints(0);
                  resetQuestions();
                  resetTime();
                }}
              >
                Volver a jugar
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default OnePlayer;
