import React, {Component} from 'react';
import {Link, NavLink} from 'react-router-dom';
import './_appHeader.css';
import '../../Containers/Home/_home.css';
import {
  Modal,
  ModalBody,
  ModalHeader, Row, Col
} from "reactstrap";
import LaddaButton, {EXPAND_LEFT} from "react-ladda";
import {searchNewsByAddress, searchNewsByUser} from "../../api/UserApi";
import Alert from "react-s-alert";
import {
  loadEnumArea, loadEnumDirectHouse,
  loadEnumDistrict, loadEnumPrice,
  loadEnumProvince,
  loadEnumRentType, loadEnumSaleType
} from "../../api/SearchFillterApi";
import LoadingIndicator from "../Loading/LoadingIndicator";
import Select from 'react-select';

class AppHeader extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: this.props.currentUser ? this.props.currentUser : null,
      isSearch: false,
      
      inputSearch: '',
      inputSearchType: 0,
      loading: false,
      resultSearchAddress: null,
      resultSearchUser: null,
      allNewsItem: null,

      optionProvince: null,
      selectedProvince: 0,
      optionDistrict: null,
      selectedDistrict: 0,
      optionRentType: null,
      selectedRentType: 0,
      optionSaleType: null,
      selectedSaleType: 0,
      optionPrice: null,
      selectedPrice: 0,
      optionArea: null,
      selectedArea: 0,
      optionDirectHouse: null,
      selectedDirectHouse: 0,
    }
  }

  handleLoadEnum = () => {
    this.setState({loading: true});
    let provinceCity = loadEnumProvince();
    let district = loadEnumDistrict();
    let rentType = loadEnumRentType();
    let saleType = loadEnumSaleType();
    let priceOption = loadEnumPrice();
    let areaOption = loadEnumArea();
    let directHouse = loadEnumDirectHouse();

    Promise.all([provinceCity, district, rentType, saleType,
      priceOption, areaOption, directHouse]).then(res => {
      console.log("res: "+ JSON.stringify(res));
      this.setState({
        optionProvince: res[0],
        optionDistrict: res[1],
        optionRentType: res[2],
        optionSaleType: res[3],
        optionPrice: res[4],
        optionArea: res[5],
        optionDirectHouse: res[6],
      }, ()=> {
        console.log("optionProvince: "+ JSON.stringify(this.state.optionProvince))
      })
    }).catch(e => console.log(e))
    .finally(()=> {
      this.setState({loading: false})
    })
  };

  toggleModalSearch = () => {
    this.setState({
      isSearch: !this.state.isSearch
    }, () => {
      this.state.isSearch ?
          this.handleLoadEnum() : null
    })
  };

  handleSearchByFiler = () => {
    const {inputSearch, inputSearchType} = this.state;
    this.setState({loading: true});

    console.log("input search type: " + inputSearchType);
    if (parseInt(inputSearchType) === 0) {
      Alert.error("Vui lòng chọn loại tìm kiếm.");
      this.setState({loading: false})
    } else if (parseInt(inputSearchType) === 1) {
      let address = inputSearch ? inputSearch : Alert.error(
          "Vui lòng nhập thông tin.");

      console.log("address: " + address);
      if (address !== null || address !== '') {

        //Api SearchByAddress
        searchNewsByAddress(address).then(res => {
          this.setState({
            resultSearchAddress: res.result,
            allNewsItem: res.result,
            loading: false
          }, () => {
            this.props.callBackFromPageRight(this.state.allNewsItem,
                this.state.loading);
          })
        }).catch((e) => {
          console.log(e);
          this.setState({loading: false});
          Alert.warning("Không có kết quả trả về.")
        });
      }
    } else {
      const requestParams = {
        username: inputSearch ? inputSearch : Alert.error(
            "Vui lòng nhập thông tin.")
      };
      console.log("requestParam: " + JSON.stringify(requestParams));

      //Api SearchByUser
      searchNewsByUser(requestParams).then(res => {
        this.setState({
          resultSearchUser: res.result,
        })
      }).catch(err => {
        console.log(err);
        Alert.warning("Không có kết quả trả về.")
      }).finally(() => {
        this.setState({loading: false})
      });
    }
  };

  handleChangeProvince = (optionProvince) => {
    this.setState({optionProvince: optionProvince})
  };

  render() {
    const {currentUser, optionProvince, optionDistrict, selectedDistrict, optionRentType,
      selectedRentType, optionSaleType, selectedSaleType, optionPrice, selectedPrice,
      optionArea, selectedArea, optionDirectHouse, selectedDirectHouse} = this.state;

    const styleChat = {
      display: 'flex',
      alignItems: 'center',
      padding: '0',
      maxHeight:'56px'
    };

    const dot = {
      height: '8px',
      width: '8px',
      backgroundColor: '#4dbd74',
      borderRadius: '50%',
      display: 'inline-block',
      marginLeft: '200px'
    };

    let province = [];
    optionProvince ? Object.keys(optionProvince).map(item => {
      province.push({
        value: item,
        label: optionProvince[item]
      })
    }) : null;

    let district = [];
    optionDistrict ? Object.keys(optionDistrict).map(item => {
      district.push({
        value: item,
        label: optionDistrict[item]
      })
    }) : null;

    let rentType = [];
    optionRentType ? Object.keys(optionRentType).map(item => {
      rentType.push({
        value: item,
        label: optionRentType[item]
      })
    }) : null;

    let saleType = [];
    optionSaleType ? Object.keys(optionSaleType).map(item => {
      saleType.push({
        value: item,
        label: optionSaleType[item]
      })
    }) : null;

    let prices = [];
    optionPrice ? Object.keys(optionPrice).map(item => {
      prices.push({
        value: item,
        label: optionPrice[item]
      })
    }) : null;

    let areas = [];
    optionArea ? Object.keys(optionArea).map(item => {
      areas.push({
        value: item,
        label: optionArea[item]
      })
    }) : null;

    let directHouse = [];
    optionDirectHouse ? Object.keys(optionDirectHouse).map(item => {
      directHouse.push({
        value: item,
        label: optionDirectHouse[item]
      })
    }) : null;

    return (
        <header className="app-header">
          {
            this.state.loading ? <LoadingIndicator/> : null
          }
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
              </div>
              <div className="col-md-5 app-options">
                <nav className="app-nav">
                  {this.props.authenticated ? (
                      <ul>
                        <li className="li-profile">
                          <img
                              src={currentUser && currentUser.imageUrl
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
                          {/*<NavLink to="/message">Tin Nhắn</NavLink>*/}
                          <div className="dropdown message">
                            <button className="btn border-none-outline"
                                    type="button" id="dropdownMenuButton"
                                    data-toggle="dropdown" aria-haspopup="true"
                                    style={{fontSize:'16px', fontWeight:'500',
                                      color:'white'}}
                                    aria-expanded="false">
                              {/*<img src="/icon/menu-5.svg" style={{width:'23px',height:'23px'}} alt={""}/>*/}
                              Tin Nhắn
                            </button>
                            <div className="dropdown-menu dropdown-menu-center">
                              <a className="dropdown-item">
                                <div style={styleChat}>
                                  <a className="btn-user">
                                    <img src={'assets/img/avatars/4.jpg'}
                                        className="rounded-circle icon-user"
                                        alt="Username"/>
                                  </a>{' '}
                                  <p style={{fontSize: '15px', marginTop: '15px'}}>user chat</p>
                                  <span className={"pull-right"} style={dot}/>
                                </div>
                              </a>
                              <a className="dropdown-item">
                                <div style={styleChat}>
                                  <a className="btn-user">
                                    <img src={'assets/img/avatars/4.jpg'}
                                         className="rounded-circle icon-user"
                                         alt="Username"/>
                                  </a>{' '}
                                  <p style={{fontSize: '15px', marginTop: '15px'}}>user chat</p>
                                  <span className={"pull-right"} style={dot}/>
                                </div>
                              </a>
                              <a className="dropdown-item">
                                <div style={styleChat}>
                                  <a className="btn-user">
                                    <img src={'assets/img/avatars/4.jpg'}
                                         className="rounded-circle icon-user"
                                         alt="Username"/>
                                  </a>{' '}
                                  <p style={{fontSize: '15px', marginTop: '15px'}}>user chat</p>
                                  <span className={"pull-right"} style={dot}/>
                                </div>
                              </a>
                              <a className="dropdown-item">
                                <div style={styleChat}>
                                  <a className="btn-user">
                                    <img src={'assets/img/avatars/4.jpg'}
                                         className="rounded-circle icon-user"
                                         alt="Username"/>
                                  </a>{' '}
                                  <p style={{fontSize: '15px', marginTop: '15px'}}>user chat</p>
                                  <span className={"pull-right"} style={dot}/>
                                </div>
                              </a>
                              <a className="dropdown-item">
                                <i className="far fa-save"/> Lưu bài viết
                              </a>
                              <a className="dropdown-item">
                                <i className="far fa-flag"/> Gửi phản hồi
                              </a>
                            </div>
                          </div>
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
                 style={{maxWidth: '90%'}}
          >
            <ModalHeader toggle={()=>this.toggleModalSearch()}>
              <img src="/icon/icons8-search-2.png" alt={""}/> Tìm kiếm thông tin bất động sản
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
                  <Col md={6}>
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
                <Row>
                  <Col md={6}>
                    <h5>Giá: </h5>
                    <Select value={selectedPrice}
                            onChange={(e)=> this.setState({selectedPrice: e})}
                            options={prices}
                            isSearchable={true}
                            isClearable={true}
                    />
                  </Col>
                  <Col md={6}>
                    <h5>Tỉnh/Thành phố</h5>
                    <Select value={this.state.selectedProvince}
                            onChange={(e)=> this.setState({selectedProvince: e})}
                            options={province}
                            isSearchable={true}
                            isClearable={true}
                            style={{fontSize:'16px'}}
                    />
                  </Col>
                </Row>
                <hr/>
              <Row>
                <Col md={6}>
                  <h5>Mua bán: </h5>
                  <Select value={selectedSaleType}
                          onChange={(e)=> this.setState({selectedSaleType: e})}
                          options={saleType}
                          isSearchable={true}
                          isClearable={true}
                  />
                </Col>
                <Col md={6}>
                  <h5>Cho thuê: </h5>
                  <Select value={selectedRentType}
                          onChange={(e)=> this.setState({selectedRentType: e})}
                          options={rentType}
                          isSearchable={true}
                          isClearable={true}
                  />
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col md={6}>
                  <h5>Diện tích: </h5>
                  <Select value={selectedArea}
                          onChange={(e)=> this.setState({selectedArea: e})}
                          options={areas}
                          isSearchable={true}
                          isClearable={true}
                  />
                </Col>
                <Col md={6}>
                  <h5>Hướng nhà: </h5>
                  <Select value={selectedDirectHouse}
                          onChange={(e)=> this.setState({selectedDirectHouse: e})}
                          options={directHouse}
                          isSearchable={true}
                          isClearable={true}
                  />
                </Col>
              </Row>
              <hr/>
              <Row>
                <Col md={6}>
                  <h5>Quận/Huyện: </h5>
                  <Select value={selectedDistrict}
                          onChange={(e)=> this.setState({selectedDistrict: e})}
                          options={district}
                          isSearchable={true}
                          isClearable={true}
                  />
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