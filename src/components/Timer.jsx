import { useEffect } from 'react';

function Timer({ dispatch, timeLeft }) {
	const mins = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	useEffect(function () {
		const id = setInterval(() => {
			dispatch({ type: 'tick' });
		}, 1000);

		return () => clearInterval(id);
	}, []);

	return (
		<div className="timer">
			{mins < 10 && '0'}
			{mins}:{seconds < 10 && '0'}
			{seconds}
		</div>
	);
}
export default Timer;
