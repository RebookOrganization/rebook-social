package com.projects.rebook.service;

import com.projects.rebook.bean.Request.CommentRequest;
import com.projects.rebook.bean.Request.LikeRequest;
import com.projects.rebook.bean.Request.PostNewsRequest;
import com.projects.rebook.bean.Request.ShareRequest;
import com.projects.rebook.bean.Response.CommonResponse;
import com.projects.rebook.model.User;
import java.io.IOException;

public interface UserService {

  CommonResponse createNewsPost(PostNewsRequest request) throws IOException;

  CommonResponse likeNewsFeed(LikeRequest request) throws IOException;

  CommonResponse commentNewsFeed(CommentRequest request) throws IOException;

  CommonResponse shareNewsFeed(ShareRequest request) throws IOException;

  CommonResponse searchNewsByUser(String username) throws IOException;

  CommonResponse searchNewsByAddress(String address) throws IOException;

  CommonResponse getAllNewsByUser(Long userID) throws Exception;

}
