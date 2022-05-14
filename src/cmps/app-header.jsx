import React from "react"
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadToy } from '../store/actions/toy.action.js'
import { login, signup, logout } from '../store/actions/user.action.js'
import { LoginSignup } from './login-signup.jsx'
import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Dialog from '@mui/material/Dialog'

import { Search, LogoFull } from "../services/svg.service.js";

class _AppHeader extends React.Component {
    state = {
        searchTerm: '',
        isModalOpen: false
    }

    onHandleChange = ({ target }) => {
        const field = target.name
        let { value } = target
        let { filterBy } = this.props
        if (field === '') value = [target.value]
        filterBy = { ...filterBy, [field]: value }
        this.props.setFilter(filterBy)
    }

    onLogin = (credentials) => {
        this.props.login(credentials)
    }

    onSignup = (credentials) => {
        this.props.signup(credentials)
    }

    onLogout = () => {
        this.props.logout()
    }

    onHandleOpen = () => {
        this.setState({ isModalOpen: true })
    }
    
    onHandleClose = () => {
        this.setState({ isModalOpen: false })
    }

    render() {
        const { user } = this.props
        const { searchTerm } = this.state
        return (
            <header className="main-header">
                <img src="img/carousel.gif" alt="" />

                <section className="main-header-nav">
                    <div>
                        <ul className="main-nav clean-list flex">
                            <li className=" btn-light"><NavLink to="/">Home</NavLink></li>
                            <li className="home-link btn-light"><NavLink to="/toy">Toys</NavLink></li>
                            <li className=" btn-light"><NavLink to="/about">About</NavLink></li>
                        </ul>
                    </div>

                    <div className="sale-offers">Coupon-Code<span>SUM2022</span></div>

                    <div className="lan-search-container">
                        <a href="/" className="lang-switch btn-dark">en</a>
                        <input type="text" className="input-search" placeholder="Search" value={searchTerm} onChange={this.onHandleChange}></input>
                        <button className="main-header-search" ><Search /></button>
                    </div>
                    <button onClick={() => this.onHandleOpen()}><AccountCircleIcon /></button>
                    <Dialog open={this.state.isModalOpen}
                    
                    
                    
                    onClose={this.onHandleClose()}>X</Dialog>
                </section>

                <div className="header-title">
                    <LogoFull />
                    <p>Treasures<br></br><span>&</span><br></br>Giggles</p>
                </div>

                {user && <section className="user-info">
                <button onClick={this.onLogout}>Logout</button></section>}
                {!user && <section className="user-info">
                <LoginSignup onLogin={this.onLogin} onSignup={this.onSignup} />
                </section>}
            </header>
        )
    }
}
const mapStateToProps = (storeState) => {
    return {
        user: storeState.userModule.user,
        toys: storeState.toyModule.toys
    }
}

const mapDispatchToProps = {
    loadToy,
    login,
    signup,
    logout,
}

export const AppHeader = connect(
    mapStateToProps,
    mapDispatchToProps
)(_AppHeader)

