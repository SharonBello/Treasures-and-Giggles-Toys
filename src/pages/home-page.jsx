import React from "react"
import { connect } from 'react-redux'


class _HomePage extends React.Component {

    render() {
        return (
            <section> 
                {/* <img className="homepage-container" src="assets/img/toy.jpg" /> */}
            </section >
        )
    }
}


const mapStateToProps = (storeState) => {
    return {
        count: storeState.count
    }
}
export const HomePage = connect(
    mapStateToProps,
)(_HomePage)
