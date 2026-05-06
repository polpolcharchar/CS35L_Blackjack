import { useState } from "react";
import BlackjackInterface from "./BlackjackInterface";



const suits = ["h", "d", "c", "s"];
class PlayingCardObject {
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

}

export default function BlackjackGame() {

    // const [deck, setDeck] = useState([]);

    // const resetDeck = () => {
    //     result = []
    //     for (let i = 0; i < 11; i++) {
    //         for (s in suits) {
    //             result.push(new PlayingCardObject(s, i));
    //         }
    //     }
    //     setDeck(result);
    // }

    const [handWinner, setHandWinner] = useState("None")
    const [dealerCards, setDealerCards] = useState([])
    const dealerCardsT = [
        {
            suit: "h",
            rank: 2,
            faceup: true
        },
        {
            suit: "d",
            rank: 3,
            faceup: false
        },
    ]

    const [playerCards, setPlayerCards] = useState([])
    const playerCardsT = [
        {
            suit: "s",
            rank: 3,
            faceup: true
        }, {
            suit: "c",
            rank: 4,
            faceup: true
        },
    ]

    function handleClick(type) {
        if (type == "Hit") {
            const suits = ["s", "c", "d", "h"]
            const newSuit = suits[Math.floor(Math.random() * suits.length)]
            const newRank = Math.floor((Math.random() * 10)) + 1
            const newCard = { suit: newSuit, rank: newRank, faceup: true }
            setPlayerCards(playerCards.concat(newCard))
        }
        else if (type == "Stand") {
            //Do later
        }
        else if (type == "Reset") {
            setPlayerCards(playerCardsT)
            setDealerCards(dealerCardsT)
        }
    }

    function getHandValue(cards) {
        let total = cards.reduce((sum, card) => sum + card.rank, 0)
        const aces = cards.filter(card => card.rank === 1)
        for (let i = 0; i < aces.length; i++) {
            if (total + 10 <= 21) total += 10
        }
        return total
    }

    function checkGameState(caller) {
        const playerTotal = getHandValue(playerCards)
        const dealerTotal = getHandValue(dealeCards)
        if (playerTotal > 21) {
            setHandWinner("Dealer")
        }
        else if (dealerTotal > 21) {
            setHandWinner("Player")
        }
        else if (caller == "Stand") {
            const test = dealerTotal
            while (dealerTotal < 17) {
                const suits = ["s", "c", "d", "h"]
                const newSuit = suits[Math.floor(Math.random() * suits.length)]
                const newRank = Math.floor((Math.random() * 10)) + 1
                const newCard = { suit: newSuit, rank: newRank, faceup: true }
                setDealerCards(dealerCards.concat(newCard))
                dealerTotal = getHandValue(dealerCards)
            }
            if (dealerTotal > 21 || playerTotal > dealerTotal) {
                setHandWinner("Player")
            }
            else if (dealerTotal > playerTotal) {
                setHandWinner("Dealer")
            }
            else {
                setHandWinner("Draw")
            }
        }
    }

    return (
        <>
        <BlackjackInterface handleClick={handleClick} dealerCards={dealerCards} playerCards={playerCards}/>
        </>
    )
}