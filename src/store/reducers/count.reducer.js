export function countReducer(state = {count: 10000}, action = {}) {
    switch (action.type) {
        case 'INC':
            return {...state, count: state.count+1}
        default:
            return state
    }
}