package com.dao;

import java.util.List;
import com.model.Parcel;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Repository;

@Repository
@Transactional
public class ParcelDao {

    @PersistenceContext
    private EntityManager entityManager;

    public List<Parcel> findAll() {
        return entityManager.createQuery("FROM Parcel", Parcel.class).getResultList();
    }

    public void save(Parcel parcel) {
        // if parcel has id => merge; else persist
        if (parcel.getId() == null) {
            entityManager.persist(parcel);
        } else {
            entityManager.merge(parcel);
        }
    }

    public Parcel findById(Long id) {
        return entityManager.find(Parcel.class, id);
    }

    public void deleteById(Long id) {
        Parcel parcel = findById(id);
        if (parcel != null) {
            entityManager.remove(parcel);
        }
    }
}
