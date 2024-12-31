// NotificationRepository.java
package com.alertnet.backend.repository;

import com.alertnet.backend.model.Notification;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface NotificationRepository extends JpaRepository<Notification, Long> {
    List<Notification> findByReceiverId(String receiverId);
    List<Notification> findByReceiverIdOrSenderId(String receiverId, String senderId);

}
