import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './_appHeader.css';
import '../../Containers/Home/_home.css';
import {
  Button,
  Collapse,
  Input,
  InputGroup, InputGroupAddon,
  Modal,
  ModalBody,
  ModalHeader
} from "reactstrap";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import LaddaButton, {EXPAND_LEFT} from "react-ladda";

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser ? this.props.currentUser : null,
      isSearch: false
    }
  }

  toggleModalSearch = () => {
    this.setState({
      isSearch: !this.state.isSearch
    })
  };

  render() {
    const {currentUser} = this.state;

    return (
        <header className="app-header">
          <div className="container-fluid" style={{paddingLeft: "40px"}}>
            <div className="row">
              <div className="col-md-5 app-branding">
                <img src="/assets/brand/sygnet.svg" style={{
                  width: '40px',
                  height: '40px',
                  marginRight: '20px'
                }}/>
                <Link to="/profile" className="app-title">Rebook</Link>
                <div className="input-group input-group-sm"
                     style={{marginLeft:'20px', width:'350px'}}
                >
                  <input type="text" className="form-control"
                         placeholder="Tìm kiếm"
                         style={{fontSize:'14px'}}
                         onClick={this.toggleModalSearch}
                         aria-label="Tìm kiếm"
                         aria-describedby="basic-addon2"/>
                    <div className="input-group-append">
                      <span className="input-group-text"
                            style={{width:'50px'}}
                            id="basic-addon2">
                        <span className="fa fa-search" style={{color:'gray',marginLeft:'10px'}}/>
                      </span>
                    </div>
                </div>
                {/*<div className="search">*/}
                {/*  <span className="fa fa-search" style={{color:'gray'}}/>*/}
                {/*  <input onClick={this.toggleModalSearch}/>*/}
                {/*</div>*/}
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

          <Modal isOpen={this.state.isSearch}
                 toggle={()=>this.toggleModalSearch()}
                 className={'modal-lg modal-lg-custom' + this.props.className}
          >
            <ModalHeader toggle={()=>this.toggleModalSearch()}>
              <img src="/icon/icons8-search-2.png"/> Tìm kiếm thông tin bất động sản
            </ModalHeader>
            <ModalBody style={{padding:'15px'}}>
              <div className="search-box" style={{marginBottom:"5px"}}>
                <span className="fa fa-search"/>
                <input id="inputSearch"
                       placeholder="Nội dung tìm kiếm"
                       onClick={this.toggleCollapse}
                       style={{textIdent:'32px',backgroundColor: '#f2f3f5',outline:'none'}}
                       value={this.state.inputSearch}
                       onChange={(e) => this.setState(
                           {inputSearch: e.target.value})}
                />
              </div>
              <hr/>
                <Row>
                  <Col md={6} style={{paddingRight:'5px'}}>
                    <h5>Loại tìm kiếm</h5>
                    <select className="form-control"
                            style={{height: '40px',fontSize:'16px',backgroundColor: '#f2f3f5',marginBottom:"5px"}}
                            onChange={(e) => this.setState(
                                {inputSearchType: e.target.value})}
                    >
                      <option value={0}>Chọn loại tìm kiếm</option>
                      <option value={1}>Địa điểm bất động sản</option>
                      <option value={2}>Loại giao dịch</option>
                      <option value={3}>Người dùng rebook</option>
                    </select>
                  </Col>
                  <Col md={6} style={{paddingLeft:'5px'}}>
                    <h5>Tỉnh/Thành phố</h5>
                    <select className="form-control"
                            style={{height: '40px',fontSize:'16px',backgroundColor: '#f2f3f5',marginBottom:"5px"}}
                            onChange={(e) => this.setState({province: e.target.value})}
                    >
                      <option value={1}>Tp. Hố chí Minh</option>
                      <option value={2}>Hà Nội</option>
                    </select>
                  </Col>
                </Row>
                <hr/>
                <Row>
                  <Col md={6}>
                    <h5>Giá: </h5>
                    <select className="form-control"
                            style={{height: '40px',fontSize:'16px',backgroundColor: '#f2f3f5',marginBottom:"5px"}}
                    >
                      <option>Mua bán</option>
                      <option>Cho thuê</option>
                      <option>Kho bãi</option>
                    </select>
                  </Col>
                  <Col md={6}>
                    <h5>Loại bất động sản: </h5>
                    <select className="form-control"
                            style={{height: '40px',fontSize:'16px',backgroundColor: '#f2f3f5',marginBottom:"5px"}}
                    >
                      <option>Mua bán</option>
                      <option>Cho thuê</option>
                      <option>Kho bãi</option>
                    </select>
                  </Col>
                </Row>
                <hr/>
                <Row style={{padding:'0 15px',justifyContent:'flex-end'}}>
                  <LaddaButton
                      className="btn btn-info btn-ladda"
                      loading={this.state.loading}
                      onClick={() => this.handleSearchByFiler()}
                      data-style={EXPAND_LEFT}
                      style={{backgroundColor: '#008FE5', color: 'white',border:'none',height:'40px',lineHeight:'0'}}>
                    <i className="fas fa-search"/> Tìm kiếm
                  </LaddaButton>
                </Row>
            </ModalBody>
          </Modal>
        </header>
    )
  }
}

export default AppHeader;