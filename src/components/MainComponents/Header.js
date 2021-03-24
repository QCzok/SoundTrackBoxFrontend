import React from 'react';
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../constants/apiConstants';
import axios from 'axios';
import { API_BASE_URL } from '../../constants/apiConstants'
import Cookies from 'universal-cookie';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null | HTMLElement,
            isOpen: false,
        }
        this.onSelection = this.onSelection.bind(this);
        this.myRef = React.createRef();
        this.onAccountDeletion = this.onAccountDeletion.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
    }

    openMenu = (event) => {
        this.setState({ anchorEl: event.currentTarget, isOpen: true });
    };

    closeMenu = () => {
        this.setState({
            anchorEl: null,
            isOpen: false
        })
        if (this.state.isLoggedIn) {
            this.props.history.push('/login');
        }
    }

    onSelection() {
        this.setState({
            anchorEl: null,
            isOpen: false
        })
        if (localStorage.getItem(ACCESS_TOKEN_NAME)) {
            localStorage.removeItem(ACCESS_TOKEN_NAME);
            this.props.history.push('/');
        } else {
            this.props.history.push('/login');
        }
    }

    onAccountDeletion() {
        Promise.resolve(this.deleteUser(this.props.playlistID)).then(() => {
            localStorage.removeItem(ACCESS_TOKEN_NAME);
            const cookies = new Cookies();
            cookies.remove('songName', { path: '/', secure: true });
            cookies.remove('songID', { path: '/', secure: true });
            window.location.reload();
        }
        );
    }

    async deleteUser() {
        return axios.post(API_BASE_URL + '/user/deleteUser', {}, { headers: { "auth-token": localStorage.getItem(ACCESS_TOKEN_NAME) } })
            .catch(function (error) {
                console.log(error);
            })
    }

    render() {
        return (
            <nav id="header" className="navbar text-white bg-dark flex-grow-1">
                        <div className="nav-item dropdown">
                            <a className="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="26" height="26"
                                    fill={localStorage.getItem(ACCESS_TOKEN_NAME) ? "orange" : "currentColor"}
                                    className="bi bi-file-person-fill"
                                    viewBox="0 0 16 16">
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z" />
                                </svg>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" onClick={this.onSelection}>{localStorage.getItem(ACCESS_TOKEN_NAME) ? 'Logout' : 'Login'}</a>
                                <a className={localStorage.getItem(ACCESS_TOKEN_NAME) ? 'dropdown-item' : ''} onClick={this.onAccountDeletion} href="#">{localStorage.getItem(ACCESS_TOKEN_NAME) ? 'Delete account' : ''}</a>
                            </div>
                        </div>
                Sound Track Box
            </nav>
        );
    }
}

export default withRouter(Header);