import React, {Component} from 'react';
import './_login.css';
import {
  GOOGLE_AUTH_URL,
  FACEBOOK_AUTH_URL,
  ACCESS_TOKEN
} from '../../Constants/constant';
import {login} from '../../api/APIUtils';
import {Link, Redirect} from 'react-router-dom'
import fbLogo from '../../img/fb-logo.png';
import googleLogo from '../../img/google-logo.png';
import Alert from 'react-s-alert';

class Login extends Component {
  componentDidMount() {
    // If the OAuth2 login encounters an error, the user is redirected to the /login page with an error.
    // Here we display the error and then remove the error query parameter from the location.
    // if (this.props.location.state !== undefined && this.props.location.state.error) {
    //   setTimeout(() => {
    //     Alert.error(this.props.location.state.error, {
    //       timeout: 5000
    //     });
    //     this.props.history.replace({
    //       pathname: this.props.location.pathname,
    //       state: {}
    //     });
    //   }, 100);
    // }
  }

  render() {

    return (
        <div className="login-container">
          <div className="login-content">
            <h1 className="login-title">Login to Real Estate Social</h1>
            <SocialLogin/>
            <div className="or-separator">
              <span className="or-text">OR</span>
            </div>
            <LoginForm {...this.props} />
            <span className="signup-link" style={{fontSize:'15px'}}>New user?
              <Link to="/signup" style={{fontSize:'15px'}}>Sign up!</Link>
            </span>
          </div>
        </div>
    );
  }
}

class SocialLogin extends Component {
  render() {
    console.log("GOOGLE_AUTH_URL: " +GOOGLE_AUTH_URL);
    console.log("FACEBOOK_AUTH_URL: "+FACEBOOK_AUTH_URL);
    return (
        <div className="social-login">
          <a className="btn btn-block social-btn google"
             style={{fontSize:'16px', fontWeight:'500'}}
             href={GOOGLE_AUTH_URL}>
            <img src={googleLogo} alt="Google"/> Log in with Google</a>
          <a className="btn btn-block social-btn facebook"
             style={{fontSize:'16px', fontWeight:'500'}}
             href={FACEBOOK_AUTH_URL}>
            <img src={fbLogo} alt="Facebook"/> Log in with Facebook</a>
        </div>
    );
  }
}

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const inputName = target.name;
    const inputValue = target.value;

    this.setState({
      [inputName]: inputValue
    });
  }

  handleSubmit(event) {
    event.preventDefault();

    const loginRequest = Object.assign({}, this.state);

    login(loginRequest)
    .then(response => {
      console.log("response login: "+JSON.stringify(response));

      localStorage.setItem(ACCESS_TOKEN, response.accessToken);
      Alert.success("You're successfully logged in!");
      this.props.history.push("/home");
      window.location.reload();
    })
    .catch(error => {
      Alert.error((error && error.message)
          || 'Oops! Something went wrong. Please try again!');
    });
  }

  render() {
    return (
        <form onSubmit={this.handleSubmit}>
          <div className="form-item">
            <input type="email" name="email"
                   style={{fontSize:'16px'}}
                   className="form-control" placeholder="Email"
                   value={this.state.email} onChange={this.handleInputChange}
                   required/>
          </div>
          <div className="form-item">
            <input type="password" name="password"
                   style={{fontSize:'16px', fontWeight:'500'}}
                   className="form-control" placeholder="Password"
                   value={this.state.password} onChange={this.handleInputChange}
                   required/>
          </div>
          <div className="form-item">
            <button type="submit"
                    style={{fontSize:'16px'}}
                    className="btn btn-block btn-primary">Login
            </button>
          </div>
        </form>
    );
  }
}

export default Login
