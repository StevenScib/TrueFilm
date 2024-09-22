package com.steven.filmproject.model;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

//validates the data submitted by users when they log in
public class LoginRequest {
    @NotEmpty
    private String username;

    @NotEmpty
    @Size(min = 8)
    private String password;

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
}