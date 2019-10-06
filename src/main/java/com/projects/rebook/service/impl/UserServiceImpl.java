package com.projects.rebook.service.impl;

import com.projects.rebook.bean.Request.CommentRequest;
import com.projects.rebook.bean.Request.LikeRequest;
import com.projects.rebook.bean.Request.PostNewsRequest;
import com.projects.rebook.bean.Request.ShareRequest;
import com.projects.rebook.bean.Response.CommonResponse;
import com.projects.rebook.bean.Response.CommonResponse.Fail;
import com.projects.rebook.bean.Response.LikeResponse;
import com.projects.rebook.bean.Response.NewsResponseDTO;
import com.projects.rebook.bean.Response.ShareResponse;
import com.projects.rebook.bean.Response.UploadFileResponse;
import com.projects.rebook.model.Comment;
import com.projects.rebook.model.ContactOwner;
import com.projects.rebook.model.LikeNews;
import com.projects.rebook.model.NewsImageUrl;
import com.projects.rebook.model.NewsItem;
import com.projects.rebook.model.PropertyAddress;
import com.projects.rebook.model.PropertyProject;
import com.projects.rebook.model.Share;
import com.projects.rebook.model.User;
import com.projects.rebook.repository.CommentRepository;
import com.projects.rebook.repository.ContactOwnerRepository;
import com.projects.rebook.repository.ImagesRepository;
import com.projects.rebook.repository.LikeRepository;
import com.projects.rebook.repository.NewsItemRepository;
import com.projects.rebook.repository.PropertyAdressRepository;
import com.projects.rebook.repository.PropertyProjectRepository;
import com.projects.rebook.repository.ShareRepository;
import com.projects.rebook.repository.UserRepository;
import com.projects.rebook.service.FileStorageService;
import com.projects.rebook.service.UserService;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@Service
public class UserServiceImpl implements UserService {

  private static Logger logger = LoggerFactory.getLogger(UserServiceImpl.class);

  @Autowired
  UserRepository userRepository;

  @Autowired
  NewsItemRepository newsItemRepository;

  @Autowired
  ContactOwnerRepository contactOwnerRepository;

  @Autowired
  PropertyAdressRepository propertyAdressRepository;

  @Autowired
  PropertyProjectRepository propertyProjectRepository;

  @Autowired
  ImagesRepository imagesRepository;

  @Autowired
  LikeRepository likeRepository;

  @Autowired
  CommentRepository commentRepository;

  @Autowired
  ShareRepository shareRepository;

  @Autowired
  FileStorageService fileStorageService;

  private int returnCode = 1;
  private String returnMessage = "success";

  @Override
  @Transactional
  public CommonResponse createNewsPost(PostNewsRequest request)
      throws IOException {
    try {
      NewsItem newsItem = new NewsItem();
      newsItem.setTitle(request.getTitle());
      newsItem.setPostedDate(request.getPub_date());
      newsItem.setUser(userRepository.findById(request.getUser_id()).get());
      newsItem.setUrl(ServletUriComponentsBuilder.fromCurrentContextPath().toUriString());
      try {
        newsItem.setSummary(request.getDesc().substring(0, 100));
      } catch (Exception e) {
        logger.error("Can't set summary for news.");
      }

      newsItemRepository.save(newsItem);

      Set<NewsImageUrl> setImgUrl = new HashSet<>();
      List<UploadFileResponse> listUpload = request.getListUpload();
      for (UploadFileResponse upload : listUpload) {
        NewsImageUrl newsImageUrl = new NewsImageUrl();
        newsImageUrl.setImageUrl(upload.getFileDownloadUri());
        newsImageUrl.setImageType(upload.getFileType());
        newsImageUrl.setImageSize(upload.getSize());
        newsImageUrl.setNewsItem(newsItem);
        setImgUrl.add(newsImageUrl);
      }
      imagesRepository.saveAll(setImgUrl);

      newsItem.setPubDate(request.getPub_date());
      newsItem.setPrice(request.getPrice());
      newsItem.setArea(request.getArea());
      newsItem.setDescription(request.getDesc());
      newsItem.setRoom_number(request.getRoom_number());
      newsItem.setDirect_of_house(request.getDirect_house());
      newsItem.setFloor_number(request.getFloor_number());
      newsItem.setToilet_number(request.getToilet_number());
      newsItem.setInterior(request.getInterior());

      ContactOwner contactOwner = new ContactOwner();
      contactOwner.setContactName(request.getOwnerName());
      contactOwner.setPhoneNumber(request.getOwnerPhone());
      contactOwner.setAddress(request.getOwnerAddress());
      contactOwnerRepository.save(contactOwner);

      newsItem.setContactOwner(contactOwner);

      PropertyAddress propAddress = new PropertyAddress();
      propAddress.setSummary(request.getProp_address());
      propertyAdressRepository.save(propAddress);

      newsItem.setPropertyAddress(propAddress);

      PropertyProject propertyProject = new PropertyProject();
      propertyProject.setProjectName(request.getProject_name());
      propertyProject.setProjectSize(request.getProject_size());
      propertyProject.setProjectOwner(request.getProject_owner());
      propertyProjectRepository.save(propertyProject);

      newsItem.setPropertyProject(propertyProject);

      newsItemRepository.save(newsItem);

      return new CommonResponse<>(this.returnCode, this.returnMessage, newsItem);
    } catch (Exception ex) {
      logger.error("Service createNewsPost exception - {}", ex);
      return new CommonResponse.Fail("Service createNewsPost exception.");
    }
  }

