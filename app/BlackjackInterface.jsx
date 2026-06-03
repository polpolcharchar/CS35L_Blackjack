import PlayingCardHand from "./PlayingCardHand";

export default function BlackjackInterface({
    handleClick,
    dealerCards,
    playerCards,
    handWinner,
    playerScore,
    highScore,
    betScore,
    playerName,
    onPlayerNameChange,
    playerPin,
    onPlayerPinChange,
    onLogin,
    onLogout,
    isAuthenticated,
    authMessage,
    scoreSubmitMessage,
    dealButtonDisabled,
    addBetButtonDisabled,
    clearBetButtonDisabled,
    hitButtonDisabled,
    standButtonDisabled,
    resetButtonDisabled,
    doneLevel,
    inLevels
}) {

    return (
        <div className="tableLayout">
            <div className="uiCard">

                <div className="tableTitle">Blackjack</div>

                <div className="buttonRow">
                    <button className="uiButtonSecondary" onClick={() => handleClick("Random")}>
                        Random
                    </button>
                    {!inLevels && (
                        <button className="uiButtonSecondary" onClick={() => handleClick("Levels")}>
                            Levels
                        </button>
                    )}
                    {inLevels && (
                        <>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level1")}>Level 1</button>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level2")}>Level 2</button>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level3")}>Level 3</button>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level4")}>Level 4</button>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level5")}>Level 5</button>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level6")}>Level 6</button>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level7")}>Level 7</button>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level8")}>Level 8</button>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level9")}>Level 9</button>
                            <button className="uiButtonSecondary" onClick={() => handleClick("Level10")}>Level 10</button>
                        </>
                    )}
                </div>

                <hr className="feltDivider" />

                <div className="authPanel">
                    <label className="playerNameField">
                        <span className="statLabel">Player Name</span>
                        <input
                            className="playerNameInput"
                            type="text"
                            value={playerName}
                            onChange={(event) => onPlayerNameChange(event.target.value)}
                            maxLength={24}
                            disabled={isAuthenticated}
                            id="playerNameInput"
                        />
                    </label>

                    {!isAuthenticated && (
                        <label className="playerNameField">
                            <span className="statLabel">PIN</span>
                            <input
                                className="playerNameInput pinInput"
                                type="password"
                                value={playerPin}
                                onChange={(event) => onPlayerPinChange(event.target.value)}
                                maxLength={24}
                                id="pinInput"
                            />
                        </label>
                    )}

                    <button
                        className="uiButtonSecondary"
                        type="button"
                        onClick={isAuthenticated ? onLogout : onLogin}
                        id="logInButton"
                    >
                        {isAuthenticated ? "Log Out" : "Log In"}
                    </button>

                    {authMessage && (
                        <div className="authMessage">
                            {authMessage}
                        </div>
                    )}
                </div>

                <hr className="feltDivider" />

                <div>
                    <p className="sectionLabel">Dealer</p>
                    <PlayingCardHand cards={dealerCards} />
                </div>

                <hr className="feltDivider" />

                <div>
                    <p className="sectionLabel">Player</p>
                    <PlayingCardHand cards={playerCards} />
                </div>

                <div className="buttonRow">
                    <button disabled={dealButtonDisabled} className="uiButton" id="dealButton" onClick={() => handleClick("Deal")}>Deal</button>
                    <button disabled={addBetButtonDisabled} className="uiButton" id="addBetButton" onClick={() => handleClick("Add Bet")}>Add Bet</button>
                    <button disabled={clearBetButtonDisabled} className="uiButton" onClick={() => handleClick("Clear Bet")}>Clear Bet</button>
                    <button disabled={hitButtonDisabled} className="uiButton" onClick={() => handleClick("Hit")}>Hit</button>
                    <button disabled={standButtonDisabled} className="uiButton" id="standButton" onClick={() => handleClick("Stand")}>Stand</button>
                    <button disabled={resetButtonDisabled} className="uiButton" onClick={() => handleClick("Reset")}>Reset</button>
                </div>

                <hr className="feltDivider" />

                <div className="statsRow">
                    <div className="statChip">
                        <span className="statLabel">Current Bet</span>
                        <span className="statValue">{betScore}</span>
                    </div>
                    <div className="statChip">
                        <span className="statLabel">Score</span>
                        <span className="statValue">{playerScore}</span>
                    </div>
                    <div className="statChip">
                        <span className="statLabel">Best Run</span>
                        <span className="statValue">{highScore}</span>
                    </div>
                </div>

                {handWinner && (
                    <div className="winnerBanner">
                        {handWinner === "Draw" ? "- Draw -" : `${handWinner} Wins!`}
                    </div>
                )}

                {doneLevel && (
                    <div className="levelBanner">
                        Your 10 hands are up. Press Reset to retry.
                    </div>
                )}

                {scoreSubmitMessage && (
                    <div className="levelBanner">
                        {scoreSubmitMessage}
                    </div>
                )}

            </div>
        </div>
    );
}
