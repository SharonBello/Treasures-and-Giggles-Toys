import React from "react"
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

export class Login extends React.Component {
    state = {
        credentials: {
            username: '',
            password: '',
            fullname: ''
        },
        isSignup: false,
    }

    clearState = () => {
        const clearTemplate = {
            credentials: {
                username: '',
                password: '',
                fullname: ''
            },
            isSignup: false,
        }
        this.setState({ clearTemplate })
    }

    handleChange = (ev, fieldName) => {
        const value = ev.target.value;
        if (fieldName === 'username') {
            this.setState({ credentials: { ...this.state.credentials, username: value } });
        } else if (fieldName === 'password') {
            this.setState({ credentials: { ...this.state.credentials, password: value } });
        }
    }

    onLogin = (ev = null) => {
        if (!this.state.credentials.username || !this.state.credentials.password) return;
        if (ev) ev.preventDefault();
        this.props.onLogin(this.state.credentials);

        this.clearState()
        this.props.onHandleCloseDialog(ev)
    }

    render() {
        const { username, password } = this.state.credentials;
        const { isSignup } = this.state;
        return (
            <div className="login-page">
                {!isSignup && <form>
                    <TextField
                        label="username"
                        variant="filled"
                        required
                        value={username}
                        onChange={(ev) => this.handleChange(ev, 'username')}
                    />
                    <TextField
                        label="Password"
                        variant="filled"
                        type="password"
                        required
                        value={password}
                        onChange={(ev) => this.handleChange(ev, 'password')}
                    />
                    <div>
                        <Button onClick={this.onLogin} type="submit" variant="contained" color="primary" >
                            SignIn
                        </Button>
                        <Button variant="contained" onClick={this.props.onHandleCloseDialog}>
                            Cancel
                        </Button>
                    </div>
                </form>}
            </div>
        )
    }
}
