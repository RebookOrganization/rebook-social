package com.projects.rebook.service.impl;

import com.projects.rebook.bean.Response.CommonResponse;
import com.projects.rebook.bean.Response.NewsResponseDTO;
import com.projects.rebook.cache.CacheDataService;
import com.projects.rebook.cache.NewsItemIndex;
import com.projects.rebook.model.*;
import com.projects.rebook.repository.*;
import com.projects.rebook.service.NewsItemService;

import com.projects.rebook.utils.DateTimeUtils;
import java.util.Map;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.jsoup.select.Elements;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageImpl;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import static com.projects.rebook.constant.Constant.*;

@Service
public class NewsItemServiceImpl implements NewsItemService {

  private Logger logger = LoggerFactory.getLogger(NewsItemServiceImpl.class);

  @Autowired
  NewsItemRepository newsRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  PropertyAdressRepository propertyAdressRepository;

  @Autowired
  PropertyProjectRepository propertyProjectRepository;

  @Autowired
  ContactOwnerRepository contactOwnerRepository;

  @Autowired
  ImagesRepository imagesRepository;

  @Autowired
  LikeRepository likeRepository;

  @Autowired
  CommentRepository commentRepository;

  @Autowired
  ShareRepository shareRepository;

  @Autowired
  CacheDataService cacheDataService;

  private int returnCode = 1;
  private String returnMessage = "success";

