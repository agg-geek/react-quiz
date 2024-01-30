function NextButton({ dispatch, chosenOption }) {
	if (chosenOption === null) return null;

	return (
		<button className="btn btn-ui" onClick={() => dispatch({ type: 'nextQuestion' })}>
			Next
		</button>
	);
}

export default NextButton;
