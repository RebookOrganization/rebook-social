import { API_BASE_URL } from '../Constants/constant';
import {request} from "./APIUtils";

const API_ADMIN = "/api/admin";

export function crawlBatDongSan() {
  try {
    return request({
      url: API_BASE_URL + API_ADMIN + "/crawl-batdongsan",
      method: 'GET'
    })
  }
  catch (e) {
    console.log(e)
  }
}

export function crawlDiaOcOnline() {
  try {
    return request({
      url: API_BASE_URL + API_ADMIN + "/crawl-diaoconline",
      method: 'GET'
    })
  }
  catch (e) {
    console.log(e);
  }
}

