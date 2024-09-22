package com.steven.filmproject.controller;

import com.steven.filmproject.model.AuthenticationResponse;
import com.steven.filmproject.model.LoginRequest;
import com.steven.filmproject.model.Member;
import com.steven.filmproject.model.RegisterRequest;
import com.steven.filmproject.service.AuthenticationService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
//handles authentication requests
public class AuthenticationController {

    private final AuthenticationService authenticationService;

    public AuthenticationController(AuthenticationService authenticationService) {
        this.authenticationService = authenticationService;
    }

    //handles the register request
    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(@RequestBody RegisterRequest request) {
        // Convert RegisterRequest to Member
        Member member = toMember(request);
        // Log the incoming request for debugging
        System.out.println("Register request received: " + member);
        return ResponseEntity.ok(authenticationService.register(member));
    }

    //handles the login request
    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequest request) {
        // Convert LoginRequest to Member
        Member member = toMember(request);
        return ResponseEntity.ok(authenticationService.authenticate(member));
    }

    //converts the registerequest into a member object
    private Member toMember(RegisterRequest request) {
        Member member = new Member();
        member.setFirstName(request.getFirstName());
        member.setLastName(request.getLastName());
        member.setUsername(request.getUsername());
        member.setPassword(request.getPassword());
        member.setRole(request.getRole());
        return member;
    }

    //converts the loginrequest into the member object
    private Member toMember(LoginRequest request) {
        Member member = new Member();
        member.setUsername(request.getUsername());
        member.setPassword(request.getPassword());
        return member;
    }
}
