import React, {Component} from 'react'
import {Progress} from "reactstrap";

class Aside extends Component{
  constructor(props) {
    super(props);

  }

  render() {
    return (
        <div style={{position:'fixed', padding:'10px', height:'100%',
          borderLeft:'1px solid #bbc0c4', top:'60px', zIndex:'1'}}
        >
          <div className="message">
            <div className="py-3 pb-5 mr-3 float-left">
              <div className="avatar">
                <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                <span className="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Lukasz Holeczek</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt...
            </small>
          </div>
          <hr />
          <div className="message">
            <div className="py-3 pb-5 mr-3 float-left">
              <div className="avatar">
                <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                <span className="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Lukasz Holeczek</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt...
            </small>
          </div>
          <hr />
          <div className="message">
            <div className="py-3 pb-5 mr-3 float-left">
              <div className="avatar">
                <img src={'assets/img/avatars/7.jpg'} className="img-avatar" alt="admin@bootstrapmaster.com" />
                <span className="avatar-status badge-success"></span>
              </div>
            </div>
            <div>
              <small className="text-muted">Lukasz Holeczek</small>
              <small className="text-muted float-right mt-1">1:52 PM</small>
            </div>
            <div className="text-truncate font-weight-bold">Lorem ipsum dolor sit amet</div>
            <small className="text-muted">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
              tempor incididunt...
            </small>
          </div>
          <hr />
          <h6>System Utilization</h6>

          <div className="text-uppercase mb-1 mt-4">
            <small><b>CPU Usage</b></small>
          </div>
          <Progress className="progress-xs" color="info" value="25" />
          <small className="text-muted">348 Processes. 1/4 Cores.</small>

          <div className="text-uppercase mb-1 mt-2">
            <small><b>Memory Usage</b></small>
          </div>
          <Progress className="progress-xs" color="warning" value="70" />
          <small className="text-muted">11444GB/16384MB</small>

          <div className="text-uppercase mb-1 mt-2">
            <small><b>SSD 1 Usage</b></small>
          </div>
          <Progress className="progress-xs" color="danger" value="95" />
          <small className="text-muted">243GB/256GB</small>

          <div className="text-uppercase mb-1 mt-2">
            <small><b>SSD 2 Usage</b></small>
          </div>
          <Progress className="progress-xs" color="success" value="10" />
          <small className="text-muted">25GB/256GB</small>
        </div>
    );
  }

}

export default Aside;