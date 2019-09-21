import {request} from "./APIUtils";
import { API_BASE_URL } from '../Constants/constant';
import {httpPost, httpUploadFile} from "./index";

const API_NEWS = "/api/news";

export function getAllNewsItem() {
  try {
    return request({
      url: API_BASE_URL + API_NEWS + "/all-news",
      method: 'GET'
    })
  }
  catch (e) {
    console.log(e);
  }
}

export function uploadMultiImages(formData) {
  return httpUploadFile("api/uploadMultipleFiles", formData);
}

 export function createNewsPostItem(requestParam) {
  try {
    return httpPost("api/news/create-post", requestParam);
  }
  catch (e) {
    console.log(e);
  }
}

export function likeNews(likeRequest) {
  try {
    return request({
      url: API_BASE_URL + API_NEWS + "/like",
      method: 'POST',
      body: JSON.stringify(likeRequest)
    });
  }
  catch (e) {
    console.log(e);
  }

}

export function commentNews(commentRequest) {
  try {
    return request({
      url: API_BASE_URL + API_NEWS + "/comment",
      method: 'POST',
      body: JSON.stringify(commentRequest)
    })
  }
  catch (e) {
    console.log(e);
  }

}

export function shareNews(shareRequest) {
  try {
    return request({
      url: API_BASE_URL + API_NEWS + "/share",
      method: 'POST',
      body: JSON.stringify(shareRequest)
    })
  }
  catch (e) {
    console.log(e);
  }

}

export function searchNewsByAddress(address) {
  try {
    return request({
      url: API_BASE_URL + API_NEWS + "/search-by-address?address=" + address,
      method: 'GET',
      // body: formData
    })
  }
  catch (e) {
    console.log(e);
  }

}

export function searchNewsByUser(username) {
  try {
    let formData  = new FormData();
    formData.append('username', username);
    return request({
      url: API_BASE_URL + API_NEWS + "/search-by-user",
      method: 'POST',
      body: formData
    })
  }
  catch (e) {
    console.log(e);
  }
}