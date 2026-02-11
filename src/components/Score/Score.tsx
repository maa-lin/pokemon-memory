
import "./Score.css";

type ScoreProps = {
  tries: number;
  highScore: number;
}

export const Score = (props: ScoreProps) => {
  return (
    <div className="score">
      <button className="btn-reset" onClick={() => window.location.reload()}>Restart game</button>
      <div className="score-container">
        <p>
          <span>High score: </span>{props.highScore}
        </p>
        <p>
          <span>Tries: </span>{props.tries}
        </p>
      </div>
    </div>
  );
};
