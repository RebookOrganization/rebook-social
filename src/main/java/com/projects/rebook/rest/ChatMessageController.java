package com.projects.rebook.rest;

import com.projects.rebook.cache.CacheDataService;
import com.projects.rebook.model.ChatMessage;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class ChatMessageController {

  @Autowired
  private CacheDataService cacheDataService;

  @RequestMapping(value = "/getMessage", method = RequestMethod.GET)
//    @PreAuthorize("hasAnyRole('EXCUTIVE_MANAGER', 'MANAGER', 'WORKER')")
  public List<ChatMessage> getMessage() {
    List<ChatMessage> messages = cacheDataService.findAllMessages();
    return messages;
  }

}