  @Override
  @Transactional
//  @Async("asyncExecutor")
  public CommonResponse crawlerBatDongSan() throws IOException {
    logger.info("Thread execute crawlerBatDongSan - {}", Thread.currentThread().getName());
    List<NewsItem> newsItemList = new ArrayList<>();
    List<NewsImageUrl> newsImageUrlList = new ArrayList<>();
    try {
      Document doc = Jsoup.connect(FOR_SALE).get();
      Elements elements = doc.select("item");
      for (Element item : elements) {
        String title = item.select("title").text();
        String url = item.select("link").text();
        String description = item.select("description").text();
        String pubDate = item.select("pubDate").text();

        String descriptMain = Jsoup.parse(description.replaceAll("<div[^>]*>", "\n")).text();

        NewsItem newsItem = new NewsItem();
        newsItem.setTitle(title);
        newsItem.setUrl(url);
        newsItem.setSummary(descriptMain);
        newsItem.setPostedDate(pubDate);
        newsItem.setPostedMilisec(DateTimeUtils.convertTimeStampMilisecond(pubDate, DateTimeUtils.GMT_FORMAT));
        newsItem.setUser(userRepository.findByName("admin").get());

        Document document = Jsoup.connect(url).get();
        Element productDetail = document.getElementById(NEW_DETAILS_TAG);

        if (productDetail.getElementsByClass(LOCATION_PROP) != null) {
          String khuvuc = productDetail.getElementsByClass(LOCATION_PROP).select("a").text();
          newsItem.setCity(khuvuc);
        }

        String price = productDetail.getElementsByClass(PRICE_PROP).first().select("strong").text();
        String area = productDetail.getElementsByClass(PRICE_PROP).get(1).select("strong").text();
        newsItem.setPrice(price);
        newsItem.setArea(area);

        String desc = productDetail.getElementsByClass(DESCRIPTION_PROP).text()
            .replaceAll("<br>", "\t");
        newsItem.setDescription(desc);

        if (productDetail.getElementById(ROOM_NUMBER) != null) {
          String room = productDetail.getElementById(ROOM_NUMBER).getElementsByClass("right")
              .text();
          newsItem.setRoom_number(room);
        }

        if (productDetail.getElementById(TOILET_NUMBER) != null) {
          String toilet = productDetail.getElementById(TOILET_NUMBER).getElementsByClass("right")
              .text();
          newsItem.setToilet_number(toilet);
        }

        if (productDetail.getElementById(DIRECTOFHOUSE) != null) {
          String huongNha = productDetail.getElementById(DIRECTOFHOUSE).getElementsByClass("right")
              .text();
          newsItem.setDirect_of_house(huongNha);
        }

        if (productDetail.getElementById(BALCONY) != null) {
          String balcony = productDetail.getElementById(BALCONY).getElementsByClass("right").text();
          newsItem.setBalcony(balcony);
        }

        if (productDetail.getElementById(FLOOR_NUMBER) != null) {
          String floorNumber = productDetail.getElementById(FLOOR_NUMBER)
              .getElementsByClass("right").text();
          newsItem.setFloor_number(floorNumber);
        }

        if (productDetail.getElementById(WARDIN) != null) {
          String wardin = productDetail.getElementById(WARDIN).getElementsByClass("right").text();
          newsItem.setWardin(wardin);
        }

        if (productDetail.getElementById(FRONT_END) != null) {
          String frontEnd = productDetail.getElementById(FRONT_END).getElementsByClass("right")
              .text();
          newsItem.setFrontEnd(frontEnd);
        }

        if (productDetail.getElementById(INTERIOR) != null) {
          String interior = productDetail.getElementById(INTERIOR).getElementsByClass("right")
              .text();
          newsItem.setInterior(interior);
        }

        String startDate = productDetail.getElementsByClass("prd-more-info").first()
            .getElementsByTag("div").get(4).text().substring(10);
        newsItem.setPubDate(startDate);

        ContactOwner contactOwner = new ContactOwner();
        if(productDetail.getElementById(OWNER_NAME) != null) {
          String owner = productDetail.getElementById(OWNER_NAME).getElementsByClass("right").text();
          contactOwner.setContactName(owner);
        }
        if (productDetail.getElementById(OWNER_PHONE) != null) {
          String phone = productDetail.getElementById(OWNER_PHONE).getElementsByClass("right").text();
          contactOwner.setPhoneNumber(phone);
        }
        if (productDetail.getElementById(OWNER_EMAIL) != null) {
          String email = productDetail.getElementById(OWNER_EMAIL).getElementsByClass("right")
              .select("a").text();
          contactOwner.setEmail(email);
        }
        if (productDetail.getElementById(OWNER_ADDRESS) != null) {
          String address = productDetail.getElementById(OWNER_ADDRESS).getElementsByClass("right")
              .text();
          contactOwner.setAddress(address);
        }
        contactOwnerRepository.save(contactOwner);
        newsItem.setContactOwner(contactOwner);

        PropertyProject propertyProject = new PropertyProject();
        Element project = productDetail.getElementById(PROJECT);
        if (project != null) {
          String projectName = project.getElementsByClass("table-detail").first()
              .getElementsByClass("row").first().getElementsByClass("right").text();
          propertyProject.setProjectName(projectName);

          if (project.getElementById(PROJECT_OWNER) != null) {
            String projectOwner = project.getElementById(PROJECT_OWNER).getElementsByClass("right")
                .text();
            propertyProject.setProjectOwner(projectOwner);
          }
          if (project.getElementById(PROJECT_SIZE) != null) {
            String projectSize = project.getElementById(PROJECT_SIZE).getElementsByClass("right")
                .text();
            propertyProject.setProjectSize(projectSize);
          }
          propertyProjectRepository.save(propertyProject);
          newsItem.setPropertyProject(propertyProject);
        }

        PropertyAddress propertyAddress = new PropertyAddress();
        Elements row = productDetail.getElementsByClass("div-hold").first()
            .getElementsByClass("row");
        String prop_address = row.get(1).getElementsByClass("right").text();
        propertyAddress.setSummary(prop_address);
        propertyAdressRepository.save(propertyAddress);
        newsItem.setPropertyAddress(propertyAddress);

        newsItemList.add(newsItem);
      }

      if (NewsItemIndex.newsItemMap.isEmpty()) {
        newsRepository.saveAll(newsItemList);
        for (int i = 0; i < newsItemList.size(); i++) {
          String url = newsItemList.get(i).getUrl();
          Document document = Jsoup.connect(url).get();
          Element productDetail = document.getElementById(NEW_DETAILS_TAG);

          if (productDetail.getElementById("thumbs") != null) {
            int imgsSize = productDetail.getElementById("thumbs").getElementsByTag("img").size();
            for (int j = 0; j < imgsSize; j++) {
              NewsImageUrl newsImageUrl = new NewsImageUrl();
              newsImageUrl.setNewsItem(newsItemList.get(i));
              newsImageUrl.setImageUrl(
                  productDetail.getElementById("thumbs").getElementsByTag("img").get(j)
                      .attr("src"));
              newsImageUrlList.add(newsImageUrl);
            }
          }
        }

        if (!newsImageUrlList.isEmpty()) {
          imagesRepository.saveAll(newsImageUrlList);
        }

        mapToIndexNewsItemAndNewsDetail();
        return new CommonResponse<>(this.returnCode, this.returnMessage,
            new PageImpl<>(newsItemList));
      }
      else {
        return handleUpdateDatabase(newsItemList, 1);
      }

    } catch (IOException e) {
      logger.error("crawlerBatDongSan error - {}", e);
      return new CommonResponse.Fail("crawlerBatDongSan error.");
    }
  }


