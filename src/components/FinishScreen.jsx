function FinishScreen({ points, maxPoints, highScore, dispatch }) {
	const percentageScore = (points / maxPoints) * 100;
	return (
		<>
			<p className="result">
				You scored <strong>{points}</strong> / {maxPoints} points (
				{Math.round(percentageScore)}%)
			</p>
			<p className="highscore">Highscore: {highScore} points</p>
			<button className="btn btn-ui" onClick={() => dispatch({ type: 'restart' })}>
				Restart Quiz
			</button>
		</>
	);
}
export default FinishScreen;
