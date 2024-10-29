package com.alertnet.backend.util;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;

import javax.crypto.SecretKey;
import java.util.Date;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

public class JwtUtil {

    private static final String SECRET = "VGhpcyBpcyBhIHZlcnkgc3Ryb25nIHNlY3JldCBrZXkgZm9yIEpXVCBzZWN1cml0eQ==";
    private static final SecretKey SECRET_KEY = Keys.hmacShaKeyFor(Base64.getDecoder().decode(SECRET));

    public static String generateToken(Long id, String username) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("id", id);
        claims.put("username", username);

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 1 day expiration
                .signWith(SECRET_KEY)
                .compact();
    }

    // Validate a JWT token and return claims
    public static Claims validateToken(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(SECRET_KEY)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    public static String extractUsername(String token) {
        return validateToken(token).getSubject();
    }

    public static Long extractId(String token) {
        Claims claims = validateToken(token);
        return claims.get("id", Long.class);
    }
}