  private CommonResponse handleUpdateDatabase(List<NewsItem> newsItemList, Integer page) {
    try {
      if (newsItemList != null) {
        List<NewsItem> listNewsItemInsert = new ArrayList<>();
        List<NewsImageUrl> listImageInsert = new ArrayList<>();

        for (int i = 0; i < newsItemList.size(); i++) {
          NewsItem newsItemImport = newsItemList.get(i);

          NewsItem newsItemIndex = NewsItemIndex.newsItemMap.get(newsItemImport.getUrl());
          if (newsItemIndex == null) {
            listNewsItemInsert.add(newsItemImport);
          }

        }

        if (listNewsItemInsert.size() != 0) {
          newsRepository.saveAll(listNewsItemInsert);
          if (page != null) {
            switch (page) {
              case 1:
                for (int i = 0; i < listNewsItemInsert.size(); i++) {
                  String url = listNewsItemInsert.get(i).getUrl();
                  Document document = Jsoup.connect(url).get();
                  Element productDetail = document.getElementById(NEW_DETAILS_TAG);

                  if (productDetail.getElementById("thumbs") != null) {
                    int imgsSize = productDetail.getElementById("thumbs").getElementsByTag("img").size();
                    for (int j = 0; j < imgsSize; j++) {
                      NewsImageUrl newsImageUrl = new NewsImageUrl();
                      newsImageUrl.setNewsItem(listNewsItemInsert.get(i));
                      newsImageUrl.setImageUrl(
                          productDetail.getElementById("thumbs").getElementsByTag("img").get(j)
                              .attr("src"));
                      listImageInsert.add(newsImageUrl);
                    }
                  }
                }
                break;
              case 2:
                for (int i = 0; i < listNewsItemInsert.size(); i++) {
                  String URL = newsItemList.get(i).getUrl();

                  Document imgDoc = Jsoup.connect(URL).get();
                  Element flexslider = imgDoc.getElementById("slider");
                  Elements slideLarges = flexslider.getElementsByClass("slideLarge");
                  if (slideLarges != null || slideLarges.size() != 0) {
                    for (Element slideLarge : slideLarges) {
                      NewsImageUrl newsImageUrl = new NewsImageUrl();
                      newsImageUrl.setImageUrl(slideLarge.getElementsByTag("img").attr("src"));
                      newsImageUrl.setNewsItem(listNewsItemInsert.get(i));
                      listImageInsert.add(newsImageUrl);
                    }
                  }
                  else {
                    if (flexslider.getElementsByTag("img") != null) {
                      NewsImageUrl newsImageUrl = new NewsImageUrl();
                      newsImageUrl.setImageUrl(flexslider.getElementsByTag("img").attr("src"));
                      newsImageUrl.setNewsItem(listNewsItemInsert.get(i));
                      listImageInsert.add(newsImageUrl);
                    }
                  }
                }
                break;
              default:
                logger.info("handleUpdateDatabase page - {}",page);
                break;
            }
          }

          if (!listImageInsert.isEmpty()) {
            logger.info("listImageInsert save - {}", listImageInsert);
            imagesRepository.saveAll(listImageInsert);
          }

          mapToIndexNewsItemAndNewsDetail();
          logger.info("handleUpdateDatabase listNewsItemInsert response - {}", listNewsItemInsert);
          return new CommonResponse<>(this.returnCode, this.returnMessage,
              new PageImpl<>(listNewsItemInsert));
        }
        else {
          logger.info("handleUpdateDatabase listNewsItemInsert response - {}", listNewsItemInsert);
          return new CommonResponse<>(this.returnCode, this.returnMessage, listNewsItemInsert);
        }
      }
      else {
        return new CommonResponse<>(this.returnCode, this.returnMessage, null);
      }
    } catch (Exception ex) {
      logger.error("handleUpdateDatabase error - {}", ex);
      return new CommonResponse.Fail("handleUpdateDatabase error.");
    }
  }

  private void mapToIndexNewsItemAndNewsDetail() {
    List<NewsItem> newsItemList = cacheDataService.findNewsThreeDateBefore();
    if (newsItemList != null && !newsItemList.isEmpty()) {
      logger.info("newsItemMap - {}", NewsItemIndex.newsItemMap);
      NewsItemIndex.newsItemMap.clear();
      for (int i = 0; i < newsItemList.size(); i++) {
        NewsItemIndex.newsItemMap.put(newsItemList.get(i).getUrl(), newsItemList.get(i));
      }
    }
  }

