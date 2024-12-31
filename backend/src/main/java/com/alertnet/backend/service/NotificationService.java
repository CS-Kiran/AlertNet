// NotificationService.java
package com.alertnet.backend.service;

import com.alertnet.backend.model.Notification;
import com.alertnet.backend.repository.NotificationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class NotificationService {

    @Autowired
    private NotificationRepository notificationRepository;

    public Notification createNotification(Notification notification) {
        return notificationRepository.save(notification);
    }

    public List<Notification> getNotificationsByReceiverId(String receiverId) {
        return notificationRepository.findByReceiverId(receiverId);
    }

    public Optional<Notification> getNotificationById(Long notificationId) {
        return notificationRepository.findById(notificationId);
    }
    
    public List<Notification> getNotificationsByReceiverOrSenderId(String userId) {
        return notificationRepository.findByReceiverIdOrSenderId(userId, userId);
    }

}
