import Card from "../Card/Card";
import cards from "../../data/cards";
import "./Board.scss"

export default function Board(props) {

    return(
      <div className="Board">
          {props.boardCards.map(row =>
              row.map(card =>
                <Card playCard={props.playCard} card={cards[card.card]} chip={card.chip} />
              )
          )}
          {props.children}
      </div>

    );
}