package com.example.PersonalFinanceTracker.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "users") // 👈 Explicitly set table name to avoid PostgreSQL keyword conflict
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String password;

    private String role;
}
