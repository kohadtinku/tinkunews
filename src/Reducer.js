const reducer = (state, action) => {
    switch (action.type) {

        case "SET_LOADING":
            return {
                ...state,
                isLoading: true
            }


        case "GET_STORIES":
            return {
                ...state,
                isLoading: false,
                hits: action.payload.hits,
                nbPages: action.payload.nbPages,
            }

        case "REMOVE_POST":
            return {
                ...state,
                // isLoading: false,
                hits: state.hits.filter((curElem) => curElem.objectID !== action.payload),
                // nbPages:action.payload.nbPages,
            }

        case "SEARCH_QUERY":
            return {
                ...state,
                query: action.payload
            }
        case "NEXT_PAGE":
            let pageNumINC = state.page + 1
            if (pageNumINC >= state.nbPages) {
                pageNumINC = 0
            }

            return {
                ...state,
                page: pageNumINC
            }
        case "PREV_PAGE":
            let pageNUM = state.page - 1

            if (pageNUM <= 0) {
                pageNUM = 0
            }
            return {
                ...state,
                page: pageNUM
            }



        default:
            break;
    }
    return state;
}
export default reducer