import PlayingCardHand from "./PlayingCardHand";
import { useState } from "react";



export default function BlackjackInterface() {

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
        if (type == "Hit")
        {
            const suits = ["s", "c", "d", "h"]
            const newSuit = suits[Math.floor(Math.random() * suits.length)]
            const newRank = Math.floor((Math.random() * 10)) + 1
            const newCard = { suit: newSuit, rank: newRank, faceup: true }
            setPlayerCards(playerCards.concat(newCard))
        }
        else if (type == "Stand")
        {
            //Do later
        }
        else if (type == "Reset")
        {
            setPlayerCards(playerCardsT)
            setDealerCards(dealerCardsT)
        }
    }

    function getHandValue(cards) {
        let total = cards.reduce((sum, card) => sum + card.rank, 0)
        const aces = cards.filter(card => card.rank === 1)
        for (let i = 0; i < aces.length; i++)
        {
            if (total + 10 <= 21) total += 10
        }
        return total
    }

    return (
        <div className="uiCard">
            {/* Hit, stand, reset, money display, card display, remaining cards in deck, round counter */}
            <div>
                <h1>Dealer</h1>{/*make this bold*/}
                <PlayingCardHand cards={dealerCards} />
            </div>

            <div>
                <div>
                    <h1>Player</h1>{/*make this bold*/}
                    <PlayingCardHand cards={playerCards} />
                </div>
                <div>
                    <button className="uiButton marginLeft" onClick={() => handleClick("Hit")}>Hit</button>
                    <button className="uiButton" onClick={() => handleClick("Stand")}>Stand</button>
                    <button className="uiButton" onClick={() => handleClick("Reset")}>Reset</button>
                </div>
            </div>
        </div>
    )

}