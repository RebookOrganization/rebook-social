package com.projects.rebook.bean.Response;

import com.projects.rebook.model.Share;
import java.util.List;

public class ShareResponse {

  private List<Share> listShare;
  private Integer shareAmount;

  public ShareResponse(List<Share> listShare, Integer shareAmount) {
    this.listShare = listShare;
    this.shareAmount = shareAmount;
  }

  public List<Share> getListShare() {
    return listShare;
  }

  public void setListShare(List<Share> listShare) {
    this.listShare = listShare;
  }

  public Integer getShareAmount() {
    return shareAmount;
  }

  public void setShareAmount(Integer shareAmount) {
    this.shareAmount = shareAmount;
  }
}
