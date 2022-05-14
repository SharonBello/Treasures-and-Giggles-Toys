import { toyService } from "../../services/toy.service.js";
import { showSuccessMsg, showErrorMsg } from '../../services/event-bus.service.js'


export function loadToy() {

    return (dispatch, getState) => {
        const filterBy = getState().toyModule.filterBy
        return toyService.query(filterBy).then((toys) => {
            console.log('toys', toys)
            dispatch({
                type: 'SET_TOYS',
                toys
            })
        })
    }
}


export function removeToy(toyId) {
    return dispatch => {
        return toyService.remove(toyId)
            .then(() => {
                console.log('Deleted Succesfully!');
                dispatch({
                    type: 'REMOVE_TOY',
                    toyId
                })
                showSuccessMsg('Toy removed Succesfully!')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Toy was not removed')
            })
    }
}

export function getById(toyId) {
    return dispatch => {
        return toyService.getById(toyId)
            .then(toy => {
                dispatch({
                    type: 'GET_BY_ID',
                    toy
                })
            })
    }
}

export function saveToy(toy) {
    return dispatch => {
        return toyService.save(toy)
            .then(savedToy => {
                console.log(savedToy)
                dispatch({
                    type: 'SAVE_TOY',
                    toy: savedToy
                })
                showSuccessMsg('Toy saved Succesfully!')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Toy was not saved')
            })
    }
}

export function addToy(toy) {
    return dispatch => {
        return toyService.save(toy)
        .then(savedToy => {
                console.log('add' )
                
                dispatch({
                    type: 'ADD_TOY',
                    toy: savedToy
                })
                showSuccessMsg('Toy added Succesfully!')
            })
            .catch(err => {
                console.error('Error:', err)
                showErrorMsg('Toy was not added')
            })
    }
}



export function setFilter(filterBy) {
    return (dispatch) => {
        return dispatch({
            type: 'SET_FILTERBY',
            filterBy,
        })
    }
}

export function setSelected(selectedOption) {
    return (dispatch) => {
        return dispatch({
            type: 'GET_SELECTED',
            selectedOption
        })
    }
}
