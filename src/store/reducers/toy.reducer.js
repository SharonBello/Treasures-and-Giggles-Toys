

const initialState = {
    toy: null,
    toys: [],
    filterBy: {
        txt: '',
        inStock: '',
        labels: [],
        pageIdx: 0,
        sortBy: null
    }
}

export function toyReducer(state = initialState, action) {
    var toys

    switch (action.type) {
        case 'SET_TOYS':
            return { ...state, toys: action.toys }
        case 'ADD_TOY':
            toys = [action.toy, ...state.toys]
            console.log('1')
            return { ...state, toys }
        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        case 'SAVE_TOY':
            toys = state.toys.map(currToy =>
                (currToy._id === action.toy._id) ? action.toy : currToy)
            console.log('reducerToy',action.toy)
            return { ...state, toys }
        case 'SET_FILTERBY':
            return { ...state, filterBy: action.filterBy }
        case 'GET_BY_ID':
                console.log('toy reducer', action.toy)
                return {...state, toy: action.toy}
        default:
            return state
    }
}
