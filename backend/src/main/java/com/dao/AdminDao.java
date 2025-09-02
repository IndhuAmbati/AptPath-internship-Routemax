package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.model.Admin;
import com.repository.AdminRepository;

@Repository
public class AdminDao {

    @Autowired
    private AdminRepository adminRepository;

    public List<Admin> findAll() {
        return adminRepository.findAll();
    }

    public Admin save(Admin admin) {
        return adminRepository.save(admin);
    }

    public Optional<Admin> findById(Long id) {
        return adminRepository.findById(id);
    }

    public void deleteById(Long id) {
        adminRepository.deleteById(id);
    }

    public Admin findByUsername(String username) {
        return adminRepository.findByUsername(username);
    }
}
