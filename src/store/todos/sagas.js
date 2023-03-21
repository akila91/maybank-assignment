import { call, put, takeLatest } from 'redux-saga/effects'
import * as types from './actionTypes'
import * as actions from './actions'
import TodoService from './services'

function* todosRequestFlow(action) {
	try {
		const { filterArr } = action;
		const todos = yield call(TodoService.getTodos, filterArr);

		if (todos.status === 200) {
			yield put(actions.todosRequestSuccess(todos.data));
			yield put(actions.resetTodosRequest())
		} else {
			yield put(actions.todosRequestError(todos.error))
		}
	} catch (error) {
		yield put(actions.todosRequestError(error))
	}
}

function* todosWatcher() {
	yield [
		takeLatest(types.TODOS_REQUESTING, todosRequestFlow),
	]
}

export default todosWatcher
