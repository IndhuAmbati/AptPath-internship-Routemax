package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Feedback;
import com.model.Parcel;
import com.repository.FeedbackRepository;
import com.repository.ParcelRepository;

@CrossOrigin
@RestController
@RequestMapping("/feedbacks")
public class FeedbackController {

    @Autowired
    private FeedbackRepository feedbackRepository;

    @Autowired
    private ParcelRepository parcelRepository;

    @PostMapping("/add")
    public ResponseEntity<?> submitFeedback(@RequestBody Feedback feedback) {
        // 1. Check parcel existence
        Optional<Parcel> parcelOpt = parcelRepository.findByTrackingId(feedback.getTrackingId());

        if (parcelOpt.isEmpty()) {
            return ResponseEntity.badRequest().body("❌ Parcel not found.");
        }

        Parcel parcel = parcelOpt.get();

        // 2. Allow only if status is "delivered"
        if (!"delivered".equalsIgnoreCase(parcel.getStatus())) {
            return ResponseEntity.badRequest().body("⛔ Feedback allowed only after delivery.");
        }

        // 3. Optional: Check if feedback already exists for this user+parcel
        boolean alreadySubmitted = feedbackRepository.existsByTrackingIdAndUsername(
                feedback.getTrackingId(), feedback.getUsername());

        if (alreadySubmitted) {
            return ResponseEntity.badRequest().body("⚠️ Feedback already submitted for this parcel.");
        }

        // 4. Save feedback
        Feedback saved = feedbackRepository.save(feedback);
        return ResponseEntity.ok(saved);
    }

    @GetMapping("/all")
    public List<Feedback> getAllFeedbacks() {
        System.out.println("📥 Fetching all feedbacks...");
        return feedbackRepository.findAll();
    }

}
