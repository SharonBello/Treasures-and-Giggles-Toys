import React from "react"
import { connect } from 'react-redux'
import home_page from "../assets/img/home_page.jpg"


class _HomePage extends React.Component {

    render() {
        return (
            <section> 
                {/* <img className="homepage-container" src="assets/img/toy.jpg" /> */}
                <img src={home_page}></img>
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
