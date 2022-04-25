import './Card.scss';
import cards from "../../data/cards";
export default function Card(props) {
    return(
        <div key={props.card.id} onClick={ ()=>props.playCard(props.card) } className="Card">
            <div className="inner">
                <h4>{props.card.value}</h4>
                <img src={`/cardimg/${props.card.suit}.svg`} />
                {props.chip && props.chip !== 'w' && props.chip !== 'e' ?
                    <img className='chip' src={`/chip/chip-${props.chip}.svg`} />
                    :null
                }
            </div>
        </div>
    );
}