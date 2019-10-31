import React, {Component} from 'react';
import {Route, Redirect, Switch} from 'react-router-dom';
import AppHeader from '../../components/Header/AppHeader';
import Home from '../Home/Home';
import Profile from '../Profile/Profile';
import LoadingIndicator from '../../components/Loading/LoadingIndicator';
import {getCurrentUser} from '../../api/userCallApi';
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
    };

  }

  componentDidMount() {
    this.setState({loading: true});
    getCurrentUser().then(res => {
      this.setState({
        currentUser: res.data,
        authenticated: true
      });
    }).catch(() => {
      Alert.warning("Lấy thông tin user thất bại.")
    }).finally(() => {
      this.setState({
        loading: false
      });
    });

  }

  render() {
    if (this.state.loading) {
      return <LoadingIndicator/>
    }

    return (
        <div className="app">
          <div className="app-top-box sticky-top">
            <AppHeader authenticated={this.state.authenticated}
                       currentUser={this.state.currentUser}/>
          </div>
          <div className="app-body" id="app-body">
            <Switch>
              <Route exact path={"/"} render={()=> (
                  <Redirect to={"/home"}/>
              )}/>
              <Route exact path="/home"
                     name="Home"
                     render={() => <Home
                         authenticated={this.state.authenticated}
                         currentUser={this.state.currentUser}
                     />
                     }
              />
              <Route exact path="/message" name="Message"
                     render={() => <Messages
                         authenticated={this.state.authenticated}
                         currentUser={this.state.currentUser}/>
                     }
              />
              <Route exact path="/profile" name="Profile"
                     render={() => <Profile
                         authenticated={this.state.authenticated}
                         currentUser={this.state.currentUser}/>
                     }
              />
            </Switch>
          </div>
          <div className="app-footer"/>
          <Alert stack={{limit: 3}}
                 timeout={3000}
                 position='top-right' effect='slide' offset={65}/>
        </div>
    );
  }
}

export default App;
