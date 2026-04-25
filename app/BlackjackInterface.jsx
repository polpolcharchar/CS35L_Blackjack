import PlayingCardHand from "./PlayingCardHand";




export default function BlackjackInterface() {

    const dealerCards = [
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

    const playerCards = [
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

    function handleClick( type ) {
        
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