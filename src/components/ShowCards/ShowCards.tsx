

import { MemoryCard } from "../../models/MemoryCard";
import "./ShowCards.css";

type ShowCardsProps = {
    card: MemoryCard;
    turnCard: (id: string) => void;
}

export const ShowCards = (props: ShowCardsProps) => {

    const handleClick = () => {
        props.turnCard(props.card.id);
    }

    return <div className={props.card.isClicked ? `card-front ${props.card.isPair ? ' match' : ''}` : 'card-front hide-img'} onClick={handleClick}>
        <div className="img-container"><img src={props.card.imgUrl} alt={props.card.name} /></div>
    </div>
}