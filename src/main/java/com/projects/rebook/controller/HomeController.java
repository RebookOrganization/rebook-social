package com.projects.rebook.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;

@CrossOrigin
@Controller
public class HomeController {

  @GetMapping(value = "/")
  public String initPage() { return "redirect:/index"; }

  @GetMapping("/index")
  public String index() { return "index"; }

  @GetMapping(value = "/403")
  public String accessDenied() { return "403"; }

  @GetMapping(value = "/home")
  public String home() { return "home"; }

  @GetMapping(value = "/login")
  public String login(Model model) {
    model.addAttribute("navActive", "active");
    return "login";
  }

  @GetMapping(value = "/signup")
  public String signup(Model model) {
    model.addAttribute("navActive", "active");
    return "signup";
  }
}
