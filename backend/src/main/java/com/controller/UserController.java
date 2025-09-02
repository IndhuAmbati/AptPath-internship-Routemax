package com.controller;

import com.dao.UserDao;
import com.model.User;
import com.service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/account")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    @Autowired
    private UserDao userDao;

    @Autowired
    private EmailService emailService;

    // Register
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        if (userDao.findByEmail(user.getEmail()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Email already registered");
        }

        if (userDao.findByUsername(user.getUsername()) != null) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body("Username already taken");
        }

        try {
            User savedUser = userDao.save(user);
            emailService.sendRegistrationEmail(savedUser.getEmail(), savedUser.getName()); // ✅ send email
            savedUser.setPassword(null); // Hide password
            return ResponseEntity.ok(savedUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Registration failed");
        }
    }
    
    

    // Get user by email
    @GetMapping("/getByEmail/{email}")
    public User getByEmail(@PathVariable String email) {
        return userDao.findByEmail(email);
    }

    // Get user by username
    @GetMapping("/getByUsername/{username}")
    public User getByUsername(@PathVariable String username) {
        return userDao.findByUsername(username);
    }

    // Update user
    @PutMapping("/update")
    public User update(@RequestBody User user) {
        return userDao.save(user);
    }

    // Delete user
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        userDao.deleteById(id);
    }

    // Login
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> loginData) {
        String email = loginData.get("email");
        String password = loginData.get("password");

        User user = userDao.findByEmail(email);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("User not found");
        }

        if (user.getPassword().equals(password)) {
            user.setPassword(null);
            return ResponseEntity.ok(user);
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Incorrect password");
        }
    }
}
