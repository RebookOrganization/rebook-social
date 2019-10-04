package com.projects.rebook.cache;

import com.projects.rebook.model.NewsImageUrl;
import com.projects.rebook.model.NewsItem;
import com.projects.rebook.model.User;
import com.projects.rebook.repository.ImagesRepository;
import com.projects.rebook.repository.NewsItemRepository;
import com.projects.rebook.repository.UserRepository;
import com.projects.rebook.service.impl.NewsItemServiceImpl;
import com.projects.rebook.utils.DateTimeUtils;
import java.util.HashMap;
import java.util.Map;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import javax.annotation.PostConstruct;
import java.util.List;

@Component
@Transactional
public class NewsItemIndex {

  private Logger logger = LoggerFactory.getLogger(NewsItemServiceImpl.class);

  public static Map<String, NewsItem> newsItemMap = new HashMap<>();
  public static Map<Long, User> userMap = new HashMap<>();
  public static Map<Long, NewsImageUrl> imageUrlMap = new HashMap<>();

  @Autowired
  NewsItemRepository newsItemRepository;

  @Autowired
  UserRepository userRepository;

  @Autowired
  ImagesRepository imagesRepository;

  @Autowired
  CacheDataService cacheDataService;

  @PostConstruct
  public void mapToIndexNewsItem() {
    mapToIndexNews();
  }

  public void mapToIndexNews() {
    Long currentDateTimeMilisec = DateTimeUtils
        .convertTimeStampMilisecond(DateTimeUtils.getCurrentDate(), DateTimeUtils.DATE_TIME_FORMAT);
    logger.info("current dateTime milisec - {}", currentDateTimeMilisec);
    List<NewsItem> newsItemList = cacheDataService.findLastNRowsInPartition();
    if (newsItemList != null && !newsItemList.isEmpty()) {
      logger.info("newsItemMap - {}", NewsItemIndex.newsItemMap);
      NewsItemIndex.newsItemMap.clear();
      for (int i = 0; i < newsItemList.size(); i++) {
        NewsItemIndex.newsItemMap.put(newsItemList.get(i).getUrl(), newsItemList.get(i));
      }
    }
  }

}
