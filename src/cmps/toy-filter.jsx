import { toyService } from "../services/toy.service";
// import Select from 'react-select'

export function ToyFilter({ onHandleChange, filterBy, onChangePage }) {
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

            <select name="labels" onChange={onHandleChange} multiple size={5}>
                {toyService.getLabels().map(label => <option key={label} value={label}>{label}</option>)}
            </select>
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