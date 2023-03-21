import * as types from './actionTypes'
import Immutable from 'seamless-immutable'

const initialState = Immutable({
	/* Get all todos */
	todos: [],
	todosTracker: { status: 'idle' },
	todosTimestamp: undefined,
});

const reducer = function todoReducer(state = initialState, action) {
	switch (action.type) {
		/* Get todos */
		case types.TODOS_REQUESTING:
			return state.merge({
				todosTracker: { status: 'processing' },
			});

		case types.TODOS_REQUEST_SUCCESS:
			return state.merge({
				todosTracker: { status: 'success' },
				todos: action.todos,
				todosTimestamp: action.timestamp,
			});

		case types.TODOS_REQUEST_ERROR:
			return state.merge({
				todosTracker: {
					status: 'error',
					errors: action.error,
				},
				todosTimestamp: action.timestamp,
			});

		case types.RESET_TODOS_REQUEST:
			return state.merge({
				todosTracker: { status: 'idle' },
			});

		default:
			return state
	}
};

export default reducer
