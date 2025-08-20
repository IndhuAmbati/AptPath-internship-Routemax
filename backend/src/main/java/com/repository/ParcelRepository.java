package com.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.model.Parcel;

public interface ParcelRepository extends JpaRepository<Parcel,Long> {

    @Query(value = "SELECT * FROM parcel ORDER BY CAST(SUBSTRING(tracking_id, 3) AS UNSIGNED) DESC LIMIT 1", nativeQuery = true)
    Parcel findTopByOrderByTrackingIdDesc();
    Optional<Parcel> findByTrackingId(String trackingId);
}
