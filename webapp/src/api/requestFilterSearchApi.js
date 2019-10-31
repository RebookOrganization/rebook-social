import { API_BASE_URL } from '../constants/constant';
import {request} from "./APIUtils";

const API_LOAD_ENUM = "/api/enumeration";

export function loadEnumProvince() {
  return request({
    url: API_BASE_URL + API_LOAD_ENUM + "/province-city",
    method: 'GET'
  })
}

export function loadEnumDistrict() {
  return request({
    url: API_BASE_URL + API_LOAD_ENUM + "/district",
    method: 'GET'
  })
}

export function loadEnumRentType() {
  return request({
    url: API_BASE_URL + API_LOAD_ENUM + "/rent-type",
    method: 'GET'
  })
}

export function loadEnumSaleType() {
  return request({
    url: API_BASE_URL + API_LOAD_ENUM + "/sale-type",
    method: 'GET'
  })
}

export function loadEnumPrice() {
  return request({
    url: API_BASE_URL + API_LOAD_ENUM + "/price-options",
    method: 'GET'
  })
}
export function loadEnumArea() {
  return request({
    url: API_BASE_URL + API_LOAD_ENUM + "/area-options",
    method: 'GET'
  })
}
export function loadEnumDirectHouse() {
  return request({
    url: API_BASE_URL + API_LOAD_ENUM + "/direct-house",
    method: 'GET'
  })
}