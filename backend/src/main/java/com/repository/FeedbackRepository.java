package com.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.model.Feedback;

public interface FeedbackRepository extends JpaRepository<Feedback, Long> {
	boolean existsByTrackingIdAndUsername(String trackingId, String username);
}
