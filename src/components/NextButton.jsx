function NextButton({ dispatch, chosenOption, currQues, numQuestions }) {
	if (chosenOption === null) return null;

	const isLastQuestion = currQues === numQuestions - 1;

	return (
		<button
			className="btn btn-ui"
			onClick={() => dispatch({ type: isLastQuestion ? 'finish' : 'nextQuestion' })}
		>
			{isLastQuestion ? 'Finish' : 'Next'}
		</button>
	);
}

export default NextButton;
