package com.service;

import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.dao.NotificationDao;
import com.model.Notification;
import com.model.Parcel;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    @Autowired
    private NotificationDao notificationDao;

    public void sendRegistrationEmail(String toEmail, String userName) {
        try {
            String subject = "Welcome to RouteGenius!";
            String message = "Hello " + userName + ",\n\nThank you for registering with our RouteGenius platform.";

            SimpleMailMessage email = new SimpleMailMessage();
            email.setTo(toEmail);
            email.setSubject(subject);
            email.setText(message);
            email.setFrom("indhuambati202@gmail.com");

            mailSender.send(email);
            System.out.println("Email sent to " + toEmail);
        } catch (Exception e) {
            System.out.println("Failed to send email: " + e.getMessage());
        }
    }



}
