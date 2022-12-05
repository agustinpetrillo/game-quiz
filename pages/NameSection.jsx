import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Utils } from "../utils/Utils";

const NameSection = () => {
  const router = useRouter();
  const {
    totalPlayers,
    playerOne,
    setPlayerOne,
    playerTwo,
    setPlayerTwo,
    setDificulty,
  } = useContext(Utils);
  const [isSelected, setIsSelected] = useState([true, false, false]);

  const setPlayerOneLocalStorage = (value) => {
    try {
      setPlayerOne((prevState) => ({ ...prevState, name: value }));
      localStorage.setItem("namePlayerOne", value);
    } catch (err) {
      console.error(err);
    }
  };

  const setPlayerTwoLocalStorage = (value) => {
    try {
      setPlayerTwo((prevState) => ({ ...prevState, name: value }));
      localStorage.setItem("namePlayerTwo", value);
    } catch (err) {
      console.error(err);
    }
  };

  if (totalPlayers === 1) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen">
          {playerOne.name === null ? (
            <h1 className="mb-3">¡Bienvenido!</h1>
          ) : (
            <h1 className="mb-3">¡Bienvenido {playerOne.name}!</h1>
          )}
          <p className="mb-1">Ingresá tu nombre:</p>
          <input
            className="text-center border border-gray-500 rounded"
            type="text"
            placeholder="Nombre"
            onChange={(e) => setPlayerOneLocalStorage(e.target.value)}
          />
          <div className="flex flex-col">
            <h2 className="mt-8 mb-2">Dificultad:</h2>
            <div className="flex space-x-3 text-white">
              <button
                className={`px-4 py-2 bg-gray-800 ${
                  isSelected[0] ? "bg-orange-500" : null
                }`}
                onClick={() => {
                  localStorage.setItem("easy", setDificulty("easy"));
                  setIsSelected([true, false, false]);
                }}
              >
                Fácil
              </button>
              <button
                className={`px-4 py-2 bg-gray-800 ${
                  isSelected[1] ? "bg-orange-500" : null
                }`}
                onClick={() => {
                  localStorage.setItem("medium", setDificulty("medium"));
                  setIsSelected([false, true, false]);
                }}
              >
                Medio
              </button>
              <button
                className={`px-4 py-2 bg-gray-800 ${
                  isSelected[2] ? "bg-orange-500" : null
                }`}
                onClick={() => {
                  localStorage.setItem("hard", setDificulty("hard"));
                  setIsSelected([false, false, true]);
                }}
              >
                Difícil
              </button>
            </div>
          </div>
          <div className="flex space-x-5">
            <button
              className="py-2 mt-8 text-white bg-black rounded px-7"
              onClick={() => router.push("/Game")}
            >
              Jugar
            </button>
            <button
              className="py-2 mt-8 text-white bg-black rounded px-7"
              onClick={() => router.push("/")}
            >
              Atrás
            </button>
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen">
          <div className="flex justify-center space-x-20">
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg text-blue-600 mb-7">Jugador 1</h2>
              {playerOne.name === null ? (
                <h1 className="mb-3">¡Bienvenido!</h1>
              ) : (
                <h1 className="mb-3">
                  ¡Bienvenido{" "}
                  <span className="text-blue-600">{playerOne.name}</span>!
                </h1>
              )}
              <p className="mb-1">Ingresá tu nombre:</p>
              <input
                className="text-center border border-gray-500 rounded"
                type="text"
                placeholder="Nombre"
                onChange={(e) => setPlayerOneLocalStorage(e.target.value)}
              />
            </div>
            <div className="flex flex-col items-center justify-center">
              <h2 className="text-lg text-red-600 mb-7">Jugador 2</h2>
              {playerTwo.name === null ? (
                <h1 className="mb-3">¡Bienvenido!</h1>
              ) : (
                <h1 className="mb-3">
                  ¡Bienvenido{" "}
                  <span className="text-red-600">{playerTwo.name}</span>!
                </h1>
              )}
              <p className="mb-1">Ingresá tu nombre:</p>
              <input
                className="text-center border border-gray-500 rounded"
                type="text"
                placeholder="Nombre"
                onChange={(e) => setPlayerTwoLocalStorage(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-col">
            <h2 className="mt-8 mb-2">Dificultad:</h2>
            <div className="flex space-x-3 text-white">
              <button
                className={`px-4 py-2 bg-gray-800 ${
                  isSelected[0] ? "bg-orange-500" : null
                }`}
                onClick={() => {
                  localStorage.setItem("easy", setDificulty("easy"));
                  setIsSelected([true, false, false]);
                }}
              >
                Fácil
              </button>
              <button
                className={`px-4 py-2 bg-gray-800 ${
                  isSelected[1] ? "bg-orange-500" : null
                }`}
                onClick={() => {
                  localStorage.setItem("medium", setDificulty("medium"));
                  setIsSelected([false, true, false]);
                }}
              >
                Medio
              </button>
              <button
                className={`px-4 py-2 bg-gray-800 ${
                  isSelected[2] ? "bg-orange-500" : null
                }`}
                onClick={() => {
                  localStorage.setItem("hard", setDificulty("hard"));
                  setIsSelected([false, false, true]);
                }}
              >
                Difícil
              </button>
            </div>
          </div>
          <div className="flex mt-5 space-x-5">
            <button
              className="py-2 mt-8 text-white bg-black rounded px-7"
              onClick={() => router.push("/Game")}
            >
              Jugar
            </button>
            <button
              className="py-2 mt-8 text-white bg-black rounded px-7"
              onClick={() => {
                router.push("/");
              }}
            >
              Atrás
            </button>
          </div>
        </div>
      </>
    );
  }
};

export default NameSection;
