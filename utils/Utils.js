import { createContext, useState } from "react";
import Questions from "../questions";

export const Utils = createContext();

const localStoragePlayerOneName = () => {
  if (typeof window !== "undefined")
    return localStorage.getItem("namePlayerOne");
};

const localStoragePlayerTwoName = () => {
  if (typeof window !== "undefined")
    return localStorage.getItem("namePlayerTwo");
};

const randomQuestion = () => {
  return Questions.map((question) => question.id).sort(
    () => Math.random() - 0.5
  );
};

const initialTime = (dificulty) => {
  if (dificulty === "easy") {
    return Questions.map((question) => question.easy_mode_time_response[0]);
  } else if (dificulty === "medium") {
    return Questions.map((question) => question.medium_mode_time_response[0]);
  } else {
    return Questions.map((question) => question.hard_mode_time_response[0]);
  }
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
  const timeDependsDificulty = () => {
    if (dificulty === "easy") {
      return Questions.map((question) => question.easy_mode_time_response);
    } else if (dificulty === "medium") {
      return Questions.map((question) => question.medium_mode_time_response);
    } else {
      return Questions.map((question) => question.hard_mode_time_response);
    }
  };
  const [totalPlayers, setTotalPlayers] = useState(null);
  const [dificulty, setDificulty] = useState(whatDificulty());
  const [playerOne, setPlayerOne] = useState({
    name: localStoragePlayerOneName(),
    points: 0,
    nextQuestion: 0,
    timeRemaining: initialTime(dificulty),
    disabled: false,
    gameOver: false,
    turn: true,
  });
  const [playerTwo, setPlayerTwo] = useState({
    name: localStoragePlayerTwoName(),
    points: 0,
    nextQuestion: 0,
    timeRemaining: initialTime(dificulty),
    disabled: true,
    gameOver: false,
    turn: false,
  });
  const values = {
    totalPlayers,
    setTotalPlayers,
    dificulty,
    setDificulty,
    playerOne,
    setPlayerOne,
    playerTwo,
    setPlayerTwo,
    timeDependsDificulty,
    randomQuestion,
  };
  return <Utils.Provider value={values}>{children}</Utils.Provider>;
};
