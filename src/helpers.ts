import { IPokemon } from "./models/IPokemon";
import { MemoryCard } from "./models/MemoryCard";
import confetti from "canvas-confetti";

export const generateUrls = () => {
  let urls: string[] = [];
  let ids: number[] = [];

  for (let i = 0; i < 8; i++) {
      let randomId = Math.floor(Math.random() * 150) + 1;

      while (ids.includes(randomId)) {
        randomId = Math.floor(Math.random() * 150) + 1;
      }

      ids.push(randomId);

      const url = `https://pokeapi.co/api/v2/pokemon/${randomId}`;

      urls.push(url);
  };

  return urls;
};

export const convertDataToMemoryCardClass = (list: IPokemon[]) => {
  const card = list?.map((l) => new MemoryCard(
        crypto.randomUUID(),
        l.species.name,
        l.sprites.other["official-artwork"]["front_default"],
        false,
        false
      )
  );

  return card;
};

export const saveToLocalStorage = (highScore: number) => {
  localStorage.setItem("highScore", highScore.toString());
};

export const getFromLocalStorage = () => {
  const foundValue = localStorage.getItem("highScore");

  if (foundValue) {
    const highScore = +foundValue;

    return highScore;
  };

  return 0;
};

export const throwConfetti = () => {
  confetti({
    particleCount: 125,
    spread: 100,
    origin: { y: 0.6 },
    flat: true,
    shapes: ["square"],
    scalar: 0.8,
    zIndex: 100000,
    colors: ["#ffe100", "#1276e8", "#89ef5d", "#a206d1"]
  });
};
