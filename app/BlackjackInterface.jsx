import PlayingCardHand from "./PlayingCardHand";
import { useState } from "react";



export default function BlackjackInterface({
    handleClick,
    dealerCards,
    playerCards,
    handWinner,
    playerScore,
    roundsPlayed,
    maxRounds,
    levelComplete,
    cardsRemaining,
    dealButtonDisabled,
    hitButtonDisabled,
    standButtonDisabled,
    resetButtonDisabled
}) {
    
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
                    <button disabled={dealButtonDisabled} className="uiButton" onClick={() => handleClick("Deal")}>Deal</button>
                    <button disabled={hitButtonDisabled}  className="uiButton" onClick={() => handleClick("Hit")}>Hit</button>
                    <button disabled={standButtonDisabled} className="uiButton" onClick={() => handleClick("Stand")}>Stand</button>
                    <button disabled={resetButtonDisabled} className="uiButton" onClick={() => handleClick("Reset")}>Reset</button>
                </div>
            </div>

            <div>
                <h1>Player Score: {playerScore}</h1>
                <h2>Round: {Math.min(roundsPlayed + 1, maxRounds)} of {maxRounds}</h2>
                <h2>Cards Remaining: {cardsRemaining}</h2>
                {levelComplete && (
                    <h2>Level complete! Final Score: {playerScore}</h2>
                )}
            </div>

            <div>{handWinner && (
                    <h1>{handWinner === "Draw" ? "Draw!" : `${handWinner} has won!`}</h1>
                )}
            </div>
        </div>
    )

}
