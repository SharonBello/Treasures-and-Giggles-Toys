import React from "react"
import { connect } from 'react-redux'
import {  setFilter } from '../store/actions/toy.action.js'
import MultiSelect from 'react-select'

const options = [
    { value: 'on wheels', label: 'On wheels' },
    { value: 'box game', label: 'Box game' },
    { value: 'art', label: 'Art' },
    { value: 'baby', label: 'Baby' },
    { value: 'doll', label: 'Doll' },
    { value: 'puzzle', label: 'Puzzle' },
    { value: 'outdoor', label: 'Outdoor' },
  ]

export class _ToyFilter extends React.Component{

    render(){
        const { onHandleChange, filterBy, onChangePage, labels, handleChangeLabels } = this.props
         return (
            <div className="toy-filter-container">
            <input name="txt" type="search" placeholder="Search..." value={filterBy.txt} onChange={onHandleChange} />
            <label htmlFor='in-stock'>In stock:</label>
            <select name='inStock' id='by-stock' onChange={onHandleChange}>
                <option value=''>All</option>
                <option value='true'>In stock</option>
                <option value='false'>Out of stock</option>
            </select>
            {/* 
            <label htmlFor="toy-lbl"><h3>Labels:</h3></label>
        <Select isMulti  value={currToyLabels} onChange={this.handleChange} options={options} /> */}

            <label htmlFor='by-sort'>Sort Toys:</label>
            <select name='sortBy' id='by-sort' onChange={onHandleChange}>
                {/* <option value=''>All</option> */}
                <option value='name'>Name</option>
                <option value='price'>Price</option>
                <option value='recent'>Recently Added</option>
            </select>

            < MultiSelect
                        value={labels}
                        closeMenuOnSelect={false}
                        onChange={handleChangeLabels}
                        isMulti
                        name="labels"
                        options={options}
                        className="basic-multi-select"
                        classNamePrefix="select"
                    />

            {/* <select name="labels" onChange={onHandleChange} multiple size={5}>
                {toyService.getLabels().map(label => <option key={label} value={label}>{label}</option>)}
            </select> */}
            <div className="pagings">
                <label htmlFor='by-pageIdx'>Choose Page</label>
                <button onClick={() => onChangePage(-1)}>-</button>

                (<h3 style={{ display: 'inline' }}>
                    -{+(+filterBy.pageIdx + 1)}-
                </h3>
                )
                <button onClick={() => onChangePage(1)}>+</button>
            </div>

        </div>
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
    setFilter, 
}

export const ToyFilter = connect(
    mapStateToProps,
    mapDispatchToProps
)(_ToyFilter)