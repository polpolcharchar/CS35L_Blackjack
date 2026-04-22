

export default function BlackjackInterface(){

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
        },{
            suit: "c",
            rank: 4,
            faceup: true
        },
    ]

    return (
        <div className="uiCard">
            {/* Hit, stand, reset, money display, card display, remaining cards in deck, round counter */}
            <div>
                dealer cards
            </div>

            <div style={{display: "flex"}}>
                <div>
                    player cards
                </div>
                <div>
                    buttons
                </div>
            </div>
        </div>
    )

}