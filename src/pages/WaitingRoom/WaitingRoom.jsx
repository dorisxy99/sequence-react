import {useState, useEffect} from "react";
// import "./GamePage.scss";
import cards from "../../data/cards";
import {createMatch, getAllMatches, getMatch, playCard, joinMatch} from "../../utilities/match-api";
import Card from "../../components/Card/Card";
import moment from "moment";
import "./WaitingRoom.scss";


export default function WaitingRoom(props) {
    const [matches, setMatches] = useState([]);
    useEffect(function (){

    async function getMatches(){
        const matches = await getAllMatches();
        console.log(matches);
        setMatches(matches);
    }
    getMatches()
    }, [])

    async function join(matchId){
        console.log(matchId);
        try{
            let updatedMatch  = await joinMatch({
                userId: props.user._id,
                matchId: matchId
            });
            console.log(updatedMatch);

        }catch (err){
            alert(err.message)
        }
    }


    return (
        <main>
            {matches.map(match =>
                <div className="match-cont">
                    <h1>{match.player_1.user.name}</h1>
                    <p>{match.status}</p>
                    <p>{moment(match.createdAt).fromNow()}</p>
                    <a href={`/match/${match._id}`} className="btn"> Continue the game!</a>
                    <a onClick={ () => join(match._id) } className="btn"> Join the game!</a>

                </div>
            )}
        </main>

    );
}