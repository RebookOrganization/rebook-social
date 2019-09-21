package com.projects.rebook.service.impl;

import com.projects.rebook.enumeration.District;
import com.projects.rebook.enumeration.ForRentType;
import com.projects.rebook.enumeration.ForSaleType;
import com.projects.rebook.enumeration.ProvinceCity;
import com.projects.rebook.service.LoadEnumService;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class LoadEnumServiceImpl implements LoadEnumService {

  @Override
  public Map<Integer, String> loadProvinceEnum() {
    Map<Integer, String> map = ProvinceCity.toHashMap();
    return map;
  }

  @Override
  public Map<Integer, String> loadDistrict() {
    Map<Integer, String> map = District.toHashMap();
    return map;
  }

  @Override
  public Map<Integer, String> loadRentType() {
    return ForRentType.toHashMap();
  }

  @Override
  public Map<Integer, String> loadSaleType() {
    return ForSaleType.toHashMap();
  }
}
