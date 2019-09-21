import React, {Component} from 'react';
import {Button, Card, CardImg, CardTitle, Input} from "reactstrap";
import ButtonGroup from "reactstrap/es/ButtonGroup";
import shallowCompare from 'react-addons-shallow-compare';

class ListCardItem extends Component{
  constructor(props) {
    super(props);

    this.state = {
      comment: "",
      newsDetail: false,
      textOfReadMore: "Chi tiết",
      currentUser: null
    }
  }

  componentWillMount() {
    const {currentUser} = this.props;
    this.setState({
      currentUser: currentUser
    })
  }

  componentWillReceiveProps(nextProps) {
    if (shallowCompare(this, this.props, nextProps)) {
      this.setState({
        currentUser: nextProps.currentUser
      })
    }
  }

  handleRenderNewsDetail = () => {
    this.setState({
      newsDetail: !this.state.newsDetail
    },() => {
      let {newsDetail} = this.state;
      if (newsDetail === true) {
        this.setState({
          textOfReadMore : "Thu gọn"
        })
      }
      else {
        this.setState({
          textOfReadMore: "Chi tiết"
        })
      }
    })
  };

  render() {
    let allNewsItem = null;
    if (this.props.allNewsItem !== null || this.props.allNewsItem !== undefined) {
      allNewsItem = this.props.allNewsItem
    }
    const {newsDetail, textOfReadMore, currentUser} = this.state;

    const styleText = {
      fontSize: '16px',
      fontWeight: 'normal',
      lineHeight: '1.58',
      fontFamily: 'inherit',
      marginBottom: '10px',
      paddingRight: '5px'
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
      <React.Fragment>
        {
          allNewsItem ?
            allNewsItem.map((item, index) => {
              return (
                <Card className="card" key={index}>
                  <CardTitle>
                    <div className="row"
                         style={{
                           display: 'flex',
                           alignItems: 'center',
                           marginTop: '15px'
                         }}>
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
                        <div style={{color: '#606770', margin: '0 80px'}}>
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
                              <i className="far fa-eye-slash"></i> Ẩn bài viết
                            </a>
                            <a className="dropdown-item">
                              <i className="far fa-save"></i> Lưu bài viết
                            </a>
                            <a className="dropdown-item">
                              <i className="far fa-flag"></i> Gửi phản hồi
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
                    <a href="#" style={styleText}
                       onClick={()=>this.handleRenderNewsDetail()}>
                      {textOfReadMore}
                    </a>
                    {
                      newsDetail ?
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

                  <div className="row-images" style={{marginBottom: '10px'}}>
                    {item.imageUrlList ? item.imageUrlList.map(i => (
                            <CardImg key={i.id}
                                     className="col-image"
                                     src={i.imageUrl}
                                     onClick={()=>this.props.toggleModalImage(i.imageUrl)}
                                     alt="images"/>
                        )
                    ) : null
                    }
                  </div>

                  {/*Luot like luot share o day*/}
                  <div style={{margin: '0 20px'}}>
                    <a className="amount-like-share" style={{color: '#606770'}}>
                      <img style={styleIcon} src="/icon/thumb-up.svg"/>
                      <img style={styleIcon} src="/icon/heart.svg"/>
                      59
                    </a>
                    <a className="float-right amount-like-share"
                       style={{marginLeft: '10px',color: '#606770'}}>
                      10 lượt share
                    </a>
                    <a className="float-right amount-like-share"
                       style={{color: '#606770'}}
                    >
                      9 comment
                    </a>
                  </div>

                  <hr style={{margin: '5px 20px'}}/>

                  <div>
                    <ButtonGroup style={{width: '100%', padding: '0 20px'}}>
                      <Button
                          className="border-none-outline btn-like-share-comment"
                          onClick={() => this.props.handleLikePost(item.newsId)}>
                        <img style={styleIcon} src="/icon/thumb-up.svg"/> Thích
                      </Button>
                      <Button
                          className="border-none-outline btn-like-share-comment"
                          onClick={() => this.props.handleCommentPost(item.newsId)}>
                        <img style={styleIcon} src="/icon/a-chat.svg"/> Bình luận
                      </Button>
                      <Button
                          className="border-none-outline btn-like-share-comment"
                          onClick={() => this.props.handleSharePost(item.newsId)}>
                        <img style={styleIcon} src="/icon/share-right.svg"/> Chia sẻ
                      </Button>
                    </ButtonGroup>
                  </div>

                  <hr/>

                  <div className="input-comment">
                    <a className="btn-user">
                      <img
                          src={currentUser
                              ? currentUser.imageUrl
                              : '/icon/default.jpg'}
                          className="rounded-circle icon-user"
                          alt="Username"/>
                    </a>{' '}
                    <Input style={{borderRadius: '36px', height: '40px',
                                    border:'1px #606770',
                                    backgroundColor: '#f2f3f5',textIdent:'32px',
                                    color:'#aaa',fontSize:'16px'}}
                           placeholder="Viết bình luận..."
                           onChange={(e) => this.setState(
                               {comment: e.target.value})}/>
                  </div>
                </Card>
              )
            }) : null
        }
      </React.Fragment>
    )
  }
}
export default ListCardItem;