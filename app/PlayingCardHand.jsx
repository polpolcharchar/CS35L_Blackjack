import PlayingCard from "./PlayingCard"

export default function PlayingCardHand({cards}){


    return (
        <div style={{display: "flex", justifyContent: "center"}}>
            {cards.map((card, index) => 
                <PlayingCard key={index} suit={card.suit} rank={card.rank} faceup={card.faceup}/>
            )}
        </div>
    )

}