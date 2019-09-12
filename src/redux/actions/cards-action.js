import axios from 'axios';

export const getCards = () => {
    return async dispatch => {
        await axios.get('http://static.pushe.co/challenge/json')
        .then(data => {
                return dispatch({
                    type: 'LIST_CARDS',
                    payload: {
                        allCards: data.data.cards
                    }
                })
            }
        ).catch(error => {
            console.log(error)
        })
    }
}

export const getLocalStorage = () => {
    const localStorage = window.localStorage;
    return {
        type: 'LOCAL_STORAGE',
        payload: localStorage
    }
}
export const saveToLocalStorage = (key, value) => {
    window.localStorage.setItem(key, value);
    return {
        type: 'ADD_TO_LOCALSTORAGE',
        value,
        key
    }
}
