import globalVariables from "../../util/global";
import urlUtil from "../../util/buildURLFilterQuery";

export default class TodosService {

	static getTodos(reqParams) {
		const url = `/todos`;
		const method = "GET";
		let config = {
			headers: {
				"Content-Type": "todo/json",
				Accept: "application/json",
			},
			params: reqParams
		};

		return globalVariables.makeRequest(method, url, config, true)
			.then(response => {
				return response
			})
			.catch(error => {
				console.log(error);
				return error
			})
	}
}
