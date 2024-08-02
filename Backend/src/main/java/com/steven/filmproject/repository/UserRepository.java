package com.steven.filmproject.repository;

import com.steven.filmproject.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

//provides way to interact with user in the database CRUD
public interface UserRepository extends JpaRepository <User,Long>{
}
