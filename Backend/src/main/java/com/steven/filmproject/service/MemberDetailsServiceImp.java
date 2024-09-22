package com.steven.filmproject.service;


import com.steven.filmproject.repository.MemberRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
//sets up the repo to be used for queryig user data
public class MemberDetailsServiceImp implements UserDetailsService {

    private final MemberRepository repository;

    public MemberDetailsServiceImp(MemberRepository repository) {
        this.repository = repository;
    }

    @Override
    //loads the user details by username
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        return repository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }
}