  @Override
  @Transactional
//  @Async("asyncExecutor")
  public CommonResponse crawlerDiaOcOnline() throws IOException {
    logger.info("Thread execute crawlerDiaOcOnline - {}", Thread.currentThread().getName());
    List<NewsItem> newsItemList = new ArrayList<>();
    List<NewsImageUrl> newsImageUrlList = new ArrayList<>();

    try {
      Document doc = Jsoup.connect(DIAOCONLINE_DUAN_QUYHOACH).get();
      Elements entrys = doc.select("entry");
      for (Element entry : entrys) {
        String title = entry.select("title").text();
        String url = entry.select("link").attr("href");
        String pubDate = entry.select("updated").text();

        NewsItem newsItem = new NewsItem();
        newsItem.setTitle(title);
        newsItem.setUrl(url);
        newsItem.setPostedDate(pubDate);
        newsItem.setPostedMilisec(DateTimeUtils.convertTimeStampMilisecond(pubDate, DateTimeUtils.DATE_FORMAT));
        newsItem.setUser(userRepository.findByEmail("admin@gmail.com").get());

        Document document = Jsoup.connect(url).get();

        Elements elements = document
            .getElementsByClass("rounded_style_2 rounded_box margin_bottom");

        newsItem.setTitle(title);
        newsItem.setPubDate(pubDate);

        String address = elements.first().getElementsByClass("location").text().substring(7);
        PropertyAddress propertyAddress = new PropertyAddress();
        propertyAddress.setSummary(address);
        propertyAdressRepository.save(propertyAddress);
        newsItem.setPropertyAddress(propertyAddress);

        ContactOwner contactOwner = new ContactOwner();
        Elements contact = elements.first().getElementsByClass("contact_info margin_bottom");
        contactOwner.setContactName(contact.first().getElementsByTag("a").text());
        contactOwner.setPhoneNumber(contact.first().getElementsByTag("span").text());
        contactOwner.setAddress(contact.first().getElementsByTag("dd").get(1).text());
        contactOwnerRepository.save(contactOwner);
        newsItem.setContactOwner(contactOwner);

        newsItem.setPrice(elements.first().getElementsByClass("money").text().substring(5));

        Element detail = elements.first().getElementById("detail");
        String descript = detail.getElementsByClass("body").first()
            .getElementsByTag("p").text().replaceAll("<br>", "\n");
        newsItem.setDescription(descript);

        Elements block = elements.first().getElementsByClass("block");

        newsItem.setArea(block.first().getElementsByTag("td")
            .first().getElementsByTag("strong").text());

        newsItem.setFloor_number(block.get(1).getElementsByTag("td")
            .get(5).getElementsByTag("strong").text());

        newsItem.setToilet_number(block.get(1).getElementsByTag("td")
            .get(8).getElementsByTag("strong").text());

        newsItem.setRoom_number(block.get(1).getElementsByTag("td")
            .get(7).getElementsByTag("strong").text());

        newsItem.setDirect_of_house(block.get(1).getElementsByTag("td")
            .get(2).getElementsByTag("strong").text());

        newsItem.setWardin(block.get(1).getElementsByTag("td")
            .get(3).getElementsByTag("strong").text());

        newsItemList.add(newsItem);
      }

      if (NewsItemIndex.newsItemMap.isEmpty()) {
        newsRepository.saveAll(newsItemList);

        for (int i = 0; i < newsItemList.size(); i++) {
          String URL = newsItemList.get(i).getUrl();

          Document imgDoc = Jsoup.connect(URL).get();
          Element slider = imgDoc.getElementById("slider");
          Elements slideLarges = slider.getElementsByClass("slideLarge");
          if (slideLarges != null || slideLarges.size() != 0) {
            for (Element slideLarge : slideLarges) {
              NewsImageUrl newsImageUrl = new NewsImageUrl();
              newsImageUrl.setImageUrl(slideLarge.getElementsByTag("img").attr("src"));
              newsImageUrl.setNewsItem(newsItemList.get(i));
              newsImageUrlList.add(newsImageUrl);
            }
          }
          else {
            if (slider.getElementsByTag("img") != null) {
              NewsImageUrl newsImageUrl = new NewsImageUrl();
              newsImageUrl.setImageUrl(slider.getElementsByTag("img").attr("src"));
              newsImageUrl.setNewsItem(newsItemList.get(i));
              newsImageUrlList.add(newsImageUrl);
            }
          }
        }

        if (!newsImageUrlList.isEmpty()) {
          imagesRepository.saveAll(newsImageUrlList);
        }

        mapToIndexNewsItemAndNewsDetail();
        return new CommonResponse<>(this.returnCode, this.returnMessage,
            new PageImpl<>(newsItemList));
      }
      else {
        return handleUpdateDatabase(newsItemList, 2);
      }

    } catch (Exception ex) {
      logger.error("crawlerDiaOcOnline error - {}", ex);
      return new CommonResponse.Fail("crawlerDiaOcOnline error.");
    }
  }

