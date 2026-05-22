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

const deck1 = [
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('s', 11, true),
];
const deck2 = [
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('c', 3, true),
];
const deck3 = [
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('s', 5, true),
];
const deck4 = [
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('s', 2, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('d', 3, true),
];
const deck5 = [
  new PlayingCardObject('d', 1, true),
  new PlayingCardObject('d', 11, true),
  new PlayingCardObject('s', 4, true),
  new PlayingCardObject('h', 9, true),
  new PlayingCardObject('c', 9, true),
  new PlayingCardObject('d', 6, true),
  new PlayingCardObject('h', 4, true),
  new PlayingCardObject('s', 8, true),
  new PlayingCardObject('h', 5, true),
  new PlayingCardObject('d', 12, true),
  new PlayingCardObject('d', 7, true),
  new PlayingCardObject('d', 3, true),
  new PlayingCardObject('c', 6, true),
  new PlayingCardObject('c', 3, true),
  new PlayingCardObject('h', 1, true),
  new PlayingCardObject('d', 9, true),
  new PlayingCardObject('h', 13, true),
  new PlayingCardObject('c', 13, true),
  new PlayingCardObject('d', 2, true),
  new PlayingCardObject('h', 12, true),
  new PlayingCardObject('s', 3, true),
  new PlayingCardObject('c', 8, true),
  new PlayingCardObject('s', 1, true),
  new PlayingCardObject('h', 10, true),
  new PlayingCardObject('c', 12, true),
  new PlayingCardObject('d', 13, true),
  new PlayingCardObject('h', 6, true),
  new PlayingCardObject('d', 5, true),
  new PlayingCardObject('d', 10, true),
  new PlayingCardObject('h', 2, true),
  new PlayingCardObject('h', 7, true),
  new PlayingCardObject('s', 6, true),
  new PlayingCardObject('c', 2, true),
  new PlayingCardObject('d', 8, true),
  new PlayingCardObject('s', 9, true),
  new PlayingCardObject('s', 12, true),
  new PlayingCardObject('s', 7, true),
  new PlayingCardObject('s', 13, true),
  new PlayingCardObject('s', 5, true),
  new PlayingCardObject('c', 5, true),
  new PlayingCardObject('s', 11, true),
  new PlayingCardObject('c', 7, true),
  new PlayingCardObject('c', 11, true),
  new PlayingCardObject('d', 4, true),
  new PlayingCardObject('c', 10, true),
  new PlayingCardObject('h', 8, true),
  new PlayingCardObject('h', 11, true),
  new PlayingCardObject('s', 10, true),
  new PlayingCardObject('h', 3, true),
  new PlayingCardObject('c', 4, true),
  new PlayingCardObject('c', 1, true),
  new PlayingCardObject('s', 2, true),
];

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

    const [mode, setMode] = useState("Random");
    const [level, setLevel] = useState(0);
    
    const [handWinner, setHandWinner] = useState("");
    const [handsPlayed, setHandsPlayed] = useState(0);
    const [dealerCards, setDealerCards] = useState([]);

    const [playerCards, setPlayerCards] = useState([]);

    const [clickableButtons, setClickableButtons] = useState(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels"]);
    const [bet, setBet] = useState(0);
    function handleClick(type) {
        if (!clickableButtons.includes(type)) {
            return;
        }
        if (type == "Deal") {
            const cards = pullCard(4);
            setPlayerCards(playerCards.concat(cards[0], cards[2]));
            setDealerCards(dealerCards.concat(cards[1], cards[3]));
            setClickableButtons(["Hit", "Stand", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            checkGameState("Deal");
        }
        else if (type == "Add Bet"){
            if (score >= 50)
            {
                setBet(prev => prev + 50);
                setScore(prev => prev - 50);
            }
        }
        else if (type == "Clear Bet"){
            setScore(prev => prev + bet);
            setBet(0);
        }
        else if (type == "Hit") {
            setPlayerCards(playerCards.concat(pullCard()));
            setClickableButtons(["Hit", "Stand", "Reset", "Random", "Levels"]);
            checkGameState("Hit");
        }
        else if (type == "Stand") {
            checkGameState("Stand");
        }
        else if (type == "Reset") {
            setPlayerCards([]);
            setDealerCards([]);
            resetDeck();
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
        }
        else if (type == "Random")
        {
            setMode("Random");
            setPlayerCards([]);
            setDealerCards([]);
            resetDeck();
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(0);
        }
        else if (type == "Levels")
        {
            setMode("Levels");
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Level1", "Level2", "Level3", "Level4", "Level5"]);
        }
        else if (type == "Level1")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck1);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(1);
        }
        else if (type == "Level2")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck2);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(2);
        }
        else if (type == "Level3")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck3);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(3);
        }
        else if (type == "Level4")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck4);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(4);
        }
        else if (type == "Level5")
        {
            setPlayerCards([]);
            setDealerCards([]);
            setDeck(deck5);
            setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            setScore(100);
            setHandWinner("");
            setHandsPlayed(0);
            setLevel(5);
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
        }
        else if (dealerTotal > 21) {
            setHandWinner("Player");
            endRound(100);
        }
        else if (caller == "Stand") {

            if (dealerTotal >= 17 || dealerTotal > playerTotal) {
                if (dealerTotal > 21 || playerTotal > dealerTotal) {
                    setHandWinner("Player");
                    endRound(100);
                }
                else if (dealerTotal > playerTotal) {
                    setHandWinner("Dealer");
                    endRound(0);
                }
                else {
                    setHandWinner("Draw");
                    endRound(50);
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

    const [score, setScore] = useState(100);
    const [highScore, setHighScore] = useState(0);
    const [highScoreL1, setHighScoreL1] = useState(0);
    const [highScoreL2, setHighScoreL2] = useState(0);
    const [highScoreL3, setHighScoreL3] = useState(0);
    const [highScoreL4, setHighScoreL4] = useState(0);
    const [highScoreL5, setHighScoreL5] = useState(0);
    function endRound(tScore) {
        setPlayerCards([]);
        setDealerCards([]);
        setClickableButtons(["Deal", "Add Bet", "Clear Bet", "Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
        if (tScore == 0)
        {
            setBet(0);
        }
        else if (tScore == 50)
        {
            setScore(prev => prev + bet);
            setBet(0);
        }
        else if (tScore == 100)
        {
            setScore(prev => prev + bet * 2);
            setBet(0);
        }
        const amount = handsPlayed + 1;
        setHandsPlayed(prev => prev + 1);
        if (amount > 10)
        {
            if (level == 0)
            {
                if (score > highScore)
                {
                    setHighScore(score);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            }
            else if (level == 1)
            {
                if (score > highScoreL1)
                {
                    setHighScoreL1(score);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            }
            else if (level == 2)
            {
                if (score > highScoreL2)
                {
                    setHighScoreL2(score);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            }
            else if (level == 3)
            {
                if (score > highScoreL3)
                {
                    setHighScoreL3(score);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            }
            else if (level == 4)
            {
                if (score > highScoreL4)
                {
                    setHighScoreL4(score);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            }
            else if (level == 5)
            {
                if (score > highScoreL5)
                {
                    setHighScoreL5(score);
                }
                setClickableButtons(["Reset", "Random", "Levels", "Level1", "Level2", "Level3", "Level4", "Level5"]);
            }
        }
    }

    return (
        <>
            <BlackjackInterface
                handleClick={handleClick}
                dealerCards={dealerCards}
                playerCards={playerCards}
                handWinner={handWinner}
                playerScore={score}
                highScore={(level == 0 && highScore) + (level == 1 && highScoreL1) + (level == 2 && highScoreL2) + (level == 3 && highScoreL3) + (level == 4 && highScoreL4) + (level == 5 && highScoreL5)}
                betScore={bet}
                dealButtonDisabled={clickableButtons.findIndex(a => a == "Deal") == -1}
                addBetButtonDisabled={clickableButtons.findIndex(a => a == "Add Bet") == -1}
                clearBetButtonDisabled={clickableButtons.findIndex(a => a == "Clear Bet") == -1}
                hitButtonDisabled={clickableButtons.findIndex(a => a == "Hit") == -1}
                standButtonDisabled={clickableButtons.findIndex(a => a == "Stand") == -1}
                resetButtonDisabled={clickableButtons.findIndex(a => a == "Reset") == -1}
                doneLevel={handsPlayed > 10}
                inLevels={mode != "Random"}
            />
        </>
    )
}