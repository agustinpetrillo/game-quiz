import { useContext, useEffect } from "react";
import { Utils } from "../utils/Utils";
import Questions from "../questions";
import { useRouter } from "next/router";
import PlayerOneCounter from "./PlayerOneCounter";
import { Players } from "../types";

const OnePlayer = () => {
  const router = useRouter();
  const {
    playerOne,
    setPlayerOne,
    timeDependsDificulty,
    randomQuestion,
    randomQuestionState,
    setRandomQuestionState,
  } = useContext(Utils);

  useEffect(() => {
    document.title = `${playerOne.name} - Preguntas y respuestas`;
    setRandomQuestionState(randomQuestion());
  }, []);

  const resetGame = () => {
    setTimeout(() => {
      setPlayerOne((prevState: Players) => ({
        ...prevState,
        nextQuestion: 0,
        timeRemaining: timeDependsDificulty()[playerOne.nextQuestion],
        points: 0,
      }));
    }, 100);
  };

  const handlePlayerOneCorrectAnswer = (
    e: React.MouseEvent,
    isCorrect: boolean
  ) => {
    const target = e.target as Element;
    setPlayerOne((prevState: Players) => ({ ...prevState, disabled: true }));
    const correctPoints = Questions.map((question) => question.points_correct);
    target.classList.add(isCorrect ? "!bg-green-500" : "!bg-red-500");
    if (isCorrect)
      setPlayerOne((prevState: Players) => ({
        ...prevState,
        points: playerOne.points + correctPoints[playerOne.nextQuestion],
      }));
    setTimeout(() => {
      setPlayerOne((prevState: Players) => ({
        ...prevState,
        nextQuestion: prevState.nextQuestion + 1,
        timeRemaining: timeDependsDificulty()[playerOne.nextQuestion],
        disabled: false,
      }));
    }, 500);
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen text-center dark:bg-[#241e4e]">
        <div className="max-w-lg">
          <h1 className="mb-12">Jugador: {playerOne.name}</h1>
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
                        className="w-full py-2 text-white transition-all duration-150 bg-black border rounded-lg hover:bg-gray-900"
                        onClick={(e) =>
                          handlePlayerOneCorrectAnswer(e, question.isCorrect)
                        }
                      >
                        {question.answer}
                      </button>
                    </div>
                  )
                )}
                <div className="flex justify-center">
                  {playerOne.timeRemaining <= 5 ? (
                    <p className="flex">
                      Tiempo restante:
                      <span className="text-base text-red-600">
                        <PlayerOneCounter />
                      </span>
                    </p>
                  ) : (
                    <p className="flex">
                      Tiempo restante: <PlayerOneCounter />
                    </p>
                  )}
                </div>
              </div>
              <h2 className="mt-5 text-2xl">Puntos: {playerOne.points}</h2>
            </div>
          ))}
          {playerOne.nextQuestion >= Questions.length && (
            <div>
              <h1>Juego finalizado.</h1>
              <p className="mb-6">Puntos conseguidos: {playerOne.points}</p>
              <button
                className="w-full py-2 text-white transition-all duration-150 bg-black border rounded-lg hover:bg-gray-900"
                onClick={() => {
                  router.push("/NameSection");
                  resetGame();
                }}
              >
                Volver a jugar
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default OnePlayer;
