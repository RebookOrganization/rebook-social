package com.projects.rebook.service;

import java.util.Map;

public interface LoadEnumService {

  Map<Integer, String> loadProvinceEnum();

  Map<Integer, String> loadDistrict();

  Map<Integer, String> loadRentType();

  Map<Integer, String> loadSaleType();

}
