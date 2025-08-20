package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.model.Parcel;
import com.repository.ParcelRepository;
import com.service.ParcelService;
@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/parcel")
public class ParcelController {

    @Autowired
    private ParcelService parcelService;

    @Autowired
    private ParcelRepository parcelRepo;

    @GetMapping("/getAllParcels")
    public List<Parcel> getAllParcels() {
        return parcelRepo.findAll();
    }

    @PostMapping("/addParcel")
    public ResponseEntity<String> addParcel(@RequestBody Parcel parcel) {
        if (parcel.getTrackingId() == null || parcel.getTrackingId().isEmpty()) {
            return ResponseEntity.badRequest().body("trackingId cannot be null or empty");
        }

        parcelService.addParcel(parcel);  // 🔄 Changed to use service
        return ResponseEntity.ok("Parcel added");
    }

    @PutMapping("/updateParcel/{id}")
    public ResponseEntity<String> updateParcel(@PathVariable Long id, @RequestBody Parcel parcel) {
        Parcel existing = parcelRepo.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        existing.setTrackingId(parcel.getTrackingId());
        existing.setSender(parcel.getSender());
        existing.setRecipientUsername(parcel.getRecipientUsername());
        existing.setDescription(parcel.getDescription());
        existing.setStatus(parcel.getStatus());
        existing.setLocation(parcel.getLocation());
        existing.setCurrentLocation(parcel.getCurrentLocation());
        existing.setEstimatedDelivery(parcel.getEstimatedDelivery());

        parcelService.updateParcel(existing); // 🔄 Changed to use service
        return ResponseEntity.ok("Parcel updated");
    }

    @DeleteMapping("/deleteParcel/{id}")
    public ResponseEntity<String> deleteParcel(@PathVariable Long id) {
        Parcel existing = parcelRepo.findById(id).orElse(null);
        if (existing == null) {
            return ResponseEntity.notFound().build();
        }

        parcelService.deleteParcel(id, existing.getRecipientUsername()); // 🔄 Changed to use service
        return ResponseEntity.ok("Deleted");
    }

    @GetMapping("/track/{trackingId}")
    public ResponseEntity<Parcel> getByTrackingId(@PathVariable String trackingId) {
        List<Parcel> parcels = parcelRepo.findAll();
        for (Parcel p : parcels) {
            if (p.getTrackingId().equalsIgnoreCase(trackingId)) {
                return ResponseEntity.ok(p);
            }
        }
        return ResponseEntity.notFound().build();
    }
}
