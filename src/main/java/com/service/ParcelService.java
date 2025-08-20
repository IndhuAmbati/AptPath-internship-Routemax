package com.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.model.Parcel;
import com.repository.ParcelRepository;

@Service
public class ParcelService {

    @Autowired
    private ParcelRepository parcelRepository;

    @Autowired
    private NotificationService notificationService;

    public Parcel addParcel(Parcel parcel) {
        Parcel saved = parcelRepository.save(parcel);
        String message = String.format(
            "📦 Your parcel (Tracking ID: %s) has been %s and is en route from %s.\nEstimated delivery date: %s.",
            saved.getTrackingId(),
            saved.getStatus().toUpperCase(),
            capitalizeWords(saved.getCurrentLocation()),
            formatDate(saved.getEstimatedDelivery())
        );
        notificationService.sendNotification(saved.getRecipientUsername(), message);
        return saved;
    }

    public Parcel updateParcel(Parcel parcel) {
        Parcel updated = parcelRepository.save(parcel);
        String message = String.format(
            "📦 Your parcel (Tracking ID: %s) status update: %s.\nCurrent location: %s.\nEstimated delivery date: %s.",
            updated.getTrackingId(),
            updated.getStatus().toUpperCase(),
            capitalizeWords(updated.getCurrentLocation()),
            formatDate(updated.getEstimatedDelivery())
        );
        notificationService.sendNotification(updated.getRecipientUsername(), message);
        return updated;
    }

    public void deleteParcel(Long id, String recipientUsername) {
        parcelRepository.deleteById(id);
        String message = "❌ Your parcel has been deleted.";
        notificationService.sendNotification(recipientUsername, message);
    }

    // Format delivery date as "MMMM dd, yyyy" (e.g., July 30, 2025)
    private String formatDate(java.time.LocalDate date) {
        try {
            return date.format(java.time.format.DateTimeFormatter.ofPattern("MMMM dd, yyyy"));
        } catch (Exception e) {
            return date.toString(); // fallback
        }
    }

    // Capitalize first letter of each word (e.g., "sangareddy, hyderabad" → "Sangareddy, Hyderabad")
    private String capitalizeWords(String input) {
        if (input == null) return "";
        String[] words = input.toLowerCase().split("\\s*,\\s*|\\s+");
        StringBuilder sb = new StringBuilder();
        for (int i = 0; i < words.length; i++) {
            if (!words[i].isEmpty()) {
                sb.append(Character.toUpperCase(words[i].charAt(0)))
                  .append(words[i].substring(1));
                if (i < words.length - 1) {
                    sb.append(i % 2 == 0 ? ", " : " ");
                }
            }
        }
        return sb.toString().trim();
    }
}
