function ProgressBar({ currQues, numQuestions, points, maxPoints, chosenOption }) {
	return (
		<header className="progress">
			<progress
				max={numQuestions}
				value={currQues + Number(chosenOption !== null)}
			/>
			<p>
				Question <strong>{currQues + 1}</strong> / {numQuestions}
			</p>
			<p>
				<strong>{points}</strong> / {maxPoints}
			</p>
		</header>
	);
}
export default ProgressBar;
