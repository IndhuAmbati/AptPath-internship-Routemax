package com.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dao.AdminDao;
import com.dao.UserDao;
import com.model.Admin;
import com.model.User;
import com.service.EmailService;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminDao adminDao;

    @Autowired
    private UserDao userDao;
    @Autowired
    private EmailService emailService;

    // Admin operations
    @GetMapping("/getAllAdmins")
    public List<Admin> getAllAdmins() {
        return adminDao.findAll();
    }

    @PostMapping("/addAdmin")
    public Admin addAdmin(@RequestBody Admin admin) {
        return adminDao.save(admin);
    }

    @PutMapping("/updateAdmin")
    public Admin updateAdmin(@RequestBody Admin admin) {
        return adminDao.save(admin);
    }

    @GetMapping("/getAdminById/{id}")
    public Optional<Admin> getAdminById(@PathVariable Long id) {
        return adminDao.findById(id);
    }

    @DeleteMapping("/deleteAdmin/{id}")
    public void deleteAdmin(@PathVariable Long id) {
        adminDao.deleteById(id);
    }

    @GetMapping("/getAdminByUsername/{username}")
    public Admin getAdminByUsername(@PathVariable String username) {
        return adminDao.findByUsername(username);
    }

    @PostMapping("/login")
    public boolean loginAdmin(@RequestBody Admin admin) {
        Admin existingAdmin = adminDao.findByUsername(admin.getUsername());
        return existingAdmin != null && existingAdmin.getPassword().equals(admin.getPassword());
    }

    // User operations
    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
        return userDao.findAll();
    }

    @PostMapping("/addUser")
    public User addUser(@RequestBody User user) {
        user.setPassword("default123");

        User savedUser = userDao.save(user);

        // Send email after saving
        emailService.sendRegistrationEmail(user.getEmail(), user.getName());

        return savedUser;
    }

    @PutMapping("/updateUser/{id}")
    public User updateUser(@PathVariable Long id, @RequestBody User updatedUser) {
        return userDao.findById(id).map(user -> {
            user.setName(updatedUser.getName());
            user.setEmail(updatedUser.getEmail());
            user.setUsername(updatedUser.getUsername());
            user.setPhoneNumber(updatedUser.getPhoneNumber());
            return userDao.save(user);
        }).orElseThrow(() -> new RuntimeException("User not found"));
    }

    @DeleteMapping("/deleteUser/{id}")
    public void deleteUser(@PathVariable Long id) {
        userDao.deleteById(id);
    }

    @GetMapping("/searchUsers/{keyword}")
    public List<User> searchUsers(@PathVariable String keyword) {
        return userDao.searchUsers(keyword);
    }
}
