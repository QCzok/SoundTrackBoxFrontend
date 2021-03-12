import React from 'react';
import './Header.css'
import { withRouter } from "react-router-dom";
import { ACCESS_TOKEN_NAME } from '../../../constants/apiConstants';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            anchorEl: null | HTMLElement,
            isOpen: false,
        }
        this.onSelection = this.onSelection.bind(this);
        this.myRef = React.createRef();
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

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul className="navbar-nav">
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle"
                                href="#"
                                id="navbarDropdownMenuLink"
                                data-toggle="dropdown"
                                aria-haspopup="true"
                                aria-expanded="false">
                                <svg xmlns="http://www.w3.org/2000/svg"
                                    width="36" height="36"
                                    fill={localStorage.getItem(ACCESS_TOKEN_NAME) ? "orange" : "currentColor"}
                                    className="bi bi-file-person-fill"
                                    viewBox="0 0 16 16">
                                    <path d="M12 0H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm-1 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0zm-3 4c2.623 0 4.146.826 5 1.755V14a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1v-1.245C3.854 11.825 5.377 11 8 11z" />
                                </svg>
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                <a className="dropdown-item" onClick={this.onSelection}>{localStorage.getItem(ACCESS_TOKEN_NAME) ? 'Logout' : 'Login'}</a>
                                <a className="dropdown-item" href="#">Delete Account</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <p id="app-name">Sound Track Box</p>
            </nav>
        );
    }
}

export default withRouter(Header);