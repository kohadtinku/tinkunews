//context creation
// provider
//consumer remove
//useContext Hook
import React, { useReducer } from "react";
import { useContext, useEffect } from "react"
import reducer from "./Reducer";

let API = "http://hn.algolia.com/api/v1/search?";

const initialState = {
    isLoading: true,
    query: "",
    nbPages: 0,
    page: 0,
    hits: []
}


const AppContext = React.createContext();
//creste provider functon
const AppProvider = ({ children }) => {
    //use Reducer hook

    // const [state, setstate] = useState(second)

    const [state, dispatch] = useReducer(reducer, initialState)


    const fetchApiData = async (url) => {
        dispatch({ type: "SET_LOADING" })
        try {
            const res = await fetch(url)
            const data = await res.json();
            console.log(data);
            dispatch({
                type: "GET_STORIES",
                payload: {
                    hits: data.hits,
                    nbPages: data.nbPages
                }
            })

        } catch (error) {
            console.log(error);

        }

    }


    // to remove post
    const removePost = (objectID) => {
        dispatch({
            type: "REMOVE_POST",
            payload: objectID
        })
    }

    //to search key 
    const searchPost = (searchquery) => {
        dispatch({
            type: "SEARCH_QUERY",
            payload: searchquery
        })
    }

    //Pagination
    const getPrevPage = () => {
        dispatch({
            type: "PREV_PAGE",
            // payload: searchquery
        })
    }
    const getNextPage = () => {

        dispatch({
            type: "NEXT_PAGE",
            // payload: searchquery
        })
    }


    useEffect(() => {
        fetchApiData(`${API}query=${state.query}&page=${state.page} `)

    }, [state.query, state.page])


    return (

        <AppContext.Provider value={{ ...state, removePost, searchPost, getNextPage, getPrevPage }}>{children}</AppContext.Provider>
    )
}

//custome hook cretion
const useGlobalContext = () => {
    return (
        useContext(AppContext)
    )
}
export { AppContext, AppProvider, useGlobalContext }