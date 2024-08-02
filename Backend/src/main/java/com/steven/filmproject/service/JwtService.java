package com.steven.filmproject.service;

import com.steven.filmproject.model.Member;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.function.Function;

@Service
public class JwtService {
    //this validates the jwt tokens that are provided on registering and logging in
    private final String SECRET_KEY ="31d6d3721e2051a701b03482a8ba03ee03f6df67302aa7091360637acc811888";

    //extracts the user name from the token
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    //validates the jwt by checking idf the username in the jwt matches the userDetails
    public boolean isValid(String token, UserDetails member) {
        String username = extractUsername(token);
        return (username.equals(member.getUsername())) && !isTokenExpired(token);
    }

    //Checks if the token is expired
    private boolean isTokenExpired(String token) {
        return extractExpiration(token).before(new Date());
    }

    //Extracts the expiration dare form the token
    private Date extractExpiration(String token) {
        return extractClaim(token, Claims::getExpiration);
    }

    //extracts claim form the jwt
    public <T> T extractClaim(String token, Function<Claims, T> resolver) {
        Claims claims = extractAllClaims(token);
        return resolver.apply(claims);
    }


    //extracts all of the claims
    private Claims extractAllClaims(String token) {
        return Jwts
                .parser()
                .verifyWith(getSigninKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
    }

    //genereates a token for member
    public String generateToken(Member member){
        String token = Jwts
                .builder()
                .subject(member.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 24*60*60*1000))
                .signWith(getSigninKey())
                .compact();

        return token;
    }

    //retrieves the signinkey
    private SecretKey getSigninKey(){
        byte[] keyBytes = Decoders.BASE64.decode(SECRET_KEY);
        return Keys.hmacShaKeyFor(keyBytes);
    }
}
