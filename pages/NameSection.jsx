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
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-[#241e4e]">
          {playerOne.name === null ? (
            <h1 className="mb-3">¡Bienvenido!</h1>
          ) : (
            <h1 className="mb-3">¡Bienvenido {playerOne.name}!</h1>
          )}
          <p className="mb-1">Ingresá tu nombre:</p>
          <input
            className="text-center border-2 dark:bg-[#5D1027] border-[#331B45] rounded-lg p-2 outline-none"
            type="text"
            placeholder="Nombre"
            onChange={(e) => setPlayerOneLocalStorage(e.target.value)}
          />
          <div className="flex flex-col">
            <h2 className="mt-8 mb-2">Dificultad:</h2>
            <div className="flex space-x-3 text-white">
              <button
                className={`px-4 py-2 dark:bg-[#5D1027] bg-black text-white ${
                  isSelected[0] && "!bg-[#CE6C47]"
                }`}
                onClick={() => {
                  localStorage.setItem("easy", setDificulty("easy"));
                  setIsSelected([true, false, false]);
                }}
              >
                Fácil
              </button>
              <button
                className={`px-4 py-2 dark:bg-[#5D1027] bg-black text-white ${
                  isSelected[1] && "!bg-[#CE6C47]"
                }`}
                onClick={() => {
                  localStorage.setItem("medium", setDificulty("medium"));
                  setIsSelected([false, true, false]);
                }}
              >
                Medio
              </button>
              <button
                className={`px-4 py-2 dark:bg-[#5D1027] bg-black text-white ${
                  isSelected[2] && "!bg-[#CE6C47]"
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
              className="py-2 mt-8 bg-black text-white dark:bg-[#5D1027] border hover:border-[#5D1027] transition-all duration-100 rounded px-7"
              onClick={() => router.push("/Game")}
            >
              Jugar
            </button>
            <button
              className="py-2 mt-8 bg-black text-white dark:bg-[#5D1027] border hover:border-[#5D1027] transition-all duration-100 rounded px-7"
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
        <div className="flex flex-col items-center justify-center min-h-screen dark:bg-[#241e4e]">
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
                className="text-center border-2 dark:bg-[#5D1027] border-[#331B45] rounded-lg p-2 outline-none"
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
                className="text-center border-2 dark:bg-[#5D1027] border-[#331B45] rounded-lg p-2 outline-none"
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
                className={`px-4 py-2 dark:bg-[#5D1027] bg-black text-white ${
                  isSelected[0] && "!bg-[#CE6C47]"
                }`}
                onClick={() => {
                  localStorage.setItem("easy", setDificulty("easy"));
                  setIsSelected([true, false, false]);
                }}
              >
                Fácil
              </button>
              <button
                className={`px-4 py-2 dark:bg-[#5D1027] bg-black text-white ${
                  isSelected[1] && "!bg-[#CE6C47]"
                }`}
                onClick={() => {
                  localStorage.setItem("medium", setDificulty("medium"));
                  setIsSelected([false, true, false]);
                }}
              >
                Medio
              </button>
              <button
                className={`px-4 py-2 dark:bg-[#5D1027] bg-black text-white ${
                  isSelected[2] && "!bg-[#CE6C47]"
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
              className="py-2 mt-8 bg-black text-white dark:bg-[#5D1027] border hover:border-[#5D1027] transition-all duration-100 rounded px-7"
              onClick={() => router.push("/Game")}
            >
              Jugar
            </button>
            <button
              className="py-2 mt-8 bg-black text-white dark:bg-[#5D1027] border hover:border-[#5D1027] transition-all duration-100 rounded px-7"
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
