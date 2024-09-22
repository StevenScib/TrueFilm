package com.steven.filmproject.service;

import com.steven.filmproject.model.AuthenticationResponse;
import com.steven.filmproject.model.Member;
import com.steven.filmproject.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;


@Service
//handles user registration and authentication, makes sure that the user credentioa;s are managed and verified and jwt are provided to authenticated users
public class AuthenticationService {

    private final MemberRepository repository;

    private final PasswordEncoder passwordEncoder;

    private final JwtService jwtService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationService(MemberRepository repository, PasswordEncoder passwordEncoder, JwtService jwtService, AuthenticationManager authenticationManager) {
        this.repository = repository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
        this.authenticationManager = authenticationManager;
    }

    //Creates MEmber for database and returns auth token
    public AuthenticationResponse register(Member request) {
        if (repository.findByUsername(request.getUsername()).isPresent()) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Username is already taken");
        }


        Member member = new Member();
        member.setFirstName(request.getFirstName());
        member.setLastName(request.getLastName());
        member.setUsername(request.getUsername());
        member.setPassword(passwordEncoder.encode(request.getPassword()));

        member.setRole(request.getRole());

        member = repository.save(member);

        String token = jwtService.generateToken(member);

        return new AuthenticationResponse(token);

    }

    //Authenticates a user and returns an auth token
    public AuthenticationResponse authenticate(Member request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getUsername(),
                        request.getPassword()
                )
        );

        Member member = repository.findByUsername(request.getUsername()).orElseThrow();
        String token = jwtService.generateToken(member);

        return new AuthenticationResponse(token);
    }

}
