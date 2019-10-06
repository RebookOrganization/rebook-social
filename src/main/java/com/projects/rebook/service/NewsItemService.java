package com.projects.rebook.service;

import com.projects.rebook.bean.Response.CommonResponse;

import java.io.IOException;

public interface NewsItemService {

    CommonResponse crawlerBatDongSan() throws IOException;

    CommonResponse crawlerDiaOcOnline() throws IOException;

    CommonResponse getAllNewsItem() throws IOException;

    CommonResponse getAllNewsByUser(Long userID) throws IOException;
}
