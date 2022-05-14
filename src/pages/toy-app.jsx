
import React from "react"
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { userService } from "../services/user.service.js"
import { toyService } from "../services/toy.service.js"
import { ToyList } from "../cmps/toy-list.jsx";
import { ToyFilter } from "../cmps/toy-filter.jsx";
import { loadToy, removeToy, setFilter, saveToy } from '../store/actions/toy.action.js'

class _ToyApp extends React.Component {

    state = {
        user: userService.getLoggedinUser(),
        pageSize: 4,
        filter: {
            labels: []
        },
    }
    componentDidMount() {
        this.props.loadToy()
    }

    componentDidUpdate(prevProps) {
        if (JSON.stringify(prevProps.filterBy) !== JSON.stringify(this.props.filterBy)) {
            this.props.loadToy(this.props.filterBy)
        }
    }

    onRemoveToy = (toyId) => {
        this.props.removeToy(toyId)
    }

    pageDown = () => {
        let { filterBy } = this.props
        if (+filterBy.pageIdx < 1) return
        filterBy = { ...filterBy, pageIdx: +filterBy.pageIdx - 1 }
        this.props.setFilter(filterBy)
    }

    pageUp = () => {
        let { toys, filterBy } = this.props
        if (toys.length === 0) return
        filterBy = { ...filterBy, pageIdx: +filterBy.pageIdx + 1 }
        this.props.setFilter(filterBy)
    }

    onChangePage = (diff) => {
        let { filterBy } = this.props
        const numOfPages = toyService.getNumOfPages()
        const pageIdx = +filterBy.pageIdx + diff
        if (pageIdx < 0 || pageIdx >= numOfPages) return
        filterBy = { ...filterBy, pageIdx }
        this.props.setFilter(filterBy)
    }

    onHandleChange = ({ target }) => {
        const field = target.name
        let { value } = target
        let { filterBy } = this.props
        if (field === 'labels') value = [target.value]
        filterBy = { ...filterBy, [field]: value }
        this.props.setFilter(filterBy)
    }


    handleChangeLabels = (labels) => {
        console.log('handleChangeLabels', labels)
        // this.setState((prevState) => ({ toy: {...prevState.toy, 
        //     labels: labels.map(option => option.value)} }))

        this.setState({ filter: { ...this.state.filter, labels } })
        let { filterBy } = this.props
        const labelsToys = this.state.filter.labels.map(label => label.value)
        filterBy = { ...filterBy, labels: labelsToys }
        this.props.setFilter(filterBy)
    }


    render() {
        const { toys, filterBy } = this.props
        const { user } = this.state
        return (
            <section className="app-section">

                <ToyFilter filterBy={filterBy} onHandleChange={this.onHandleChange} onChangePage={this.onChangePage} handleChangeLabels={this.handleChangeLabels} labels={this.state.filter.labels} />
                <Link to="/toy/edit"><button className="toy-btn-add tooltip"><span className="tooltiptext">{(!user) ? 'Need to login' : ''}</span>Add Toy 📋</button></Link>
                {(!toys) ? <h1>Loading</h1> : <ToyList toys={toys} onRemoveToy={this.onRemoveToy} />}

            </section>
        )
    }
}

const mapStateToProps = (storeState) => {
    return {
        toys: storeState.toyModule.toys,
        filterBy: storeState.toyModule.filterBy
    }
}

const mapDispatchToProps = {
    loadToy,
    removeToy,
    setFilter,
    saveToy
}

export const ToyApp = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyApp)


