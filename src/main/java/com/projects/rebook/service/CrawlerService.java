package com.projects.rebook.service;

import com.projects.rebook.bean.Response.CommonResponse;
import java.io.IOException;

public interface CrawlerService {

  CommonResponse crawlerBatDongSan() throws IOException;

  CommonResponse crawlerDiaOcOnline() throws IOException;

}
