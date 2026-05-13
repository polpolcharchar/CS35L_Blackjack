import { useEffect, useState } from "react";
import BlackjackInterface from "./BlackjackInterface";



const suits = ["h", "d", "c", "s"];
class PlayingCardObject {
    constructor(suit, rank, faceup) {
        this.suit = suit;
        this.rank = rank;
        this.faceup = faceup;
    }

}

export default function BlackjackGame() {

    //Found Online - Helper function
    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    const [deck, setDeck] = useState([]);
    const resetDeck = () => {
        let result = []
        for (let i = 1; i <= 13; i++) {
            for (const s of suits) {
                result.push(new PlayingCardObject(s, i, true));
            }
        }
        shuffle(result);
        setDeck(result);
    }

    //resets the deck on startup
    useEffect(() => {
        resetDeck();
    }, []);

    const pullCard = (count = 1) => {
        if (deck.length === 0) return;

        let result = deck.slice(0, count);
        setDeck(prev => prev.slice(count));
        return result;
    }

    const [handWinner, setHandWinner] = useState("");
    const [dealerCards, setDealerCards] = useState([]);

    const [playerCards, setPlayerCards] = useState([]);

    const [clickableButtons, setClickableButtons] = useState(["Deal", "Reset"]);
    function handleClick(type) {
        if (!clickableButtons.includes(type)) {
            return;
        }
        if (type == "Deal") {
            const cards = pullCard(4);
            setPlayerCards(playerCards.concat(cards[0], cards[2]));
            setDealerCards(dealerCards.concat(cards[1], cards[3]));
            setClickableButtons(["Hit", "Stand", "Reset"]);
            checkGameState("Deal");
        }
        else if (type == "Hit") {
            setPlayerCards(playerCards.concat(pullCard()));
            setClickableButtons(["Hit", "Stand", "Reset"]);
            checkGameState("Hit");
        }
        else if (type == "Stand") {
            checkGameState("Stand");
        }
        else if (type == "Reset") {
            setPlayerCards([]);
            setDealerCards([]);
            resetDeck();
            setClickableButtons(["Deal", "Reset"]);
            setScore(0);
            setHandWinner("");
        }
    }

    function getHandValue(cards) {
        let total = cards.reduce((sum, card) => {
            const value = card.rank > 10 ? 10 : card.rank;
            return sum + value;
        }, 0);
        const aces = cards.filter(card => card.rank === 1);
        for (let i = 0; i < aces.length; i++) {
            if (total + 10 <= 21) total += 10;
        }
        return total;
    }

    function checkGameState(caller, dealerHand = dealerCards) {
        //dealerCards should be passed recursively because this function is recursive
        //In a recursive function call, hook is never updated
        const playerTotal = getHandValue(playerCards)
        let dealerCardsLocal = dealerHand.slice();
        let dealerTotal = getHandValue(dealerCardsLocal);
        if (playerTotal > 21) {
            setHandWinner("Dealer");
            endRound(0);
            setClickableButtons(["Deal"]);
        }
        else if (dealerTotal > 21) {
            setHandWinner("Player");
            endRound(100);
            setClickableButtons(["Deal"]);
        }
        else if (caller == "Stand") {

            if (dealerTotal >= 17 || dealerTotal > playerTotal) {
                if (dealerTotal > 21 || playerTotal > dealerTotal) {
                    setHandWinner("Player");
                    endRound(100);
                    setClickableButtons(["Deal"]);
                }
                else if (dealerTotal > playerTotal) {
                    setHandWinner("Dealer");
                    endRound(0);
                    setClickableButtons(["Deal"]);
                }
                else {
                    setHandWinner("Draw");
                    endRound(50);
                    setClickableButtons(["Deal"]);
                }
                return;
            }

            const newSuit = suits[Math.floor(Math.random() * suits.length)];
            const newRank = Math.floor((Math.random() * 10)) + 1;
            const newCard = { suit: newSuit, rank: newRank, faceup: true };
            dealerCardsLocal = dealerCardsLocal.concat(newCard);

            // THIS CANNOT BE DONE BECAUSE DEALERCARDS IS NOT GUARENTEED TO BE UPDATED IMMEDIATELY!
            // dealerTotal = getHandValue(dealerCards)

            dealerTotal = getHandValue(dealerCardsLocal);
            setDealerCards(dealerCardsLocal);

            setTimeout(() => {
                checkGameState("Stand", dealerCardsLocal);
            }, 1000);
        }
    }

    const [score, setScore] = useState(0);
    function endRound(score) {
        setPlayerCards([]);
        setDealerCards([]);
        setClickableButtons(["Deal", "Reset"]);
        setScore(prev => prev + score);
    }

    return (
        <>
            <BlackjackInterface
                handleClick={handleClick}
                dealerCards={dealerCards}
                playerCards={playerCards}
                handWinner={handWinner}
                playerScore={score}
                dealButtonDisabled={clickableButtons.findIndex(a => a == "Deal") == -1}
                hitButtonDisabled={clickableButtons.findIndex(a => a == "Hit") == -1}
                standButtonDisabled={clickableButtons.findIndex(a => a == "Stand") == -1}
                resetButtonDisabled={clickableButtons.findIndex(a => a == "Reset") == -1}
            />
        </>
    )
}