  @Override
  @Transactional
  public CommonResponse likeNewsFeed(LikeRequest request) throws IOException {
    try {
      LikeNews like = new LikeNews();
      like.setLike(true);
      like.setNewsItemId(request.getNewsItemId());
      like.setUserId(request.getUserId());

      likeRepository.save(like);

      List<LikeNews> listLike = likeRepository.findByNewsItemId(request.getNewsItemId());
      Integer likeAmount = listLike.size();

      return new CommonResponse<>(this.returnCode, this.returnMessage,
          new LikeResponse(listLike, likeAmount));
    } catch (Exception e) {
      logger.error("Service likeNewsFeed exception - {}", e);
      return new CommonResponse.Fail("Service likeNewsFeed exception.");
    }
  }

  @Override
  @Transactional
  public CommonResponse commentNewsFeed(CommentRequest request) throws IOException {
    try {
      Comment comment = new Comment();
      comment.setUserId(request.getUserId());
      comment.setNewItemId(request.getNewsItemId());
      comment.setContent(request.getComment());

      commentRepository.save(comment);

      List<Comment> listComment = commentRepository.findByNewItemId(request.getNewsItemId());

      return new CommonResponse<>(this.returnCode, this.returnMessage, listComment);
    } catch (Exception e) {
      logger.error("Service commentNewsFeed exception - {}", e);
      return new CommonResponse.Fail("Service commentNewsFeed exception.");
    }
  }

  @Override
  @Transactional
  public CommonResponse shareNewsFeed(ShareRequest request) throws IOException {
    try {
      Share share = new Share();
      share.setUserId(request.getUserId());
      share.setNewItemId(request.getNewsItemId());
      share.setShare(request.isShare());

      shareRepository.save(share);

      List<Share> listShare = shareRepository.findByNewItemId(request.getNewsItemId());
      int shareAmount = listShare.size();

      return new CommonResponse<>(this.returnCode, this.returnMessage,
          new ShareResponse(listShare, shareAmount));
    } catch (Exception ex) {
      logger.error("Service shareNewsFeed exception: "+ ex);
      return new CommonResponse.Fail("Service shareNewsFeed exception.");
    }
  }

  @Override
  public CommonResponse searchNewsByUser(String username) throws IOException {
    try {
      List<User> users = userRepository.findByNameLike(username);
      List<NewsItem> listNewsItemSearch = new ArrayList<>();

      if (!users.isEmpty()) {
        for (User user : users) {
          List<NewsItem> listNewsItem = newsItemRepository.findAllByUser(user);
          listNewsItemSearch.addAll(listNewsItem);
        }

        return new CommonResponse<>(this.returnCode, this.returnMessage, listNewsItemSearch);
      }

      return new Fail("User không tồn tại");
    } catch (Exception ex) {
      logger.error("System error when search with user: " + ex, ex);
      return new Fail("System error when search with user");
    }
  }

