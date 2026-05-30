import PlayingCard from "./PlayingCard"

export default function PlayingCardHand({cards}){


    return (
        <div className="playingCardHand">
            {cards.map((card, index) => 
                <PlayingCard key={index} suit={card.suit} rank={card.rank} faceup={card.faceup}/>
            )}
        </div>
    )

}