  @Override
  public CommonResponse getAllNewsItem() throws IOException {
    try {
      Map<String, NewsItem> newsMap = NewsItemIndex.newsItemMap;
      List<NewsResponseDTO> newsResponseDTOList = new ArrayList<>();

      if (!newsMap.isEmpty()) {
        for (Map.Entry<String, NewsItem> entry : newsMap.entrySet()) {
          NewsItem newsItem = entry.getValue();
          if (newsItem != null) {
            newsResponseDTOList.add(mapNewsToNewsResponseDTO(newsItem));
          }
        }
      }
      else {
        long dateFrom = DateTimeUtils.getThreeDateBefore();
        long dateTo = DateTimeUtils.getCurrentDateMilisec();
        List<NewsItem> newsItemList = newsRepository.findAllByPostedDate(dateFrom, dateTo);
        for (NewsItem newsItem : newsItemList) {
          newsResponseDTOList.add(mapNewsToNewsResponseDTO(newsItem));
        }
      }

      logger.info("getAllNewsItem response - {}, size - {}", newsResponseDTOList, newsResponseDTOList.size());
      return new CommonResponse(this.returnCode, this.returnMessage, newsResponseDTOList);
    } catch (Exception ex) {
      logger.error("getAllNewsItem error - {}", ex);
      return new CommonResponse.Fail("getAllNewsItem fail.");
    }
  }

  public NewsResponseDTO mapNewsToNewsResponseDTO (NewsItem newsItem) {
    NewsResponseDTO newsResponseDTO = new NewsResponseDTO();
    newsResponseDTO.setImageUser(newsItem.getUser().getImageUrl());
    newsResponseDTO.setUsername(newsItem.getUser().getName());
    newsResponseDTO.setTitleNews(newsItem.getTitle());

    if (newsItem.getSummary() != null) {
      newsResponseDTO.setSummaryNews(newsItem.getSummary());
    }

    if (newsItem.getDescription() != null) {
      newsResponseDTO.setDescriptionNews(newsItem.getDescription());
    }

    newsResponseDTO.setPubDate(newsItem.getPostedDate());
    newsResponseDTO.setPrice(newsItem.getPrice());
    newsResponseDTO.setArea(newsItem.getArea());
    newsResponseDTO.setAddress_prop(newsItem.getPropertyAddress().getSummary());

    newsResponseDTO.setImageUrlList(newsItem.getImages());
    newsResponseDTO.setNewsId(newsItem.getId());
    newsResponseDTO.setUserId(newsItem.getUser().getId());

    if (newsItem.getContactOwner() != null) {
      newsResponseDTO.setContactName(newsItem.getContactOwner().getContactName());
      newsResponseDTO.setContactPhone(newsItem.getContactOwner().getPhoneNumber());

      if (newsItem.getContactOwner().getEmail() != null) {
        newsResponseDTO.setContactEmail(newsItem.getContactOwner().getEmail());
      }
    }

    if (newsItem.getPropertyProject() != null) {
      newsResponseDTO.setProjectName(newsItem.getPropertyProject().getProjectName());
      newsResponseDTO.setProjectOwner(newsItem.getPropertyProject().getProjectOwner());
      newsResponseDTO.setProjectSize(newsItem.getPropertyProject().getProjectSize());
    }

    List<LikeNews> likeNewsList = likeRepository.findByNewsItemId(newsItem.getId());
    newsResponseDTO.setLikeNewsList(likeNewsList);

    List<Comment> commentList = commentRepository.findByNewItemId(newsItem.getId());
    newsResponseDTO.setCommentList(commentList);

    List<Share> shareList = shareRepository.findByNewItemId(newsItem.getId());
    newsResponseDTO.setShareList(shareList);

    return newsResponseDTO;
  }
}
