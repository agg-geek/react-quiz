import './index.css';
import { useEffect, useReducer } from 'react';

import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import ErrorMsg from './components/ErrorMsg';
import StartScreen from './components/StartScreen';

const initialState = {
	questions: [],
	// 'loading', 'error', 'ready', 'active', 'finished'
	status: 'loading',
};

function reducer(state, action) {
	switch (action.type) {
		case 'dataReceived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'fetchFailed':
			return { ...state, status: 'error' };
		default:
			throw new Error('Unknown action ');
	}
}

export default function App() {
	const [state, dispatch] = useReducer(reducer, initialState);
	const { questions, status } = state;

	const numQuestions = questions?.length;

	// we use json-server to create a server which will serve the data
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
				{status === 'ready' && <StartScreen numQuestions={numQuestions} />}
			</Main>
		</div>
	);
}
