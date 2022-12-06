import { useRouter } from "next/router";
import { useContext } from "react";
import { Utils } from "../utils/Utils";

const HowManyPlayers = () => {
  const { setTotalPlayers } = useContext(Utils);
  const router = useRouter();

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen dark:bg-[#241e4e]">
        <h1>Bienvenido/s a preguntas y respuestas de Agustin Petrillo</h1>
        <p className="mt-5">Cantidad de jugadores:</p>
        <div className="flex mt-10 space-x-20">
          <button
            className="px-10 py-2 bg-black text-white dark:bg-[#5D1027] rounded border hover:border-[#5D1027] transition-all duration-100"
            onClick={() => {
              localStorage.setItem("onePlayer", setTotalPlayers(1));
              router.push("/NameSection");
            }}
          >
            1
          </button>
          <button
            className="px-10 py-2 bg-black text-white dark:bg-[#5D1027] rounded border hover:border-[#5D1027] transition-all duration-100"
            onClick={() => {
              localStorage.setItem("twoPlayers", setTotalPlayers(2));
              router.push("/NameSection");
            }}
          >
            2
          </button>
        </div>
      </div>
    </>
  );
};

export default HowManyPlayers;
