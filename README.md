# redux-sources

## What is it?

tl; dr;
Synthetic Sugar for consistently handling Ajax Calls in an async Redux Flow.

For people using redux, working with ajax requests to server, usually have something to do with the following:

1. Dispatching actions when you start loading, when the response came back successfully, and when an error occured.
2. Using a local cache for that request, before initiating it
3. Locally mocking APIs before the actual APIs were even developed.

*redux-sources* enables you to define your API calls in a more structured and consistent way. 

"Lightly" influenced by the "Data Sources" concept in Alt.js (http://alt.js.org/docs/async/)

## An Example?

Below is an action creator that returns the "source" as a thunk (https://github.com/gaearon/redux-thunk)
Upon dispatching this action creator
```
reduxStore.dispatch(loadAvatars({...}))
```

your redux store will start recieving actions based on the configuration supplied.

```
import {createSource} from "redux-sources"

loadAvatars: ( params ) => {
    return createSource({
        local(state) {
            if (isExistsInCache || isLocalDebugMode) {
                return [{"img": "avatar1.jpg", "user_id": "hatul"}, .... }]
            }
            // else returns undefined
        },
        remote(state) {
            return ajax("/api/loadAvatars", params)
              .then(response => reponse.data)          
        },
        success: ACTION_TYPES.AVATARS_LOADED,
        error: ACTION_TYPES.AVATARS_LOADED_ERROR,
        loading: ACTION_TYPES.AVATARS_LOADING
    })
}
```

