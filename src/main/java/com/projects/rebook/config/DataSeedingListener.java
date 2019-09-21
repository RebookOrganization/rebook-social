package com.projects.rebook.config;

import com.projects.rebook.model.AuthProvider;
import com.projects.rebook.model.Role;
import com.projects.rebook.model.User;
import com.projects.rebook.repository.RoleRepository;
import com.projects.rebook.repository.UserRepository;
import java.util.HashSet;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

@Component
public class DataSeedingListener implements ApplicationListener<ContextRefreshedEvent> {

  @Autowired
  UserRepository userRepository;

  @Autowired
  RoleRepository roleRepository;

  @Override
  public void onApplicationEvent(ContextRefreshedEvent event) {

    if (roleRepository.findByName("ROLE_ADMIN") == null) {
      roleRepository.save(new Role("ROLE_ADMIN"));
    }

    if (roleRepository.findByName("ROLE_USER") == null) {
      roleRepository.save(new Role("ROLE_USER"));
    }

    if (!userRepository.findByName("admin").isPresent()) {
      User user = new User();
      user.setName("admin");
      user.setImageUrl("https://lh4.googleusercontent.com/-oTnsvG0mZOY/AAAAAAAAAAI/AAAAAAAAAAA/ACHi3rcSVx44Jq41IMkB8XO5mJqbnFOOlQ/mo/photo.jpg");
      user.setEmail("admin@gmail.com");
      user.setEmailVerified(true);
      user.setProvider(AuthProvider.local);
      user.setPassword("123456");
      Set<Role> roles = new HashSet<>();
      roles.add(roleRepository.findByName("ROLE_ADMIN"));
      user.setRoles(roles);
      userRepository.save(user);
    }
  }

}
