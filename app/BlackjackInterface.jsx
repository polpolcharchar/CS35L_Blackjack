import PlayingCardHand from "./PlayingCardHand";
import { useState } from "react";



export default function BlackjackInterface({
    handleClick,
    dealerCards,
    playerCards,
    handWinner,
    playerScore,
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
                    <button className="uiButton marginLeft" onClick={() => handleClick("Deal")}>Deal</button>
                    <button className="uiButton" onClick={() => handleClick("Hit")}>Hit</button>
                    <button className="uiButton" onClick={() => handleClick("Stand")}>Stand</button>
                    <button className="uiButton" onClick={() => handleClick("Reset")}>Reset</button>
                </div>
            </div>

            <div>
                <h1>Player Score: {playerScore}</h1>
            </div>

            <div>{handWinner && (
                    <h1>{handWinner} has won!</h1>
                )}
            </div>
        </div>
    )

}