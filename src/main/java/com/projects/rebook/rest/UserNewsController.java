package com.projects.rebook.rest;

import com.projects.rebook.service.impl.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/api/user")
public class UserNewsController {

  @Autowired
  UserServiceImpl userService;

  @GetMapping(value = "/news-item")
  public ResponseEntity<?> getAllNewsUser(@RequestParam Long userID) throws Exception {
    return new ResponseEntity<>(userService.getAllNewsByUser(userID), HttpStatus.OK);
  }

}
