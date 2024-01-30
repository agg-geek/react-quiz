import './index.css';
import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';
import StartScreen from './components/StartScreen';
import Question from './components/Question';

const initialState = {
	questions: [],
	status: 'loading',
	currQues: 0,
	chosenOption: null,
};

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'fetchFailed':
			return { ...state, status: 'error' };
		case 'startQuiz':
			return { ...state, status: 'active' };
		case 'newAnswer':
			return { ...state, chosenOption: action.payload };
		default:
			throw new Error('Unknown action ');
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, status, currQues, chosenOption } = state;

	const numQuestions = questions?.length;

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
					<Question
						question={questions.at(currQues)}
						dispatch={dispatch}
						chosenOption={chosenOption}
					/>
				)}
			</Main>
		</div>
	);
}
