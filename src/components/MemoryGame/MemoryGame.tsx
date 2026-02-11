import { GameDescription } from "../GameDescription/GameDescription";
import "./MemoryGame.css";
import { useFetch } from "../../hooks/useFetch";
import { IPokemon } from "../../models/IPokemon";
import { convertDataToMemoryCardClass, generateUrls, getFromLocalStorage, saveToLocalStorage, throwConfetti } from "../../helpers";
import { ShowCards } from "../ShowCards/ShowCards";
import { MemoryCard } from "../../models/MemoryCard";
import { useState } from "react";
import { Score } from "../Score/Score";
import { PuffLoader } from "react-spinners";

export const MemoryGame = () => {
  const [loading, pokemons] = useFetch<IPokemon>(generateUrls());
  const [memoryCards, setMemoryCards] = useState<MemoryCard[]>([]);
  const [clickedCards, setClickedCard] = useState<MemoryCard[]>([]);
  const [isDelayed, setIsDelayed] = useState<boolean>(false);
  const [tries, setTries] = useState<number>(0);
  const [highScore, setHighScore] = useState<number>(getFromLocalStorage());
  const [highScoreBanner, setHighScoreBanner] = useState<boolean>(false);

  if (pokemons && memoryCards.length === 0) {
    const duplicated = [...pokemons, ...pokemons];
    const cards = convertDataToMemoryCardClass(duplicated);
    const shuffledCards = cards.sort(() => Math.random() - 0.5);

    setMemoryCards(shuffledCards);
  }

  const turnCard = (id: string) => {
    if (isDelayed) return;

    let newClickedCards = [...clickedCards];

    const updatedCards = memoryCards.map((m) => {
      if (m.id === id) {
        if (!m.isClicked) {
          newClickedCards = [...newClickedCards, m]; 
        } else {
          newClickedCards = newClickedCards.filter((n) => n.id !== id);
        }

        return { ...m, isClicked: !m.isClicked };
      }
      return m;
    });

    setMemoryCards(updatedCards);
    setClickedCard(newClickedCards); 

    if (newClickedCards.length === 2) {
      setTries(tries + 1);

      if (newClickedCards[0].name === newClickedCards[1].name) {
        const name = newClickedCards[0].name;

        
          const newUpdatedCards = updatedCards.map((m) => {
            if (m.name === name) {
              return { ...m, isPair: true };
            }
            return m;
          })
        

        const allCardsMatched = newUpdatedCards.every((m) => m.isPair);

        if (allCardsMatched) {
          throwConfetti();
        }

        if (allCardsMatched && (tries < highScore || highScore === 0) ) {
          const newHighScore = tries + 1;

          throwConfetti();
          setHighScoreBanner(true);
          setTimeout(() => setHighScoreBanner(false), 4000);
          setHighScore(newHighScore);
          saveToLocalStorage(newHighScore);
        }

        setMemoryCards(newUpdatedCards);
        setClickedCard([]);
      } else {
         setIsDelayed(true);

          setTimeout(() => {
          setMemoryCards(
            updatedCards.map((m) => {
              if (!m.isPair) {
                return { ...m, isClicked: false }; 
              }
              return m;
            })
          );

          setIsDelayed(false);
          setClickedCard([]);
          }, 1000)
        }
      }
   };

  return (
      <div className="game-container">
        <main>
          <div className="game-and-description-container">
          <GameDescription />
          <Score tries={tries} highScore={highScore} />
        {highScoreBanner && <div className="highscore-banner"><h1>New highscore!</h1><img src="src\assets\icons8-pixel-star-48.png" /></div>}
          {loading ? <div className="spinner"><PuffLoader /></div> :
          <section className="card-container">
            {memoryCards?.map((m) => (
              <ShowCards key={m.id} card={m} turnCard={turnCard} />
            ))}
          </section>}
          </div>
        </main>
      </div>
  );
};
