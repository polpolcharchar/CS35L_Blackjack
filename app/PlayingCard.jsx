

const suitMap = {
    h: "Hearts",
    d: "Diamonds",
    c: "Clubs",
    s: "Spades"
}

const suitCodeMap = {
    h: "H",
    d: "D",
    c: "C",
    s: "S"
}

const rankCodeMap = {
    1: "A",
    10: "0",
    11: "J",
    12: "Q",
    13: "K"
}

const getRankDisplayNameFromNumber = (input) => {
    if(input >= 2 && input <= 10)return input;
    if(input == 1)return "Ace";
    if(input == 11)return "Jack";
    if(input == 12)return "Queen";
    if(input == 13)return "King";
}

const getCardCode = (suit, rank) => {
    const rankCode = rankCodeMap[rank] || rank;
    return `${rankCode}${suitCodeMap[suit]}`;
}

export default function PlayingCard({suit, rank, faceup}){
    const cardName = `${getRankDisplayNameFromNumber(rank)} of ${suitMap[suit]}`;
    const imageUrl = faceup === true
        ? `https://deckofcardsapi.com/static/img/${getCardCode(suit, rank)}.png`
        : "https://deckofcardsapi.com/static/img/back.png";

    return (
        <div className="playingCard">
            <img
                className="playingCardImage"
                src={imageUrl}
                alt={faceup === true ? cardName : "Face-down playing card"}
            />
        </div>
    )
}
