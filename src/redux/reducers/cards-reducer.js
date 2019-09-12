export default function cards(state={}, {type, payload={}}) {
    switch (type) {
        case 'LIST_CARDS':
            return {
                ...state,
                allCards: payload.allCards
            }
        case 'LOCAL_STORAGE':
            return {
                ...state,
                localStorage: payload
            }
    
        default:
            return {...state}
    }
}