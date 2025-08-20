package com.dao;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.model.User;
import com.repository.UserRepository;

@Repository
public class UserDao {

    @Autowired
    private UserRepository userRepository;

    public List<User> findAll() {
        return userRepository.findAll();
    }

    public User save(User user) {
        return userRepository.save(user);
    }

    public Optional<User> findById(Long id) {
        return userRepository.findById(id);
    }

    public void deleteById(Long id) {
        userRepository.deleteById(id);
    }

    public User findByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    public User findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
    public boolean existsById(Long id) {
        return userRepository.existsById(id);
    }
    
    public List<User> searchUsers(String keyword) {
        return userRepository.findByNameContainingIgnoreCaseOrEmailContainingIgnoreCaseOrPhoneNumberContainingIgnoreCase(
            keyword, keyword, keyword
        );
    }

    

}
