import './Card.scss';
export default function Card(props) {
    return(
        <div className="Card">
            <div className="inner">
                <h4>{props.card.value}</h4>
                <img src={`/cardimg/${props.card.suit}.svg`} />
            </div>
        </div>
    );
}