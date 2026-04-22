

export default function PlayingCard({suit, rank, faceup}){

    const suitMap = {
        "h": "Hearts",
        "d": "Diamonds",
        "c": "Clubs",
        "s": "Spades"
    }

    return (
        <div className="playingCard" style={{color: (suit === "h" || suit === "d" ? "red" : "black")}}>
            {
                faceup === true && <p>{rank} of {suitMap[suit]}</p>
            }
        </div>
    )
}