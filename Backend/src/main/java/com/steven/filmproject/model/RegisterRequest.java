package com.steven.filmproject.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

//this model captures and validates the user registration data in the app
public class RegisterRequest {
    @NotEmpty
    private String username;

    @NotEmpty
    @Size(min = 8)
    private String password;

    @NotEmpty
    private String firstName;

    @NotEmpty
    private String lastName;

    private Role role;

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }
}
