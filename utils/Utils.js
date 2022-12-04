import { createContext, useState } from "react";
import Questions from "../questions";

export const Utils = createContext();

const localStoragePlayerOne = () => {
  if (typeof window !== "undefined")
    return localStorage.getItem("namePlayerOne");
};

const localStoragePlayerTwo = () => {
  if (typeof window !== "undefined")
    return localStorage.getItem("namePlayerTwo");
};

const initialTime = (dificulty) => {
  let time = 0;
  if (dificulty === "easy") {
    time = Questions.map((question) => question.easy_mode_time_response);
  } else if (dificulty === "medium") {
    time = Questions.map((question) => question.medium_mode_time_response);
  } else {
    time = Questions.map((question) => question.hard_mode_time_response);
  }
  return time[0];
};

export const UtilsProvider = ({ children }) => {
  const whatDificulty = () => {
    if (typeof window !== "undefined") {
      if (dificulty === "easy") {
        return localStorage.getItem("easy");
      } else if (dificulty === "medium") {
        return localStorage.getItem("medium");
      } else {
        return localStorage.getItem("hard");
      }
    }
  };
  const [totalPlayers, setTotalPlayers] = useState(null);
  const [dificulty, setDificulty] = useState(whatDificulty());
  const [playerOneName, setPlayerOneName] = useState(localStoragePlayerOne());
  const [playerTwoName, setPlayerTwoName] = useState(localStoragePlayerTwo());
  const [playerOnePoints, setPlayerOnePoints] = useState(0);
  const [playerTwoPoints, setPlayerTwoPoints] = useState(0);
  const [playerOneNextQuestion, setPlayerOneNextQuestion] = useState(0);
  const [playerTwoNextQuestion, setPlayerTwoNextQuestion] = useState(0);
  const [playerOneTimeRemaining, setPlayerOneTimeRemaining] = useState(
    initialTime(dificulty)
  );
  const [playerTwoTimeRemaining, setPlayerTwoTimeRemaining] = useState(
    initialTime(dificulty)
  );
  const [playerOneGameOver, setPlayerOneGameOver] = useState(false);
  const [playerTwoGameOver, setPlayerTwoGameOver] = useState(false);
  const [playerOneDisabled, setPlayerOneDisabled] = useState(false);
  const [playerTwoDisabled, setPlayerTwoDisabled] = useState(false);
  const [turnToPlayerOne, setTurnToPlayerOne] = useState(true);
  const [turnToPlayerTwo, setTurnToPlayerTwo] = useState(false);
  const values = {
    totalPlayers,
    setTotalPlayers,
    dificulty,
    setDificulty,
    playerOneName,
    setPlayerOneName,
    playerTwoName,
    setPlayerTwoName,
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
    playerOneDisabled,
    setPlayerOneDisabled,
    playerTwoDisabled,
    setPlayerTwoDisabled,
    turnToPlayerOne,
    setTurnToPlayerOne,
    turnToPlayerTwo,
    setTurnToPlayerTwo,
  };
  return <Utils.Provider value={values}>{children}</Utils.Provider>;
};
