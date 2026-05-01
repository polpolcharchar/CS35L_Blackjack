import { useState } from "react";



const suits = ["h", "d", "c", "s"];
class PlayingCardObject {
    constructor(suit, rank){
        this.suit = suit;
        this.rank = rank;
    }

}

export default function BlackjackGame(){

    const [deck, setDeck] = useState([]);

    const resetDeck = () => {
        result = []
        for(let i = 0; i < 11; i++){
            for(s in suits){
                result.push(new PlayingCardObject(s, i));
            }
        }
        setDeck(result);
    }
}