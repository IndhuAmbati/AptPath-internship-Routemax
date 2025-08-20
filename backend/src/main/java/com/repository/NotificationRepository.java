package com.repository;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Notification;

public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByRecipientUsername(String recipientUsername);
}

