package com.steven.filmproject.repository;

import com.steven.filmproject.model.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

//provides way to interact with member in the database CRUD
public interface MemberRepository extends JpaRepository <Member, Integer> {

    Optional <Member> findByUsername(String username);
}
