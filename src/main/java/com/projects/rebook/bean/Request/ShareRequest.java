package com.projects.rebook.bean.Request;

public class ShareRequest {

  private Long userId;
  private Long newsItemId;
  private Boolean isShare;

  public Long getUserId() { return userId; }

  public void setUserId(Long userId) { this.userId = userId; }

  public Long getNewsItemId() { return newsItemId; }

  public void setNewsItemId(Long newsItemId) { this.newsItemId = newsItemId; }

  public Boolean getShare() { return isShare; }

  public void setShare(Boolean share) { isShare = share; }
}
