package com.steven.filmproject.controller;

import com.steven.filmproject.model.User;
import com.steven.filmproject.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@CrossOrigin("http://localhost:3000")
//handles the http requests for the review database
public class UserController {

    @Autowired
    private UserRepository userRepository;

    //Creates new user review and saves it to database
    @PostMapping("/user")
    public User newUser(@RequestBody User newUser) {
        return userRepository.save(newUser);
    }

    //gets all of the reviews from the database
    @GetMapping("/users")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    //Gets the review base don its id
    @GetMapping("/user/{id}")
    public User getUserById(@PathVariable Long id) {
        return userRepository.findById(id)
                .orElseThrow(() -> new UsernameNotFoundException("User with ID " + id + " not found"));
    }

    //Updates the review on the id stated
    @PutMapping("/user/{id}")
    public User updateUser(@RequestBody User newUser, @PathVariable Long id) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setFilm(newUser.getFilm());
                    user.setReview(newUser.getReview());
                    return userRepository.save(user);
                }).orElseThrow(() -> new UsernameNotFoundException("User with ID " + id + " not found"));
    }

    //Delets the user with the specified id
    @DeleteMapping("/user/{id}")
    public String deleteUser(@PathVariable Long id) {
        if (!userRepository.existsById(id)) {
            throw new UsernameNotFoundException("User with ID " + id + " not found");
        }
        userRepository.deleteById(id);
        return "User with ID " + id + " has been removed.";
    }
}
