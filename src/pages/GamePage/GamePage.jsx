import {useState, useEffect} from "react";
import Board from "../../components/Board/Board";
import BoardRow from "../../components/BoardRow/BoardRow";
import Card from "../../components/Card/Card";
import "./GamePage.scss";
import cards from "../../data/cards";
import {createMatch, getMatch} from "../../utilities/match-api";
import {useParams} from "react-router-dom";

export default function GamePage(props) {
    const { id } = useParams();
    const [showLogin, setShowLogin] = useState(true);
    const [match, setMatch] = useState(null);

    useEffect(function (){
        async function getCurrentMatch(){
            const match = await getMatch(id);
            console.log(match);
            setMatch(match);
        }
        getCurrentMatch();

        // async function newMatch(){
        //     const match = await createMatch({
        //         test: "hello world",
        //         userId: "6248f4845ed590d936107589"
        //     });
        //     console.log(match);
        // }
        // // newMatch()

    }, [])


    return (
        <main>
            {match?
                <>
                    <Board/>
                    <div className="hand-cont">
                        {match.player_1.hand.map(card =>
                            <Card card={cards[card]}/>
                        )}
                    </div>
                </>
            :"loading"}
        </main>

    );
}