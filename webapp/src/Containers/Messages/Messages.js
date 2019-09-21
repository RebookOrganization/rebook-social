import React, {Component} from 'react';

class Messages extends Component{
  constructor(props) {
    super(props);

    this.state = {
      authenticated: this.props.authenticated ? this.props.authenticated : false,
      currentUser: this.props.currentUser ? this.props.currentUser : null,
    }
  }

  render() {
    const {authenticated, currentUser} = this.state;
    console.log("authenticated, currentUser: "+authenticated+", "+JSON.stringify(currentUser));
    return (
        <div>

        </div>
    );
  }
}
export default Messages;