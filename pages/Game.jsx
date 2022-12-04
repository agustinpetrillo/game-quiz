import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { useContext } from "react";
import { Utils } from "../utils/Utils";
const TwoPlayers = dynamic(() => import("../components/TwoPlayers"), {
  ssr: false,
});
const OnePlayer = dynamic(() => import("../components/OnePlayer"), {
  ssr: false,
});

const MainSection = () => {
  const router = useRouter();
  const { totalPlayers } = useContext(Utils);

  if (totalPlayers === 1) {
    return <OnePlayer />;
  } else if (totalPlayers === 2) {
    return <TwoPlayers />;
  } else {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="mb-10">
          <span className="font-bold text-red-500 underline">ERROR</span> -
          CANTIDAD DE JUGADORES SUPERIOR AL PERMITIDO
        </h1>
        <button
          onClick={() => router.push("/")}
          className="p-3 text-4xl text-white bg-black rounded-lg"
        >
          Regresar al inicio
        </button>
      </div>
    );
  }
};

export default MainSection;
