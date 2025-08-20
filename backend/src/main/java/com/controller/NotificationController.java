package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Notification;
import com.repository.NotificationRepository;
//NotificationController.java
@RestController
@RequestMapping("/notifications")
@CrossOrigin(origins = "http://localhost:3000")
public class NotificationController {

	@Autowired
    private NotificationRepository notificationRepository;

   @GetMapping("/user/{username}")
   public List<Notification> getNotificationsByUsername(@PathVariable String username) {
	    return notificationRepository.findByRecipientUsername(username);
	}

	@GetMapping("/getAdminNotifications")
	public List<Notification> getAdminNotifications() {
	    return notificationRepository.findAll();
	}




}