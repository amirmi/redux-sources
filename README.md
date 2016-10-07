# redux-sources

## What is it?

tl; dr;
Synthetic Sugar for consistently handling Ajax Calls in an async Redux Flow.

1) Dispatching actions when you start loading, when the response came back successfully, and when an error occured.
2) Using a local cache for that request, before initiating it
3) Locally mocking APIs before the actual APIs were even developed.

"Lightly" influenced by the "Data Sources" concept in Alt.js (http://alt.js.org/docs/async/)

## An Example?

```
import {createSource} from "redux-sources"

loadAvatars: () => {
    return createSource({
        local(state) {
            if (isExistsInCache || isLocalDebugMode) {
                return [{"img": "avatar1.jpg", "user_id": "hatul"}, .... }]
            }
            // else returns undefined
        },
        remote(state) {
            return ajax("/api/loadAvatars")
              .then(response => reponse.data)          
        },
        success: ACTION_TYPES.AVATARS_LOADED,
        error: ACTION_TYPES.AVATARS_LOADED_ERROR,
        loading: ACTION_TYPES.AVATARS_LOADING
    }
}
```
    
    
    })


}
