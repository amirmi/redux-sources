
import {isFunction, isString, isObject} from 'lodash';

function asyncRunner(g) {
    let it = g(), ret;

    // asynchronously iterate over generator
    (function iterate(val){
        ret = it.next( val );
        console.log(ret);
        if (!ret.done) {
    		const isPromise = (isObject(ret.value) && "then" in ret.value)

            // poor man's "is it a promise?" test
            if (isPromise) {
                // wait on the promise
                ret.value.then( iterate, it.throw)
            }
            else {
                // avoid synchronous recursion
                setTimeout( function(){
                    iterate( ret.value );
                }, 0 );
            }
        }
    })();
}

exports.createSource = ({local, remote, success, error, loading, errorHandler={}}) => {
	return (dispatch, getState) => {
		return asyncRunner(function *() {
			let data;
			try {
				if (loading) {
					dispatchAction(dispatch, loading)
				}

				if (local) {
					data = yield local(getState())
				}

				if (data == undefined && remote) {
					data = yield remote(getState());
				}		

				if (data != undefined) {
					return dispatchAction(dispatch, success, data)
				}
			}
			catch (e) {
				if (error == undefined) {
					if (errorHandler) {
						e = errorHandler(e);
					}

					return dispatchAction(dispatch, error, e)
				}
			}	
		})	
	}
}


const dispatchAction = ( dispatch, action, data ) => {
	if (isFunction(action)) {
		return dispatch(action) // action creator
	}

	return dispatch({type: action, payload: data})
}


