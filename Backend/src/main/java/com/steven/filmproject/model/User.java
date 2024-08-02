package com.steven.filmproject.model;

import jakarta.persistence.*;

@Entity
//this is the  class that contains the data that will be used to store user reviews
public class User {

    @Id
    @GeneratedValue
    private Long id;
    private String film;
    private String username;
    @Lob
    @Column(columnDefinition = "LONGTEXT")
    private String review;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getFilm() {
        return film;
    }

    public void setFilm(String film) {
        this.film = film;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getReview() {
        return review;
    }

    public void setReview(String review) {
        this.review = review;
    }
}
