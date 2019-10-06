import React, {Component} from 'react';
import './_profile.css';
import Card from "reactstrap/es/Card";
import {
  Button,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Input,
} from "reactstrap";
import ButtonGroup from "reactstrap/es/ButtonGroup";
import '../Home/_home.css';
import {SocialIcon} from "react-social-icons";
import Aside from "../Aside/Aside";
import {getAllNewsByUser} from "../../api/UserApi";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import '../PageLeft/_pageLeft.css';
import shallowCompare from 'react-addons-shallow-compare';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";
import "react-image-gallery/styles/css/image-gallery.css";

class Profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newsByUser: null,
      loading: false,
      currentUser: null,
      comment: "",
      newsDetail: false,
      textOfReadMore: "Chi tiết",
      indexNews: 0,
      renderComment: false,
      likePosted: null,
      activeLike: false,
      sharePosted: null,
      activeShare: false,
      isLike: false,
      isShare: false,
    }
  }

  componentWillMount() {
    const {currentUser} = this.props;
    this.setState({
      currentUser: currentUser,
    })
  }

  componentWillReceiveProps(nextProps) {
    if (shallowCompare(this, this.props, nextProps)) {
      this.setState({
        currentUser: nextProps.currentUser,
      })
    }
  }

  componentDidMount() {
    this.handleGetAllNewByUser();
  }

  handleGetAllNewByUser = () => {
    this.setState({loading: true});
    const {currentUser} = this.state;
    if (currentUser) {
      getAllNewsByUser(currentUser.userId).then(res => {
        console.log("res: "+JSON.stringify(res));
        if (res && parseInt(res.returnCode) !== 0) {
          this.setState({
            newsByUser: res.result
          })
        }
        else {
          Alert.warning("   ");
        }
      }).catch((e)=>{
        console.log(e);
      }).finally(()=>{
        this.setState({loading: false})
      })
    }
  };

  handleRenderImageSlide = (imageList) => {
    if (imageList) {
      let images = [];
      imageList.map(i => {
        images.push({
          original: i.imageUrl,
          thumbnail: i.imageUrl,
        })
      });
      return (
          <ImageGallery items={images}/>
      )
    }
  };

  render() {
    const {newsDetail, textOfReadMore, currentUser, indexNews,
      renderComment, activeLike, activeShare, newsByUser} = this.state;

    const styleText = {
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: '1.58',
      fontFamily: 'inherit',
      marginBottom: '10px',
      paddingRight: '5px',
    };

    const styleTitle = {
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: '1.58',
      fontFamily: 'inherit',
      marginBottom: '10px'
    };

    const styleIcon = {
      width: '21px',
      height: '21px',
      marginRight: "2px"
    };

    return (
      <div className="profile-container">
        <div className="container-fluid" style={{paddingLeft:"40px"}}>
          <div className="row">
            <div className="col col-md-2">
              <div className="sticky-top profile-info" style={{marginBottom:'20px',
                zIndex:'10'}}>
                <div className="profile-avatar" style={{textAlign:'center'}}>
                  {
                    currentUser ? (
                        <img src={currentUser.imageUrl ? currentUser.imageUrl : '/icon/default.jpg'}
                             alt={currentUser.name}/>
                    ) : (
                        <div className="text-avatar">
                      <span>{currentUser.name
                      && currentUser.name[0]}</span>
                        </div>
                    )
                  }
                </div>
                <div className="profile-name" style={{marginBottom:'30px', textAlign:'center'}}>
                  <h2>{currentUser.name}</h2>
                  <p className="profile-email">{currentUser.email}</p>
                </div>

                <h6 style={{color:'#616770', paddingLeft:'10px'}}>Lối tắt</h6>
                <div className="list-group list-group-mine" style={{marginBottom: '15px'}}>
                  <a className="list-group-item" href="#">
                    <img src="/icon/icons8-group.png" alt={""}/> Nhóm
                    <img src="/icon/menu-5.svg" style={{float:'right'}} alt={""}/>
                  </a>
                  <a className="list-group-item" href="#">
                    <img src="/icon/icons8-add_user_male.png" alt={""}/> Tạo
                    <img src="/icon/menu-5.svg" style={{float:'right'}} alt={""}/>
                  </a>
                </div>
              </div>
            </div>
            <div className="col col-md-8" style={{paddingRight:'30px'}}>
              <div className="row">
                <div className="col">
                  <Card style={{border:'none'}}>
                    {/*<CardBody>*/}
                      <img src="/icon/background-profile.jpg" style={{height: '350px'}} alt={""}/>
                    {/*</CardBody>*/}
                  </Card>
                  {/*<Card className={"sticky-top"} style={{top:'54px'}}>*/}
                  {/*  <CardBody>*/}
                  {/*  </CardBody>*/}
                  {/*</Card>*/}
                </div>
              </div>
              <div className="row">
                <div className="col col-md-8">
                  {
                    newsByUser ? newsByUser.map((item, index) => {
                      return (
                          <Card className="card" key={index}>
                            <CardTitle>
                              <div className="row"
                                   style={{display: 'flex', alignItems: 'center', marginTop: '12px'}}>
                                <div className="col-md-9">
                                  <a className="btn-circle btn-lg">
                                    <img
                                        src={item.imageUser ? item.imageUser
                                            : '/icon/default.jpg'}
                                        className="rounded-circle img-profile"
                                        alt="Username"/>
                                  </a>{' '}
                                  <a href={item.imageUser ? item.imageUser
                                      : '/icon/default.jpg'}
                                     className="username"
                                  >
                                    <strong>{item.username ? item.username
                                        : 'username'}</strong>
                                  </a>

                                  {/*pub Date*/}
                                  <div style={{color: '#606770', margin: '0 70px'}}>
                                    {item.pubDate ? item.pubDate : ''}
                                  </div>
                                </div>
                                <div className="col-md-3">
                                  <div className="dropdown float-right">
                                    <button className="btn border-none-outline"
                                            type="button" id="dropdownMenuButton"
                                            data-toggle="dropdown" aria-haspopup="true"
                                            aria-expanded="false">
                                      <img src="/icon/menu-5.svg" style={{width:'23px',height:'23px'}}/>
                                    </button>
                                    <div className="dropdown-menu"
                                         aria-labelledby="dropdownMenuButton">
                                      <a className="dropdown-item">
                                        <i className="far fa-eye-slash"/> Ẩn bài viết
                                      </a>
                                      <a className="dropdown-item">
                                        <i className="far fa-save"/> Lưu bài viết
                                      </a>
                                      <a className="dropdown-item">
                                        <i className="far fa-flag"/> Gửi phản hồi
                                      </a>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </CardTitle>

                            <div className="row"
                                 style={{display: 'flex', alignItems: 'center', marginLeft: '15px', marginRight: '15px'}}>
                              <p style={styleTitle}>
                                {item.titleNews ? item.titleNews : null}
                              </p>
                              <p style={styleText}>
                                <strong>Giá: </strong>{item.price ? item.price : null}
                              </p>
                              <p style={styleText}>
                                <strong>Diện tích: </strong>{item.area ? item.area : null}
                              </p>
                              <p style={styleText}>
                                <strong>Địa chỉ: </strong>{item.address_prop ? item.address_prop
                                  : null}
                              </p>
                              <p style={styleTitle}>
                                {item.summaryNews ? item.summaryNews : null}
                              </p>

                              <a style={{
                                fontSize: '16px',
                                fontWeight: 'normal',
                                lineHeight: '1.58',
                                fontFamily: 'inherit',
                                marginBottom: '10px',
                                paddingRight: '5px',
                                color: '#20a8d8'
                              }}
                                 onClick={()=>this.handleRenderNewsDetail(item.newsId)}>
                                {textOfReadMore}
                              </a>
                              {
                                newsDetail && indexNews === item.newsId ?
                                    <p style={styleTitle}>
                                      {item.descriptionNews ? item.descriptionNews : null}
                                    </p> : null
                              }

                              <p style={styleTitle}>
                                <strong>Liên hệ: </strong>{' '}
                                {item.contactName ? item.contactName : null}
                                {item.contactPhone ? item.contactPhone : null}
                                {item.contactEmail ? item.contactEmail : null}
                              </p>
                              <p style={styleTitle}>
                                {item.projectName ? item.projectName : null}
                                {item.projectOwner ? item.projectOwner : null}
                                {item.projectSize ? item.projectSize : null}
                              </p>
                            </div>

                            <div style={{marginBottom: '10px'}}>
                              {
                                item.imageUrlList && item.imageUrlList.length ? this.handleRenderImageSlide(item.imageUrlList) : null
                              }
                            </div>

                            {/*Luot like luot share o day*/}
                            <div style={{margin: '0 20px'}}>
                              <a className="amount-like-share" style={{color: '#606770'}}>
                                <img style={styleIcon} src="/icon/thumb-up.svg"/>
                                <img style={styleIcon} src="/icon/heart.svg"/>
                                {item.likeNewsList ? item.likeNewsList.length : 0}
                              </a>
                              <a className="float-right amount-like-share"
                                 style={{marginLeft: '10px',color: '#606770'}}>
                                {item.shareList ? item.shareList.length : 0} lượt share
                              </a>
                              <a className="float-right amount-like-share"
                                 style={{color: '#606770'}}
                              >
                                {item.commentList ? item.commentList.length : 0} comment
                              </a>
                            </div>

                            <hr style={{margin: '5px 20px'}}/>

                            <div>
                              <ButtonGroup style={{width: '100%', padding: '0 20px'}}>
                                <Button
                                    className="border-none-outline btn-like-share-comment"
                                    style={activeLike && indexNews === item.newsId ?
                                        {backgroundColor:'#20a8d8', color:'white'} : {}}
                                    onClick={() => this.handleLikePost(item.newsId)}>
                                  <img style={styleIcon} src="/icon/thumb-up.svg"/> Thích
                                </Button>
                                <Button
                                    className="border-none-outline btn-like-share-comment"
                                    style={renderComment && indexNews === item.newsId ?
                                        {backgroundColor:'#20a8d8', color:'white'} : {}}
                                    onClick={() => this.handleRenderComment(item.newsId)}>
                                  <img style={styleIcon} src="/icon/a-chat.svg"/> Bình luận
                                </Button>
                                <Button
                                    className="border-none-outline btn-like-share-comment"
                                    style={activeShare && indexNews === item.newsId ?
                                        {backgroundColor:'#20a8d8', color:'white'} : {}}
                                    onClick={() => this.handleSharePost(item.newsId)}>
                                  <img style={styleIcon} src="/icon/share-right.svg"/> Chia sẻ
                                </Button>
                              </ButtonGroup>
                            </div>

                            <hr/>
                            {
                              renderComment && indexNews === item.newsId ?
                                  <React.Fragment>
                                    <div className="input-comment" style={{paddingBottom:'10px'}}>
                                      <a className="btn-user">
                                        <img
                                            src={'/icon/icons8-checked_user_male.png'}
                                            className="rounded-circle icon-user"
                                            alt="Username"/>
                                      </a>{' '}
                                      <p style={{borderRadius: '30px', width:'470px', padding: '10px',
                                        backgroundColor: '#f2f3f5',textIdent:'32px',fontSize:'16px',marginBottom:'0'}}>
                                        <p style={{fontSize:'16px',fontWeight:'500', color:'#4267B2'}}>{"Other User "}</p>
                                        {"Bai viet rat hay!!!Bai viet rat hay!!!Bai viet rat hay!!!Bai viet rat hay!!!"
                                        + "Bai viet rat hay!!!Bai viet rat hay!!!"
                                        + "Bai viet rat hay!!!Bai viet rat hay!!!Bai viet rat hay!!!Bai viet rat hay!!!Bai viet rat hay!!!"}
                                      </p>
                                    </div>
                                    <div className="input-comment" style={{paddingBottom:'10px'}}>
                                      <a className="btn-user">
                                        <img
                                            src={'/icon/icons8-checked_user_male.png'}
                                            className="rounded-circle icon-user"
                                            alt="Username"/>
                                      </a>{' '}
                                      <p style={{borderRadius: '30px', width:'470px', padding: '10px',
                                        backgroundColor: '#f2f3f5',textIdent:'32px',fontSize:'16px',marginBottom:'0'}}>
                                        <p style={{fontSize:'16px',fontWeight:'500', color:'#4267B2'}}>{"Other User "}</p>
                                        {"Bai viet rat hay!!!Bai viet rat hay!!!Bai viet rat hay!!!Bai viet rat hay!!!"}
                                      </p>
                                    </div>
                                  </React.Fragment>
                                  : null
                            }

                            <div className="input-comment">
                              <a className="btn-user">
                                <img
                                    src={currentUser && currentUser.imageUrl
                                        ? currentUser.imageUrl
                                        : '/icon/default.jpg'}
                                    className="rounded-circle icon-user"
                                    alt="Username"/>
                              </a>{' '}
                              <Input style={{borderRadius: '36px', height: '40px',
                                border:'1px solid #bbc0c4',
                                backgroundColor: '#f2f3f5',textIdent:'32px',fontSize:'16px'}}
                                     placeholder="Viết bình luận..."
                                     value={this.state.comment}
                                     onChange={(e) => this.setState(
                                         {comment: e.target.value})}/>
                              <button style={{border:'none', outline:'none'}}
                                      onClick={()=>this.handleCommentPost(item.newsId)}>
                                <img style={{width:'40px'}} src={'icon/icons8-circled_up.png'} alt={""}/>
                              </button>
                            </div>
                          </Card>
                      )
                    }) :  null
                  }
                </div>
                <div className="col col-md-4">
                  <div className="sticky-top" style={{zIndex:'1',top:'60px'}}>
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
                </div>
              </div>
            </div>

            <div className="col col-md-2">
              <Aside/>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Profile