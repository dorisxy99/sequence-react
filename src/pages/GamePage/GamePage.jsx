import {useState, useEffect} from "react";
import Board from "../../components/Board/Board";
import Card from "../../components/Card/Card";
import "./GamePage.scss";
import cards from "../../data/cards";
import {createMatch, getMatch, playCard} from "../../utilities/match-api";
import {useParams} from "react-router-dom";
import socketIOClient from "socket.io-client";

const ENDPOINT = "/";

export default function GamePage(props) {
    const { id } = useParams();
    const [showLogin, setShowLogin] = useState(true);
    const [match, setMatch] = useState(null);
    const [player, setPlayer] = useState(null);
    const [socket, setSocket] = useState(null);

    function updateMatch(match){
        if(props.user._id === match.player_1.user._id){
            setPlayer(match.player_1);
        } else{
            setPlayer(match.player_2);
        }
        setMatch(match);
    }

    useEffect(function (){
        const newSocket = socketIOClient(ENDPOINT);
        newSocket.emit("join", id);
        newSocket.on("matchUpdated", data => {
            console.log(data);
            updateMatch(data)
        });
        setSocket(newSocket);

        async function getCurrentMatch(){
            const match = await getMatch(id);
            console.log(match);
            updateMatch(match);
        }
        getCurrentMatch();

        return () => socket.disconnect();

        async function newMatch(){
            const match = await createMatch({
                test: "hello world",
                userId: props.user._id
            });
            console.log(match);
        }
       newMatch()

    }, [])

    async function clickCard(card){
        socket.emit("playCard", {matchId: match._id, card: card, userId: props.user._id}, (res) => {
            console.log(res);
            updateMatch(res);
        });

        // try{
        //     let updatedMatch  = await playCard({
        //         userId: props.user._id,
        //         matchId: match._id,
        //         card: card
        //     });
        //     console.log(updatedMatch);
        //     updateMatch(updatedMatch);
        // }catch (err){
        //     alert(err.message)
        // }
    }

    return (
        <main>
            {match && player?
                <>
                    <Board boardCards={match.board} playCard={clickCard} />
                    <div className="hand-cont">
                        {player.hand.map(cardId =>
                            <Card card={cards[cardId]}/>
                        )}
                    </div>
                </>
            :"loading"}
        </main>

    );
}