  @Override
  public CommonResponse searchNewsByAddress(String address) throws IOException {
    try {
      List<PropertyAddress> listAddress = propertyAdressRepository.findAllBySummary(address);
      List<NewsResponseDTO> listNewsResponseDTO = new ArrayList<>();

      if (!listAddress.isEmpty()) {
        NewsItem newsItem;
        for (PropertyAddress addressIndex : listAddress) {
          newsItem = newsItemRepository.findByPropertyAddress(addressIndex.getId());

          if(newsItem != null) {
            NewsResponseDTO newsResponseDTO = new NewsResponseDTO();
            newsResponseDTO.setNewsId(newsItem.getId());
            newsResponseDTO.setUsername(newsItem.getUser().getName());
            newsResponseDTO.setTitleNews(newsItem.getTitle());
            newsResponseDTO.setImageUser(newsItem.getUser().getImageUrl());
            newsResponseDTO.setSummaryNews(newsItem.getSummary());


            newsResponseDTO.setPubDate(newsItem.getPostedDate());
            newsResponseDTO.setPrice(newsItem.getPrice());
            newsResponseDTO.setArea(newsItem.getArea());
            newsResponseDTO.setAddress_prop(newsItem.getPropertyAddress().getSummary());

            if (newsItem.getDescription() != null) {
              newsResponseDTO.setDescriptionNews(newsItem.getDescription());
            }

            if (newsItem.getContactOwner() != null) {
              if (newsItem.getContactOwner().getEmail() != null) {
                newsResponseDTO.setContactEmail(newsItem.getContactOwner().getEmail());
              }

              newsResponseDTO.setContactName(newsItem.getContactOwner().getContactName());
              newsResponseDTO.setContactPhone(newsItem.getContactOwner().getPhoneNumber());
            }

            if (newsItem.getPropertyProject() != null) {
              newsResponseDTO.setProjectOwner(newsItem.getPropertyProject().getProjectOwner());
              newsResponseDTO.setProjectSize(newsItem.getPropertyProject().getProjectSize());
              newsResponseDTO.setProjectName(newsItem.getPropertyProject().getProjectName());
            }

            newsResponseDTO.setImageUrlList(newsItem.getImages());
            newsResponseDTO.setUserId(newsItem.getUser().getId());

            List<Comment> commentList = commentRepository.findByNewItemId(newsItem.getId());
            newsResponseDTO.setCommentList(commentList);

            List<LikeNews> likeNewsList = likeRepository.findByNewsItemId(newsItem.getId());
            newsResponseDTO.setLikeNewsList(likeNewsList);

            List<Share> shareList = shareRepository.findByNewItemId(newsItem.getId());
            newsResponseDTO.setShareList(shareList);

            listNewsResponseDTO.add(newsResponseDTO);
          }
        }
        return new CommonResponse<>(this.returnCode, this.returnMessage, listNewsResponseDTO);
      }

      return new CommonResponse<>(this.returnCode, this.returnMessage, listNewsResponseDTO);
    } catch (Exception ex) {
      logger.error("System error when search with address: " + ex, ex);
      return new Fail("System error when search with address");
    }
  }

  private UploadFileResponse uploadImage(MultipartFile file) {
    String fileName = fileStorageService.storeFile(file);

    String imageURI = ServletUriComponentsBuilder.fromCurrentContextPath()
        .path("/downloadFile/")
        .path(fileName)
        .toUriString();

    return new UploadFileResponse(fileName, imageURI, file.getContentType(), file.getSize());
  }

  private List<UploadFileResponse> uploadMultiImages(MultipartFile[] files) {
    return Arrays.asList(files)
        .stream()
        .map(file -> uploadImage(file))
        .collect(Collectors.toList());
  }

  @Override
  public CommonResponse getAllNewsByUser(Long userID) throws Exception {
    try {
      List<NewsItem> newsItemList = new ArrayList<>();
      Optional<User> user = userRepository.findById(userID);
      if (user.isPresent()) {
        newsItemList = newsItemRepository.findAllByUser(user.get());
      }
      return new CommonResponse<>(this.returnCode, this.returnMessage, newsItemList);
    }
    catch (Exception ex) {
      return new Fail("Lấy thông tin bài viết của user thất bại.");
    }
  }
}
