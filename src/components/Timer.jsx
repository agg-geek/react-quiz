import { useEffect } from 'react';

function Timer({ dispatch, timeLeft }) {
	const mins = Math.floor(timeLeft / 60);
	const seconds = timeLeft % 60;

	useEffect(function () {
		const id = setInterval(() => {
			dispatch({ type: 'tick' });
		}, 1000);

		// since each effect runs twice in dev mode due to StrictMode
		// the time decreases by 2 seconds every second
		// we need to clear the interval of the previous useeffect
		// also, the clearinterval is necessary as if you restarted quiz
		// then multiple interval timers decreased the time even more
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
