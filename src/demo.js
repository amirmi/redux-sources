import {createSource} from "./redux-sources"

const mockDispatch = (action) => {
	console.log("Dispatching Action:", action)
}

const mockGetState = () => {
	return {
		"foo": "bar"
	}
}

const source = createSource({
	local() {
		console.log("local");
		return undefined;
	},

	remote() {
		console.log("remote");
		return "Amir"
	},
	success: "SUCCESS",
	error: "ERROR",
	loading: "LOADING"
})

source(mockDispatch, mockGetState)

