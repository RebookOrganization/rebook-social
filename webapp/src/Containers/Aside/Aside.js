import React, {Component} from 'react'
import {Badge, Progress} from "reactstrap";

class Aside extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listUserChat: []
    }
  }

  render() {
    const styleChat = {
      display: 'flex',
      alignItems: 'center',
      padding: '10px 0'
    };

    const dot = {
      height: '7px',
      width: '7px',
      backgroundColor: '#4dbd74',
      borderRadius: '50%',
      display: 'inline-block',
      marginLeft: '60px'
    };

    return (
        <React.Fragment>
          <div style={{
            position: 'fixed',
            padding: '10px',
            height: '100%',
            borderLeft: '1px solid #bbc0c4',
            top: '60px',
            zIndex: '1',
            width: '257px'
          }}
          >
            <div className="text-uppercase mb-1 mt-2">
              <small><b>CPU Usage</b></small>
            </div>
            <Progress className="progress-xs" color="info" value="25"/>
            {/*<small className="text-muted">348 Processes. 1/4 Cores.</small>*/}

            <div className="text-uppercase mb-1 mt-2">
              <small><b>Memory Usage</b></small>
            </div>
            <Progress className="progress-xs" color="warning" value="70"/>
            {/*<small className="text-muted">11444GB/16384MB</small>*/}

            <hr/>
            <div style={styleChat}>
              <a className="btn-user">
                <img
                    src={'icon/default.jpg'}
                    className="rounded-circle icon-user"
                    alt="Username"/>
              </a>{' '}
              <p style={{
                fontSize: '15px',
                marginTop: '15px'
              }}>Lukasz Holeczek</p>
              <span className={"pull-right"} style={dot}/>
            </div>
            <div style={styleChat}>
              <a className="btn-user">
                <img
                    src={'assets/img/avatars/7.jpg'}
                    className="rounded-circle icon-user"
                    alt="Username"/>
              </a>{' '}
              <p style={{
                fontSize: '15px',
                marginTop: '15px'
              }}>Lukasz Holeczek</p>
              <span className={"pull-right"} style={dot}/>
            </div>
            <div style={styleChat}>
              <a className="btn-user">
                <img
                    src={'icon/default.jpg'}
                    className="rounded-circle icon-user"
                    alt="Username"/>
              </a>{' '}
              <p style={{
                fontSize: '15px',
                marginTop: '15px'
              }}>Lukasz Holeczek</p>
              <span className={"pull-right"} style={dot}/>
            </div>
            <div style={styleChat}>
              <a className="btn-user">
                <img
                    src={'assets/img/avatars/7.jpg'}
                    className="rounded-circle icon-user"
                    alt="Username"/>
              </a>{' '}
              <p style={{
                fontSize: '15px',
                marginTop: '15px'
              }}>Lukasz Holeczek</p>
              <span className={"pull-right"} style={dot}/>
            </div>
            <div style={styleChat}>
              <a className="btn-user">
                <img
                    src={'icon/default.jpg'}
                    className="rounded-circle icon-user"
                    alt="Username"/>
              </a>{' '}
              <p style={{
                fontSize: '15px',
                marginTop: '15px'
              }}>Lukasz Holeczek</p>
              <span className={"pull-right"} style={dot}/>
            </div>
            <div style={styleChat}>
              <a className="btn-user">
                <img
                    src={'icon/default.jpg'}
                    className="rounded-circle icon-user"
                    alt="Username"/>
              </a>{' '}
              <p style={{
                fontSize: '15px',
                marginTop: '15px'
              }}>Lukasz Holeczek</p>
              <span className={"pull-right"} style={dot}/>
            </div>

          </div>
          <div className="search" style={{
            position: 'fixed',
            bottom: '0',
            marginLeft: '0',
            width: '257px'
          }}>
            <span className="fa fa-search"/>
            <input style={{borderRadius: '0'}}/>
          </div>
        </React.Fragment>
    );
  }

}

export default Aside;