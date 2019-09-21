import axios, {post} from 'axios';
import {API_BASE_URL} from '../Constants/constant';

export function httpGet(url, body) {
  return callApi(url, 'GET', body);
}

export function httpPost(url, body) {
  return callApi(url, 'POST', body);
}

export function httpUploadFile(url, body) {
  const config = {
    headers: {
      'content-type': 'multipart/form-data'
    }
  };
  return post(`${API_BASE_URL}/${url}`, body, config)
  .then(response => {
    return response;
  }).catch((error) => {
    console.log("fail!", error);
    // message.error(error.response.statusText);
    return false;
  })
}

function callApi(url, method, body = null) {
  const headers = {'Content-Type': 'application/json; charset=utf-8'};
  const meta = {
    method,
    headers,
  };
  if (body) {
    meta.data = JSON.stringify(body);
  }
  console.log("url: " + `${API_BASE_URL}/${url}`);
  return axios(`${API_BASE_URL}/${url}`, meta) // eslint-disable-line
  .then(response => {
    return response;
  }).catch((error) => {
    console.log("fail!", error);
    // message.error(error.response.statusText);
    return false;
  });
}