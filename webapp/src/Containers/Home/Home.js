import React, {Component} from 'react';
import {
  Card,
  CardHeader,
  CardBody,
  Modal,
  Input,
  Collapse, ModalHeader, ModalBody
} from 'reactstrap';
import './_home.css';
import PageLeft from "../PageLeft/PageLeft";
import PageRight from "../PageRight/PageRight";
import Alert from 'react-s-alert';
import 'react-s-alert/dist/s-alert-default.css';
import 'react-s-alert/dist/s-alert-css-effects/slide.css';
import '../App/_app.css';
import {
  createNewsPostItem,
  getAllNewsItem,
  searchNewsByAddress,
  searchNewsByUser, uploadMultiImages
} from "../../api/UserApi";
import {
  commentNews,
  likeNews,
  shareNews
} from "../../api/UserApi";
import ImageUploader from 'react-images-upload';
import moment from "moment";
import LoadingIndicator from "../../Components/Loading/LoadingIndicator";
import ListCardItem from "./ListCardItem/ListCardItem";
import 'bootstrap-social/bootstrap-social.css';
import LaddaButton, {EXPAND_LEFT} from "react-ladda";
import 'ladda/dist/ladda-themeless.min.css';
import Aside from "../Aside/Aside";
import InfiniteScroll from "react-infinite-scroller";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allNewsItem: null,
      summary: '',
      address: '',
      contactName: '',
      contactPhone: '',
      contactAddress: '',
      projectName: '',
      projectOwner: '',
      projectSize: '',
      furniture: '',
      floors: '',
      rooms: '',
      toilets: '',
      direct: '',
      renderMoreButton: false,
      renderInputAddress: false,
      renderInputContact: false,
      renderInputProject: false,
      renderFloorInput: false,
      renderRoomInput: false,
      renderToiletInput: false,
      renderDirectInput: false,
      renderFurnitureInput: false,
      isLike: false,
      comment: '',
      isShare: false,
      isPost: false,

      createNewsPost: null,
      pictures: [],

      commentPosted: null,
      sharePosted: null,
      currentUser: this.props.currentUser,
      authenticated: this.props.authenticated,

      isSearching: false,
      inputSearch: '',
      inputSearchType: 0,
      onScroll: false,

      resultSearchAddress: null,
      resultSearchUser: null,
      loading: false,

      modalImage: false,
      imgUrl: "",

      loadingPost: false,
      collapsePost: false,

      modalCreatedPost: false,

      items: 20,
      hasMoreItems: true
    };

  }

  toggleCollapse = () => {
    this.setState({collapsePost: !this.state.collapsePost})
  };

  toggleModalImage = (imgUrl) => {
    if (imgUrl !== null || imgUrl !== "") {
      this.setState({
        modalImage: !this.state.modalImage,
        imgUrl: imgUrl
      })
    } else {
      this.setState({
        modalImage: !this.state.modalImage,
      })
    }
  };

  toggleModalCreatedPost = () => {
    this.setState({
      modalCreatedPost: !this.state.modalCreatedPost
    })
  };

  componentDidMount() {
    this.setState({loading: true});
    getAllNewsItem().then(res => {
      if (res) {
        this.setState({
          allNewsItem: res.result
        })
      }
    }).catch(err => {
      console.log(err);
      Alert.warning("Không thể lấy tất cả tin tức.");
    }).finally(() => this.setState({loading: false}));

  }

  handleRenderMoreButton = () => {
    this.setState({
      renderMoreButton: !this.state.renderMoreButton,
      collapsePost: true
    })
  };

  handleRenderInputAddress = () => {
    this.setState({
      renderInputAddress: !this.state.renderInputAddress,
      collapsePost: true
    })
  };

  handleRenderFloorInput = () => {
    this.setState({
      renderFloorInput: !this.state.renderFloorInput,
      collapsePost: true
    })
  };

  handleRenderToiletInput = () => {
    this.setState({
      renderToiletInput: !this.state.renderToiletInput,
      collapsePost: true
    })
  };

  handleRenderRoomInput = () => {
    this.setState({
      renderRoomInput: !this.state.renderRoomInput,
      collapsePost: true
    })
  };

  handleRenderDirectInput = () => {
    this.setState({
      renderDirectInput: !this.state.renderDirectInput,
      collapsePost: true
    })
  };

  handleRenderFurnitureInput = () => {
    this.setState({
      renderFurnitureInput: !this.state.renderFurnitureInput,
      collapsePost: true
    })
  };

  handleRenderInputContact = () => {
    this.setState({
      renderInputContact: !this.state.renderInputContact,
      collapsePost: true
    })
  };

  handleRenderInputProject = () => {
    this.setState({
      renderInputProject: !this.state.renderInputProject,
      collapsePost: true
    })
  };

  onDrop = (pictureFiles) => {
    this.setState({
      pictures: [].concat(pictureFiles)
    }, () => console.log(
        "pictureFiles: " + JSON.stringify(this.state.pictures)))
  };

  handleChangeInput = (event) => {
    this.setState({[event.target.name]: event.target.value})
  };

  handleSharePost = (newsId) => {
    const {currentUser} = this.state;

    const requestParams = {
      isShare: !this.state.isShare,
      userId: currentUser ? currentUser.userId : '',
      newsItemId: newsId ? newsId : '',
    };
    //Api Share Post
    shareNews(requestParams).then(res => {
      this.setState({
        sharePosted: res.result
      })
    })

  };

  handlePostNewsItem = () => {
    this.setState({loadingPost: true});
    const {
      summary, contactName, contactPhone, contactAddress, address, floors, rooms, toilets, furniture,
      direct, currentUser, projectName, projectOwner, projectSize, pictures
    } = this.state;

    console.log("pictures" + JSON.stringify(pictures));
    let formData = new FormData();
    for (var i = 0; i < pictures.length; i++) {
      formData.append('files', pictures[i]);
    }

    let listUpload = null;
    console.log("formData: " + JSON.stringify(formData));
    if (formData && formData.length) {
      uploadMultiImages(formData).then(res => {
        if (res) {
          listUpload = res.data;
        }
      }).catch(err => {
        console.log(err)
      })
    }
    console.log("listUpload: " + JSON.stringify(listUpload));
    if (address && summary) {
      const requestParams = {
        user_id: currentUser ? currentUser.userId : '1',
        prop_address: address,
        desc: summary,
        listUpload: listUpload ? listUpload : [],
        ownerName: contactName ? contactName : '',
        ownerPhone: contactPhone ? contactPhone : '',
        ownerAddress: contactAddress ? contactAddress : '',
        title: '',
        price: '',
        area: '',
        direct_house: direct ? direct : '',
        floor_number: floors ? floors : '',
        room_number: rooms ? rooms : '',
        toilet_number: toilets ? toilets : '',
        interior: furniture ? furniture : '',
        pubDate: moment().format("DD/MM/YYYY"),
        project_name: projectName ? projectName : '',
        project_owner: projectOwner ? projectOwner : '',
        project_size: projectSize ? projectSize : ''
      };

      createNewsPostItem(requestParams).then(res => {
        if (res && parseInt(res.data.returnCode) === 1) {
          Alert.success('Đăng bài thành công.');
          this.setState({
            createNewsPost: res.data.result
          });
        } else {
          Alert.error("Không có phản hồi. Vui lòng thử lại.")
        }
      }).catch(err => {
        console.log(err);
        Alert.error("Không có phản hồi. Vui lòng thử lại.")
      }).finally(() =>
          this.setState({loadingPost: false})
      );

    } else {
      Alert.error(
          "Bạn chưa nhập địa chỉ bất động sản hoặc thông tin chung bất động sản.");
      this.setState({loadingPost: false})
    }

  };

  callBackFromPageRight = (allNewsItem, loading) => {
    if (allNewsItem) {
      console.log("allNewsItem: " + allNewsItem);
      this.setState({
        allNewsItem: allNewsItem,
        loading: loading
      })
    }
  };

  handleSearchByFiler = () => {
    const {inputSearch, inputSearchType} = this.state;

    this.setState({loading: true});

    console.log("input search type: " + inputSearchType);
    if (parseInt(inputSearchType) === 0) {
      Alert.error("Vui lòng chọn loại tìm kiếm.")
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
          })
        }).catch((e) => {
          console.log(e);
          this.setState({loading: false})
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
          loading: false
        })
      }).catch(err => {
        console.log(err);
        this.setState({loading: false})
      })
    }

  };

  handleCloseAllInput = () => {
    this.setState({
      renderInputAddress: false,
      renderFloorInput: false,
      renderRoomInput: false,
      renderToiletInput: false,
      renderDirectInput: false,
      renderFurnitureInput: false,
      renderInputContact: false,
      renderInputProject: false
    })
  };

  showItems() {
    let items = [];
    for (let i = 0; i < this.state.items; i++) {
      items.push(<li key={i} style={{marginBottom:'200px'}}> Item {i} </li>);
    }
    return items;
  };

  loadMore() {
    if (this.state.items === 200) {
      this.setState({ hasMoreItems: false});
    }
    else {
      setTimeout(() => {
        this.setState({ items: this.state.items + 20});
      }, 2000);
    }
  };

  render() {
    const {
      renderMoreButton, renderInputAddress, renderFloorInput, renderRoomInput, renderToiletInput,
      renderDirectInput, renderFurnitureInput, renderInputContact, renderInputProject, summary, address,
      authenticated, currentUser
    } = this.state;
    let inputAddress;
    let inputFloor;
    let inputRoom;
    let inputToilet;
    let inputDirect;
    let inputfurniture;
    let inputContact;
    let inputProject;

    const inputStyle = {
      textIdent: '32px',
      fontSize: '16px',
      marginBottom: '5px',
      border: '1px solid #32CD32',
      borderRadius: '30px'
    };

    if (renderInputContact) {
      inputContact =
          <div>
            <hr/>
            <h6>Người liên hệ</h6>
            <Input name="contactName" type="text"
                   style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập tên người liên hệ..."/>
            <Input name="contactPhone" type="text"
                   style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập số điện thoại người liên hệ..."/>
            <Input name="contactAddress" type="text"
                   style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập địa chỉ người liên hệ..."/>
          </div>
    } else {
      inputContact = null
    }

    if (renderInputProject) {
      inputProject =
          <div>
            <hr/>
            <h6>Dự án</h6>
            <Input name="projectName" type="text"
                   style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập tên dự án..."/>
            <Input name="projectOwner" type="text"
                   style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập chủ dự án..."/>
            <Input name="projectSize" type="text"
                   style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập quy mô dự án..."/>
          </div>
    } else {
      inputProject = null
    }

    if (renderInputAddress) {
      inputAddress =
          <div>
            <hr/>
            <h6>Địa chỉ</h6>
            <Input name="address" type="text"
                   style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập địa chỉ..."/>
          </div>
    } else {
      inputAddress = null
    }

    if (renderFurnitureInput) {
      inputfurniture =
          <div>
            <hr/>
            <h6>Nội thất</h6>
            <Input name="furniture" type="text" style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập nội dung nội thất..."/>
          </div>
    } else {
      inputfurniture = null
    }

    if (renderFloorInput) {
      inputFloor =
          <div>
            <hr/>
            <h6>Số tầng</h6>
            <Input name="floors" type="text" style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập số tầng nhà..."/>
          </div>
    } else {
      inputFloor = null
    }

    if (renderRoomInput) {
      inputRoom =
          <div>
            <hr/>
            <h6>Số phòng</h6>
            <Input name="rooms" type="text" style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập số phòng ngủ..."/>
          </div>
    } else {
      inputRoom = null
    }

    if (renderToiletInput) {
      inputToilet =
          <div>
            <hr/>
            <h6>Số toilet</h6>
            <Input name="toilets" type="text" style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập số toilet..."/>
          </div>

    } else {
      inputToilet = null
    }

    if (renderDirectInput) {
      inputDirect =
          <div>
            <hr/>
            <h6>Hướng nhà</h6>
            <Input name="direct" type="text"
                   style={inputStyle}
                   onChange={this.handleChangeInput}
                   placeholder="Vui lòng nhập hướng nhà..."/>
          </div>
    } else {
      inputDirect = null
    }

    let moreButton;
    if (renderMoreButton) {
      moreButton =
          <div>
            <button className="button-pill"
                    onClick={() => this.handleRenderFurnitureInput()}>
              <img src={"/icon/icons8-interior.png"}/> Nội thất
            </button>
            {' '}
            <button className="button-pill"
                    onClick={() => this.handleRenderFloorInput()}>
              <img src={"/icon/icons8-floods.png"}/> Số tầng
            </button>
            {' '}
            <button className="button-pill"
                    onClick={() => this.handleRenderRoomInput()}>
              <img src={"/icon/bed.png"}/> Số phòng
            </button>
            {' '}
            <button className="button-pill"
                    onClick={() => this.handleRenderToiletInput()}>
              <img src={"/icon/icons8-toilet.png"}/> Số toilet
            </button>
            {' '}
          </div>
    } else {
      moreButton = <div></div>
    }

    return (
        <React.Fragment>
          <div className="container-fluid"
               style={{paddingLeft: "40px", marginTop: "15px"}}>
            <div className="row" id="scroll">
              <div className="col col-md-2" style={{paddingRight: '10px'}}>
                <PageLeft currentUser={currentUser}/>
              </div>
              <div className="col col-md-5">
                {authenticated && !this.state.loading ? (
                        <Card className="card">
                          <CardHeader className="news-post"
                                      onClick={this.toggleModalCreatedPost}>
                            <strong>
                              <img src="/icon/icons8-browser_window.png"/> Tạo bài
                              viết
                            </strong>
                          </CardHeader>
                          <CardBody style={{padding: '10px'}}>
                            <div style={{display: 'flex', alignItems: 'center'}}>
                              <a className="btn-user-in-create">
                                <img
                                    src={currentUser && currentUser.imageUrl ?
                                        currentUser.imageUrl
                                        : '/icon/default.jpg'}
                                    className="rounded-circle icon-user-in-create"
                                    alt="Username"/>
                              </a>
                              <Input className='border-none-outline' type='textarea'
                                     name="summary"
                                     onClick={this.toggleCollapse}
                                     style={{
                                       height: '50px',
                                       textIdent: '32px',
                                       color: '#aaa',
                                       fontSize: '16px'
                                     }}
                                     onChange={this.handleChangeInput}
                                     placeholder={currentUser ? (currentUser.name
                                         + ', thông tin bất động sản của bạn là gì?')
                                         : 'Thông tin bất động sản của bạn là gì?'}
                              />
                            </div>
                            <hr/>
                            <button className="button-pill"
                                    onClick={() => this.handleRenderInputAddress()}>
                              <img src="/icon/icons8-order_delivered.png" alt={""}/> Địa
                              chỉ
                            </button>
                            {' '}
                            <button className="button-pill"
                                    onClick={() => this.handleRenderInputContact()}>
                              <img src="/icon/contact.png" alt={""}/> Người liên hệ
                            </button>
                            {' '}
                            <button className="button-pill"
                                    onClick={() => this.handleRenderInputProject()}>
                              <img src="/icon/icons8-project.png" alt={""}/> Dự án
                            </button>
                            {' '}
                            <button className="button-pill"
                                    onClick={() => this.handleRenderDirectInput()}>
                              <img src="/icon/icons8-north_direction.png" alt={""}/> Hướng
                              nhà
                            </button>
                            {' '}
                            <button className="button-pill"
                                    onClick={() => this.handleRenderMoreButton()}>
                              <img src={"/icon/menu-5.svg"} alt={""}/>
                            </button>
                            {moreButton}
                            <Collapse isOpen={this.state.collapsePost}
                                      id="collapseExample">
                              <ImageUploader
                                  withIcon={false}
                                  buttonText='Ảnh/Video'
                                  onChange={this.onDrop}
                                  imgExtension={['.jpg', '.gif', '.png', '.gif',
                                    '.jpeg']}
                                  maxFileSize={5242880}
                                  withPreview={true}
                              />

                              <hr/>
                              {inputAddress}
                              {inputContact}
                              {inputProject}
                              {inputfurniture}
                              {inputFloor}
                              {inputRoom}
                              {inputToilet}
                              {inputDirect}
                              <div style={{display: 'flex', alignItems: 'center'}}>
                                <button className="button-pill" style={{
                                  borderRadius: '5px',
                                  marginRight: '10px',
                                  width: '30%'
                                }}
                                        onClick={() => this.handleCloseAllInput()}>
                                  <i className="fas fa-caret-down"/> Close All
                                </button>
                                <LaddaButton
                                    data-style={EXPAND_LEFT}
                                    className="btn btn-info btn-ladda"
                                    loading={this.state.loadingPost}
                                    style={{
                                      width: '70%',
                                      fontWeight: '500',
                                      backgroundColor: '#008FE5',
                                      border: 'none',
                                      color: 'white',
                                      height: '40px',
                                      lineHeight: 0
                                    }}
                                    onClick={() => this.handlePostNewsItem()}>
                                  <img src={"/icon/icons8-hand_cursor.png"}/> Chia sẻ
                                </LaddaButton>
                              </div>
                            </Collapse>
                          </CardBody>
                        </Card>
                    )
                    : null
                }

                {
                  this.state.loading ? <LoadingIndicator/>
                      : <ListCardItem allNewsItem={this.state.allNewsItem}
                                      currentUser={currentUser}
                                      handleSharePost={this.handleSharePost}
                                      toggleModalImage={this.toggleModalImage}
                      />
                }

              </div>

              <div className="col col-md-3" style={{paddingRight: '20px'}}>
                <PageRight callBackFromPageRight={this.callBackFromPageRight}/>
              </div>

              <div className="col col-md-2" style={{padding:'0'}}>
                <Aside currentUser={currentUser}/>
              </div>
            </div>

          </div>

          <Modal isOpen={this.state.modalImage}
                 toggle={() => this.toggleModalImage()}
                 centered={true}
                 className={'modal-lg modal-lg-custom' + this.props.className}
          >
            <img src={this.state.imgUrl}
                 style={{width: '100%', height: '100%'}}
                 alt="images"/>
          </Modal>

          <Modal isOpen={this.state.modalCreatedPost}
                 toggle={() => this.toggleModalCreatedPost()}
                 className={'modal-lg modal-lg-custom' + this.props.className}
          >
            <ModalHeader toggle={() => this.toggleModalCreatedPost()}>
              <strong>
                <img src="/icon/icons8-browser_window.png" alt={""}/> Tạo bài viết
              </strong>
            </ModalHeader>
            <ModalBody style={{padding: '10px'}}>
              <div style={{display: 'flex', alignItems: 'center'}}>
                <a className="btn-user-in-create">
                  <img
                      src={currentUser && currentUser.imageUrl ?
                          currentUser.imageUrl
                          : '/icon/default.jpg'}
                      className="rounded-circle icon-user-in-create"
                      alt="Username"/>
                </a>
                <Input className='border-none-outline' type='textarea'
                       name="summary"
                       style={{
                         height: '50px',
                         textIdent: '32px',
                         color: '#aaa',
                         fontSize: '16px'
                       }}
                       onChange={this.handleChangeInput}
                       placeholder={currentUser ? (currentUser.name
                           + ', thông tin bất động sản của bạn là gì?')
                           : 'Thông tin bất động sản của bạn là gì?'}
                />
              </div>

              <hr/>
              <ImageUploader
                  withIcon={false}
                  buttonText='Ảnh/Video'
                  onChange={this.onDrop}
                  imgExtension={['.jpg', '.gif', '.png', '.gif',
                    '.jpeg']}
                  maxFileSize={5242880}
                  withPreview={true}
              />
              {' '}
              <button className="button-pill"
                      onClick={() => this.handleRenderInputAddress()}>
                <img src="/icon/icons8-order_delivered.png"/> Địa chỉ
              </button>
              {' '}
              <button className="button-pill"
                      onClick={() => this.handleRenderInputContact()}>
                <img src="/icon/contact.png"/> Người liên hệ
              </button>
              {' '}
              <button className="button-pill"
                      onClick={() => this.handleRenderInputProject()}>
                <img src="/icon/icons8-project.png"/> Dự án
              </button>
              {' '}
              <button className="button-pill"
                      onClick={() => this.handleRenderDirectInput()}>
                <img src="/icon/icons8-north_direction.png"/> Hướng nhà
              </button>
              {' '}
              <button className="button-pill"
                      onClick={() => this.handleRenderMoreButton()}>
                <img src={"/icon/menu-5.svg"}/>
              </button>
              {moreButton}

              <hr/>

              {inputAddress}
              {inputContact}
              {inputProject}
              {inputfurniture}
              {inputFloor}
              {inputRoom}
              {inputToilet}
              {inputDirect}
              <div style={{display: 'flex', alignItems: 'center'}}>
                <button className="button-pill" style={{
                  borderRadius: '5px',
                  marginRight: '10px',
                  width: '30%'
                }}
                        onClick={() => this.handleCloseAllInput()}>
                  <i className="fas fa-caret-down"></i> Close All
                </button>
                <LaddaButton
                    data-style={EXPAND_LEFT}
                    className="btn btn-info btn-ladda"
                    loading={this.state.loadingPost}
                    style={{
                      width: '70%',
                      fontWeight: '500',
                      backgroundColor: '#008FE5',
                      border: 'none',
                      color: 'white',
                      height: '40px',
                      lineHeight: 0
                    }}
                    onClick={() => this.handlePostNewsItem()}>
                  <img src={"/icon/icons8-hand_cursor.png"}/> Chia sẻ
                </LaddaButton>
              </div>
            </ModalBody>
          </Modal>
        </React.Fragment>
    )
  }
}

export default Home;