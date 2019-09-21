import React, {Component} from 'react';
import '../Home/_home.css';
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText, Collapse
} from "reactstrap";
import Row from "reactstrap/es/Row";
import Col from "reactstrap/es/Col";
import CardHeader from "reactstrap/es/CardHeader";
import Alert from "react-s-alert";
import {searchNewsByAddress, searchNewsByUser} from "../../api/UserApi";
import LaddaButton, {EXPAND_LEFT} from "react-ladda";
import 'ladda/dist/ladda-themeless.min.css';
import {SocialIcon} from "react-social-icons";

class PageRight extends Component{
  constructor(props) {
    super(props);

    this.state = {
      inputSearch: '',
      inputSearchType: 0,
      loading: false,
      resultSearchAddress: null,
      resultSearchUser: null,
      allNewsItem: null,

      collapseSearch: false,
    }
  }

  toggleCollapse = () => {
    this.setState({collapseSearch: !this.state.collapseSearch})
  };

  componentDidMount() {

  }

  handleSearchByFiler = () => {
    const {inputSearch, inputSearchType} = this.state;
    this.setState({loading: true});

    console.log("input search type: "+inputSearchType);
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
          }, ()=>{
            this.props.callBackFromPageRight(this.state.allNewsItem, this.state.loading);
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
      }).finally(()=> {
        this.setState({loading: false})
      });
    }
  };

  render() {
    const {loading} = this.state;
    return (
        <div className="sticky-top sticky-offset" style={{top:'60px'}}>
          <Card>
            <CardHeader onClick={this.toggleCollapse}>
              <strong style={{color: '#4b4f56'}}>
                <img src="/icon/zoom.svg"/> Tìm kiếm chọn lọc
              </strong>
            </CardHeader>

              <div style={{padding:'15px'}}>
                <div className="search-box" style={{marginBottom:"5px"}}>
                  <span className="fa fa-search"></span>
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
                <Collapse isOpen={this.state.collapseSearch}>
                <Row>
                  <Col md={6} style={{paddingRight:'5px'}}>
                    <select className="form-control"
                            style={{height: '40px',fontSize:'16px',backgroundColor: '#f2f3f5',marginBottom:"5px"}}
                            onChange={(e) => this.setState({province: e.target.value})}
                    >
                      <option value={0}>Tỉnh/Thành phố</option>
                      <option value={1}>Tp. Hố chí Minh</option>
                      <option value={2}>Hà Nội</option>
                    </select>
                  </Col>
                  <Col md={6} style={{paddingLeft:'5px'}}>
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
                </Row>
                <hr/>
                <Row style={{padding:'0 15px',justifyContent:'flex-end'}}>
                  <LaddaButton
                      className="btn btn-info btn-ladda"
                      loading={this.state.loading}
                      onClick={() => this.handleSearchByFiler()}
                      data-style={EXPAND_LEFT}
                      style={{backgroundColor: '#008FE5', color: 'white',border:'none',height:'40px',lineHeight:'0'}}>
                    <i className="fas fa-search"></i> Search
                  </LaddaButton>
                </Row>
                </Collapse>
              </div>
          </Card>
          <Card>
            <CardBody>
              <strong style={{color:'#4b4f56'}}>Bất động sản được gợi ý</strong>
            </CardBody>
            <CardImg top width="100%"
                     src="https://www.ngoisaoso.vn/uploads/news/2014/02/19/thiet-ke-web-bat-dong-san-2.jpg"
                     alt="Card image cap"/>
            <CardBody>
              <CardText>With supporting text below as a natural lead-in to
                additional content.</CardText>
              <Button className="btn-detail">Chi tiết</Button>
            </CardBody>
          </Card>
          <Card style={{display:'flex',flexDirection:'row',padding:'10px'}}>
            <CardText style={{marginRight:'20px'}}>Tiếng Việt.</CardText>
            <CardText style={{marginRight:'20px'}}>English.</CardText>
          </Card>
          <div style={{display: 'flex'}}>
            <a href="https://mdbootstrap.com/education/bootstrap/" style={{color: '#616770', marginRight: '10px'}}>Điều khoản.</a>
            <a href="https://mdbootstrap.com/education/bootstrap/" style={{color: '#616770'}}>Quảng cáo.</a>
          </div>
          <span style={{color: '#616770'}}>© 2019 Copyright: Rebook.com.vn</span>
          <div style={{margin:'20px 0'}}>
            <SocialIcon url="http://linkedin.com/in/jaketrent" style={{marginRight:'5px'}}/>
            <SocialIcon network="twitter" bgColor="#ff5a01" style={{marginRight:'5px'}}/>
            <SocialIcon network="facebook" style={{marginRight:'5px'}}/>
            <SocialIcon network="google" style={{marginRight:'5px'}}/>
          </div>
        </div>
    )
  }
}

export default PageRight;