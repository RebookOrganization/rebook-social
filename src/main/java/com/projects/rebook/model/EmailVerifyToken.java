package com.projects.rebook.model;

import java.util.Date;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
public class EmailVerifyToken {

  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  @Column(name="token_id")
  private long tokenId;

  @Column(name="confirmation_token")
  private String verifyToken;

  @Temporal(TemporalType.TIMESTAMP)
  private Date createdDate;

  private int userId;

  public long getTokenId() { return tokenId; }

  public void setTokenId(long tokenId) { this.tokenId = tokenId; }

  public String getVerifyToken() { return verifyToken; }

  public void setVerifyToken(String verifyToken) { this.verifyToken = verifyToken; }

  public Date getCreatedDate() { return createdDate; }

  public void setCreatedDate(Date createdDate) { this.createdDate = createdDate; }

  public int getUserId() { return userId; }

  public void setUserId(int userId) { this.userId = userId; }
}
