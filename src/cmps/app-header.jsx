import React, { Component } from "react";
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadToy } from '../store/actions/toy.action.js'
import { login, signup, logout } from '../store/actions/user.action.js'
// import { Login } from './login.jsx'
// import { Signup } from './signup.jsx'
import { LoginSignup } from './login-signup.jsx'

import { UserMsg } from './user-msg.jsx'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Dialog from '@mui/material/Dialog'
import LogoutIcon from '@mui/icons-material/Logout';

import { Search, LogoFull } from "../services/svg.service.js";

class _AppHeader extends React.Component {
    state = {
        searchTerm: '',
        isModalOpen: false,
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

    onOpenModal = () => {
        this.setState({ isModalOpen: true }, () => {
            console.log('onOpenModal - isModalOpen', this.state.isModalOpen)
        })
    }
    
    onCloseModal = (ev) => {
        ev.preventDefault()
        this.setState({ isModalOpen: false })
    }
    
    render() {
        const { searchTerm, isModalOpen } = this.state
        const { user } = this.props
        return (
            <header className="main-header">
                <img className="toy-img-header" src="img/carousel.gif" alt="" />
                <UserMsg />

                <section className="main-header-nav">
                    <div>
                        <ul className="main-nav clean-list flex">
                            <li className="home-link btn-light"><NavLink to="/">Home</NavLink></li>
                            <li className="btn-light"><NavLink to="/toy">Toys</NavLink></li>
                            <li className=" btn-light"><NavLink to="/about">About</NavLink></li>
                        </ul>
                    </div>

                    <div className="sale-offers">Coupon-Code<span>SUM2022</span></div>

                    <div className="lan-search-container">
                        <a href="/" className="lang-switch btn-dark">en</a>
                        <input type="text" className="input-search" placeholder="Search" value={searchTerm} onChange={this.onHandleChange}></input>
                        <button className="main-header-search" ><Search /></button>
                    </div>

                    <div className="login-btn-container">
                        <button onClick={() => this.onOpenModal()}><AccountCircleIcon /></button>
                        {isModalOpen && <Dialog onCloseModal={this.onCloseModal} open={true} >
                        {!user && <LoginSignup onLogin={this.onLogin} onSignup={this.onSignup} onCloseModal={this.onCloseModal}/>}</Dialog>} 
                    </div>

                    <div className="signup-btn-container">
                        <button>
                        <i className="fa-solid fa-user-plus"></i></button>
                        {/* {this.renderSignupModal()}
                        {this.renderSignup()} */}
                    </div>
                    <div className="logout-btn-container">
                        <button className="user-logout" onClick={() => this.onLogout()}><LogoutIcon /></button>                        
                    </div>
                </section>
                <i className="fa-solid fa-user-plus"></i>
                <div className="header-title">
                    <LogoFull />
                    <p>Treasures<br></br><span>&</span><br></br>Giggles</p>
                </div>

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

