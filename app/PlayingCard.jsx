

export default function PlayingCard({suit, rank, faceup}){

    const suitMap = {
        "h": "Hearts",
        "d": "Diamonds",
        "c": "Clubs",
        "s": "Spades"
    }

    const getRankDisplayNameFromNumber = (input) => {
        if(input >= 2 && input <= 10)return input;
        if(input == 1)return "Ace";
        if(input == 11)return "Jack";
        if(input == 12)return "Queen";
        if(input == 13)return "King";

    }

    return (
        <div className="playingCard" style={{color: (suit === "h" || suit === "d" ? "red" : "black")}}>
            {
                faceup === true && <p>{getRankDisplayNameFromNumber(rank)} of {suitMap[suit]}</p>
            }
        </div>
    )
}