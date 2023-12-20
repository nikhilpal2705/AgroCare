package com.agrocare.agrocare.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import java.time.Instant;
import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;

    @JsonProperty("name")
    @Column(name = "name", nullable = false)
    private String name;

    @JsonProperty("email")
    @Column(name = "email", nullable = false)
    private String email;

    @JsonProperty("password")
    @Column(name = "password", nullable = false)
    private String password;

    @JsonProperty("agree")
    @Column(name = "agree", nullable = false)
    private boolean agree;

    @JsonProperty("status")
    @Column(name = "status", nullable = false)
    private int status;

    @CreatedDate
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt = Instant.now().toString();

    @LastModifiedDate
    @Column(name = "updatedAt", nullable = false)
    private String updatedAt;

//    @PrePersist
//    public void prePersist() {
//        if (status == 0) {
//            status = 5;
//        }
//    }
}
