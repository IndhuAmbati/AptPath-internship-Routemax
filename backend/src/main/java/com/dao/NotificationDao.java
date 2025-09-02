package com.dao;

import java.util.List;

import org.springframework.stereotype.Repository;

import com.model.Notification;

import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;

@Repository
@Transactional
public class NotificationDao {

    @PersistenceContext
    private EntityManager entityManager;

    public void save(Notification notification) {
        entityManager.persist(notification);
    }

    public List<Notification> findAll() {
        return entityManager.createQuery("SELECT n FROM Notification n", Notification.class).getResultList();
    }

    public List<Notification> findByRecipientUsername(String username) {
        return entityManager.createQuery(
            "SELECT n FROM Notification n WHERE n.recipientUsername = :username", Notification.class)
            .setParameter("username", username)
            .getResultList();
    }
}
