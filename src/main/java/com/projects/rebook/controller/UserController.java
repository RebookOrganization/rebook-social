package com.projects.rebook.controller;

import com.projects.rebook.auth.CurrentUser;
import com.projects.rebook.auth.UserPrincipal;
import com.projects.rebook.bean.Response.UserResponse;
import com.projects.rebook.dto.UserResponseDTO;
import com.projects.rebook.exception.ResourceNotFoundException;
import com.projects.rebook.model.User;
import com.projects.rebook.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

  @Autowired
  private UserRepository userRepository;

  @GetMapping("/user/me")
  public UserResponseDTO getCurrentUser(@CurrentUser UserPrincipal userPrincipal) {
    UserResponseDTO userResponseDTO = new UserResponseDTO();
    User user = userRepository.findById(userPrincipal.getId())
        .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

    userResponseDTO.setUserId(user.getId());
    userResponseDTO.setName(user.getName());
    userResponseDTO.setEmail(user.getEmail());
    userResponseDTO.setImageUrl(user.getImageUrl());
    userResponseDTO.setPhone(user.getPhoneNumber());
    userResponseDTO.setBirthday(user.getGender());
    userResponseDTO.setGender(user.getGender());
    userResponseDTO.setRoles(user.getRoles());

    return userResponseDTO;
  }

  @GetMapping("/user/me-no-role")
  public UserResponse getUserWithoutRole(@CurrentUser UserPrincipal userPrincipal) {
    UserResponse userResponse = new UserResponse();
    User user = userRepository.findById(userPrincipal.getId())
        .orElseThrow(() -> new ResourceNotFoundException("User", "id", userPrincipal.getId()));

    userResponse.setUserId(user.getId());
    userResponse.setName(user.getName());
    userResponse.setBirthDate(user.getBirthDate());
    userResponse.setImageUrl(user.getImageUrl());
    userResponse.setEmail(user.getEmail());
    userResponse.setPhone(user.getPhoneNumber());
    userResponse.setGender(user.getGender());

    return userResponse;
  }

  @GetMapping("/user/principal")
  public UserPrincipal getCurrentPrincipal(@CurrentUser UserPrincipal userPrincipal) {
    return userPrincipal;
  }
}
