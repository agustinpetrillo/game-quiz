import { useContext, useEffect } from "react";
import { Utils } from "../utils/Utils";
import Questions from "../questions";
import { useRouter } from "next/router";

const OnePlayer = () => {
  const router = useRouter();
  const { playerOne, setPlayerOne, dificulty } = useContext(Utils);

  useEffect(() => {
    document.title = `${playerOne.name} - Preguntas y respuestas`;

    const intervalOnePlayer = setInterval(() => {
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

  const resetGame = () => {
    const time = timeDependsDificulty();
    setTimeout(() => {
      setPlayerOne((prevState) => ({
        ...prevState,
        nextQuestion: 0,
        timeRemaining: time[playerOne.nextQuestion],
        points: 0,
      }));
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
        disabled: false,
      }));
    }, 500);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center my-10 text-center">
        <div className="max-w-lg">
          <h1 className="mb-20">Jugador: {playerOne.name}</h1>
          {Questions.slice(
            playerOne.nextQuestion,
            playerOne.nextQuestion + 1
          ).map((question) => (
            <div key={question.id}>
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
                <div>
                  {playerOne.timeRemaining <= 5 ? (
                    <p>
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
              <h2 className="mt-5 text-2xl">Puntos: {playerOne.points}</h2>
            </div>
          ))}
          {playerOne.nextQuestion >= Questions.length ? (
            <div>
              <h1>Juego finalizado.</h1>
              <p className="mb-6">Puntos conseguidos: {playerOne.points}</p>
              <button
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
    </>
  );
};

export default OnePlayer;
