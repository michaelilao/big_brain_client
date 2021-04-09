const Header = ({ round, currentScore, time }) => {
    return (
        <>
            <h1 className="game-title">Reaction Time</h1>
            <div id="game-header">
                <h2 className="game-progress">Round: {round}</h2>
                <h2 className="game-progress">Score: {currentScore}</h2>
            </div>
            <h2 id="reaction-time-header">Reaction Time:</h2><br />
            {time ? <h2 id="reaction-time">{time}ms</h2> :
                <h2 id="initial-screen">N/A</h2>}
        </>
    )
}
export default Header
