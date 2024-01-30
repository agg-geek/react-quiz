function Question({ question, dispatch, chosenOption }) {
	const isAnswered = chosenOption !== null;

	return (
		<div>
			<h4>{question.question}</h4>
			<div className="options">
				{question.options.map((option, idx) => (
					<button
						onClick={() => dispatch({ type: 'newAnswer', payload: idx })}
						className={`btn btn-option ${
							idx === chosenOption ? 'answer' : ''
						} ${
							isAnswered
								? idx === question.correctOption
									? 'correct'
									: 'wrong'
								: ''
						}`}
						disabled={isAnswered}
						key={option}
					>
						{option}
					</button>
				))}
			</div>
		</div>
	);
}
export default Question;
