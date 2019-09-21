import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './_appHeader.css';
import '../../Containers/Home/_home.css';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser ? this.props.currentUser : null,
      isSearch: false
    }
  }

  render() {
    const {currentUser, isSearch} = this.state;

    return (
        <header className="app-header">
          <div className="container-fluid" style={{paddingLeft: "40px"}}>
            <div className="row">
              <div className="col-md-5 app-branding">
                {/*<div className="graf-layout">*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*  <div className="graf-circle"></div>*/}
                {/*</div>*/}
                <img src="/assets/brand/sygnet.svg" style={{
                  width: '40px',
                  height: '40px',
                  marginRight: '20px'
                }}/>
                <Link to="/profile" className="app-title">Rebook</Link>
                <div className="search">
                  <span className="fa fa-search"></span>
                  <input/>
                </div>
              </div>
              <div className="col-md-5 app-options">
                <nav className="app-nav">
                  {this.props.authenticated ? (
                      <ul>
                        <li className="li-profile">
                          <img
                              src={currentUser
                                  ? currentUser.imageUrl
                                  : '/icon/default.jpg'}
                              className="rounded-circle icon-profile"
                              alt="Username"/>
                          <NavLink to="/profile" style={{paddingLeft: "10px"}}>
                            {currentUser ? currentUser.name : "username"}
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/home">Trang chủ</NavLink>
                        </li>
                        <li>
                          <NavLink to="/message">Tin Nhắn</NavLink>
                        </li>
                        <li>
                          <a onClick={this.props.onLogout}
                             style={{color: 'white'}}>Logout</a>
                        </li>
                      </ul>
                  ) : (
                      <ul>
                        <li>
                          <NavLink to="/login">Login</NavLink>
                        </li>
                        <li>
                          <NavLink to="/signup">Signup</NavLink>
                        </li>
                      </ul>
                  )}
                </nav>
              </div>
              <div className="col-md-2">
              </div>
            </div>
          </div>
        </header>
    )
  }
}

export default AppHeader;