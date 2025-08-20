package com.service;

import java.util.Date;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Notification;
import com.repository.NotificationRepository;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public void sendNotification(String recipientUsername, String message) {
        Notification notification = new Notification();
        notification.setRecipientUsername(recipientUsername); // ✅ set to recipient only
        notification.setMessage(message);
        notification.setTimestamp(new Date());
        notificationRepository.save(notification);
    }
}
