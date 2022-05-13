import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { toyService } from "../services/toy.service.js"
import { userService } from "../services/user.service.js"
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'

import { removeToy, getById } from "../store/actions/toy.action.js"
// import {addActivity} from "../store/actions/user.action.js"
import React from "react"


class _ToyDetails extends React.Component {

    state = {
        toy: null
    }

    componentDidMount() {
        const { toyId } = this.props.match.params
        if (toyId) this.props.getById(toyId)
    }

    onRemoveToy = (toyId) => {
        this.props.removeToy(toyId)
        // this.props.addActivity({ txt: 'Removed a Toy', at: Date.now() })
        this.onGoBack()

    }

    onGoBack = () => {
        this.props.history.push('/toy')
    }


    render() {
        const { toy } = this.props
        if (!toy) return <div>Loading toy...</div>
        return (
            <section className='toy-details'>
                <h3>Details</h3>
                <h4>{toy.name}</h4>
                <p>In stock: <span>{(toy.inStock) ? 'Yes' : 'No'}</span></p>
                <p>Price: <span>{toy.price}</span></p>
                <p>Labels: <span key={toy.labels.map((label, idx) => idx)}>{toy.labels.map((label, idx) => {
                    return (idx === toy.labels.length - 1) ? label.value : label + ', '
                })}</span></p>
                <p>Reviews: <span>{toy.review}</span></p>
                <div>
                    <button onClick={() => this.onRemoveToy(toy._id)}>x</button>
                    <Link to={`/toy/edit/${toy._id}`}><button>Edit</button></Link>
                    <button onClick={this.onGoBack}>back</button>
                </div>
            </section>
        )
    }

}


const mapStateToProps = (storeState) => {
    return {
        user: storeState.userModule.user,
        toys: storeState.toyModule.toys,
        toy: storeState.toyModule.toy
    }
}

const mapDispatchToProps = {
    removeToy,
    // addActivity,
    getById,
}

export const ToyDetails = connect(mapStateToProps, mapDispatchToProps
)(_ToyDetails)
