import './index.css';
import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextButton from './components/NextButton';
import ProgressBar from './components/ProgressBar';
import Timer from './components/Timer';
import Footer from './components/Footer';
import FinishScreen from './components/FinishScreen';

const SECS_PER_QUESTION = 20;

const initialState = {
	questions: [],
	status: 'loading',
	currQues: 0,
	chosenOption: null,
	points: 0,
	highScore: 0,
	timeLeft: 100,
};

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'fetchFailed':
			return { ...state, status: 'error' };
		case 'startQuiz':
			return {
				...state,
				status: 'active',
				// timeLeft: state.questions.length * SECS_PER_QUESTION,
				timeLeft: 10,
			};
		case 'newAnswer':
			const question = state.questions.at(state.currQues);
			const chosenOption = action.payload;
			const isCorrectAns = question.correctOption === chosenOption;
			return {
				...state,
				chosenOption,
				points: state.points + isCorrectAns * question.points,
			};
		case 'nextQuestion':
			return { ...state, currQues: state.currQues + 1, chosenOption: null };
		case 'finish':
			return {
				...state,
				status: 'finish',
				highScore: Math.max(state.highScore, state.points),
			};
		case 'restart':
			return {
				...initialState,
				questions: state.questions,
				status: 'ready',
				highScore: state.highScore,
			};
		case 'tick':
			return {
				...state,
				timeLeft: state.timeLeft - 1,
				...(state.timeLeft === 0 && {
					status: 'finish',
					highScore: Math.max(state.highScore, state.points),
				}),
			};
		default:
			throw new Error('Unknown action ');
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, status, currQues, chosenOption, points, highScore, timeLeft } =
		state;

	const numQuestions = questions?.length;
	const maxPoints = questions?.reduce((acc, curr) => acc + curr.points, 0);

	useEffect(function () {
		fetch('http://localhost:3000/questions')
			.then(res => res.json())
			.then(data => dispatch({ type: 'dataReceived', payload: data }))
			.catch(err => dispatch({ type: 'fetchFailed' }));
	}, []);

	return (
		<div className="app">
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <ErrorMsg />}
				{status === 'ready' && (
					<StartScreen numQuestions={numQuestions} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<>
						<ProgressBar
							currQues={currQues}
							numQuestions={numQuestions}
							points={points}
							maxPoints={maxPoints}
							chosenOption={chosenOption}
						/>
						<Question
							question={questions.at(currQues)}
							dispatch={dispatch}
							chosenOption={chosenOption}
						/>
						<Footer>
							<Timer dispatch={dispatch} timeLeft={timeLeft} />
							<NextButton
								dispatch={dispatch}
								chosenOption={chosenOption}
								currQues={currQues}
								numQuestions={numQuestions}
							/>
						</Footer>
					</>
				)}
				{status === 'finish' && (
					<FinishScreen
						points={points}
						maxPoints={maxPoints}
						highScore={highScore}
						dispatch={dispatch}
					/>
				)}
			</Main>
		</div>
	);
}
