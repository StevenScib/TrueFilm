package com.steven.filmproject.config;
import com.steven.filmproject.filter.JwtAuthenticationFilter;
import com.steven.filmproject.service.MemberDetailsServiceImp;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    private final MemberDetailsServiceImp memberDetailsServiceImp;
    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(MemberDetailsServiceImp memberDetailsServiceImp, JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.memberDetailsServiceImp = memberDetailsServiceImp;
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    //allows url aithentication on login register etc., states how different request are handled and adds the jwt authentication filter
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(req -> req
                        .requestMatchers("/login", "/register", "/users", "/user/**").permitAll()  // Allow public access to these endpoints
                        .anyRequest().authenticated()
                )
                .userDetailsService(memberDetailsServiceImp)
                .sessionManagement(session -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    //creates an instance of bcrptypasswordencoder this will hash the password
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    //this handles authentcation requests
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {
        return configuration.getAuthenticationManager();
    }
}
