package com.projects.rebook.service.impl;

import com.projects.rebook.enumeration.Area;
import com.projects.rebook.enumeration.DirectionOfHouse;
import com.projects.rebook.enumeration.District;
import com.projects.rebook.enumeration.ForRentType;
import com.projects.rebook.enumeration.ForSaleType;
import com.projects.rebook.enumeration.Price;
import com.projects.rebook.enumeration.ProvinceCity;
import com.projects.rebook.service.LoadEnumService;
import java.util.Map;
import org.springframework.stereotype.Service;

@Service
public class LoadEnumServiceImpl implements LoadEnumService {

  @Override
  public Map<Integer, String> loadProvinceEnum() { return ProvinceCity.toHashMap(); }

  @Override
  public Map<Integer, String> loadDistrict() { return District.toHashMap(); }

  @Override
  public Map<Integer, String> loadRentType() {
    return ForRentType.toHashMap();
  }

  @Override
  public Map<Integer, String> loadSaleType() {
    return ForSaleType.toHashMap();
  }

  @Override
  public Map<Integer, String> loadPrice() { return Price.toHashMap(); }

  @Override
  public Map<Integer, String> loadArea() { return Area.toHashMap(); }

  @Override
  public Map<Integer, String> loadDirectHouse() { return DirectionOfHouse.toHashMap(); }

}
