import * as types from './actionTypes'

/* Get all todos */
export const todosRequest = function todosRequest(filterArr) {
	return {
		type: types.TODOS_REQUESTING,
		filterArr
	}
};

export const todosRequestSuccess = function todosRequestSuccess(todos) {
	return {
		type: types.TODOS_REQUEST_SUCCESS,
		todos,
	}
};

export const todosRequestError = function todosRequestError(error) {
	return {
		type: types.TODOS_REQUEST_ERROR,
		error,
	}
};

export const resetTodosRequest = function resetTodosRequest() {
	return {
		type: types.RESET_TODOS_REQUEST
	}
};
