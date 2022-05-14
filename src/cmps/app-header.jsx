import React from "react"
import { NavLink } from 'react-router-dom'
import { connect } from 'react-redux'
import { loadToy } from '../store/actions/toy.action.js'
import { login, signup, logout } from '../store/actions/user.action.js'
import { Login } from './login.jsx'
import { Signup } from './signup.jsx'
import { UserMsg } from './user-msg.jsx'

import AccountCircleIcon from '@mui/icons-material/AccountCircle'
import Dialog from '@mui/material/Dialog'
import LogoutIcon from '@mui/icons-material/Logout';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


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

    handleOpenDialog = () => {
        this.setState({ isModalOpen: true })
    }

    onHandleCloseDialog = (ev) => {
        ev.preventDefault()
        this.setState({ isModalOpen: false })
    }

    renderLoginModal = () => {
        if (this.state.isModalOpen) {
            return (
                <Dialog onClose={this.onHandleCloseDialog} open={true} >{this.renderLogin()}</Dialog>
            )
        }
    }

    renderLogin = () => {
        return (
            <Login onLogin={this.onLogin} onHandleCloseDialog={this.onHandleCloseDialog} handleOpenDialog={this.handleOpenDialog} isModalOpen={this.state.isModalOpen} />
        )
    }

    renderSignupModal = () => {
        if (this.state.isModalOpen) {
            return (
                <Dialog onClose={this.onHandleCloseDialog} open={true} >{this.renderSignup}</Dialog>
            )
        }
    }

    renderSignup = () => {
        return (
            <Signup onSignup={this.onSignup} onHandleCloseDialog={this.onHandleCloseDialog} handleOpenDialog={this.handleOpenDialog} isModalOpen={this.state.isModalOpen} />
        )
    }

    render() {
        const { user } = this.props
        const { searchTerm } = this.state
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
                        <button onClick={() => this.handleOpenDialog()}><AccountCircleIcon /></button>
                        {this.renderLoginModal()}
                        {this.renderLogin()}
                    </div>
                    <div className="signup-btn-container">
                        <button onClick={() => this.handleOpenDialog()}>
                            <FontAwesomeIcon baseClassName="fas" className="fa-user-plus" /></button>
                        {this.renderSignupModal()}
                        {this.renderSignup()}
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

