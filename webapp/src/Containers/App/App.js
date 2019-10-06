import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import AppHeader from '../../Components/Header/AppHeader';
import Home from '../Home/Home';
import Login from '../../Auth/Login/Login';
import Signup from '../../Auth/Signup/Signup';
import Profile from '../../Containers/Profile/Profile';
import OAuth2RedirectHandler from '../../Auth/Oauth2/OAuth2RedirectHandler';
import LoadingIndicator from '../../Components/Loading/LoadingIndicator';
import {getCurrentUser} from '../../api/APIUtils';
import {ACCESS_TOKEN} from '../../Constants/constant';
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import './_app.css';
import Messages from "../Messages/Messages";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      authenticated: false,
      currentUser: null,
      loading: false,
      prevScrollpos: window.pageYOffset,
      renderInputHeader: false,
      renderSearchBox: false,
    };

  }

  handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    this.setState({
      authenticated: false,
      currentUser: null
    });
    Alert.success("You're safely logged out!");
  };

  componentDidMount() {
    this.setState({loading: true});
    getCurrentUser().then(res => {
      this.setState({
        currentUser: res,
        authenticated: true,
        loading: false
      });
    }).catch(() => {
      Alert.warning("Lấy thông tin user thất bại.")
    }).finally(() => {
      this.setState({
        loading: false
      });
    })
    ;

    // window.addEventListener('scroll', this.handleScroll);
  }

  // componentWillUnmount() {
  //   window.removeEventListener('scroll', this.handleScroll);
  // }

  // handleScroll = () => {
  //   let currentScrollPos = window.pageYOffset;
  //   if (currentScrollPos >= 65) {
  //     this.setState({
  //       renderInputHeader: true,
  //     });
  //   } else {
  //     this.setState({
  //       renderInputHeader: false,
  //     });
  //   }
  // };

  render() {
    if (this.state.loading) {
      return <LoadingIndicator/>
    }

    return (
        <div className="app">
          {
            this.state.authenticated === true ?
                <div className="app-top-box sticky-top">
                  <AppHeader authenticated={this.state.authenticated}
                             currentUser={this.state.currentUser}
                             onLogout={this.handleLogout}/>
                </div> : null
          }

          <div className="app-body" id="app-body">

            {/*<div style={{height: '740px', overflow:'auto'}}>*/}
              {
                this.state.authenticated &&
                <Route exact path="/home"
                       name="Home"
                       render={() => <Home
                           authenticated={this.state.authenticated}
                           currentUser={this.state.currentUser}
                       />
                       }
                />
              }
            {/*</div>*/}

            {
              this.state.authenticated &&
              <Route exact path="/message"
                     name="Message"
                     render={() => <Messages
                         authenticated={this.state.authenticated}
                         currentUser={this.state.currentUser}/>
                     }
              />
            }

            {
              this.state.authenticated &&
              <Route exact path="/profile"
                     name="Profile"
                     render={() => <Profile
                         authenticated={this.state.authenticated}
                         currentUser={this.state.currentUser}/>
                     }
              />
            }

            {
              !this.state.authenticated ?
                  <Redirect from="/" to="/login"/> :
                  <Redirect from="/" to="/home"/>
            }

            <Route exact path="/login"
                   render={(props) => <Login
                       authenticated={this.state.authenticated} {...props} />}>
            </Route>
            <Route exact path="/signup"
                   render={(props) => <Signup
                       authenticated={this.state.authenticated} {...props} />}>
            </Route>
            <Route path="/oauth2/redirect"
                   component={OAuth2RedirectHandler}>
            </Route>
          </div>

          <div className="app-footer"></div>
          <Alert stack={{limit: 3}}
                 timeout={3000}
                 position='top-right' effect='slide' offset={65}/>
        </div>
    );
  }
}

export default App;
