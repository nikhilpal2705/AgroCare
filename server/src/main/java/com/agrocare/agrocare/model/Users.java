package com.agrocare.agrocare.model;

import com.agrocare.agrocare.helper.Constants;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Date;
import java.util.List;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "users")
public class Users implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;

    @JsonProperty("name")
    @Column(name = "name", nullable = false)
    private String name;

    @JsonProperty("email")
    @Column(name = "email", nullable = false, unique = true)
    private String email;

    @JsonProperty("password")
    @Column(name = "password", nullable = false)
    private String password;

    @JsonProperty("authorities")
    @Column(name = "authorities", nullable = false)
    private String authorities;

    @JsonProperty("status")
    @Column(name = "status", nullable = false)
    private int status = Constants.Status.ACTIVE;

    @JsonProperty("accountNonExpired")
    @Column(name = "accountNonExpired", nullable = false)
    private boolean accountNonExpired = true;

    @JsonProperty("accountNonLocked")
    @Column(name = "accountNonLocked", nullable = false)
    private boolean accountNonLocked = true;

    @JsonProperty("credentialsNonExpired")
    @Column(name = "credentialsNonExpired", nullable = false)
    private boolean credentialsNonExpired = true;

    @JsonProperty("enabled")
    @Column(name = "enabled", nullable = false)
    private boolean enabled = true;

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Crops> crops = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Irrigation> irrigations = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Inventory> cropsMonitor = new ArrayList<>();

    @JsonIgnore
    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Pests> pests = new ArrayList<>();

    @CreatedDate
    @JsonProperty("createdAt")
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt = String.valueOf(new Date().toInstant());

    @LastModifiedDate
    @JsonProperty("updatedAt")
    @Column(name = "updatedAt", nullable = false)
    private String updatedAt = String.valueOf(new Date().toInstant());

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        ArrayList<SimpleGrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority(this.authorities));
        return list;
    }

    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    // return List.of(new SimpleGrantedAuthority(this.role));
    // }

    // @Override
    // public Collection<? extends GrantedAuthority> getAuthorities() {
    // return Collections.singletonList(new SimpleGrantedAuthority(this.role));
    // }

    @Override
    public String getUsername() {
        return this.email;
    }

    @Override
    public boolean isAccountNonExpired() {
        return this.accountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return this.accountNonLocked;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return this.credentialsNonExpired;
    }

    @Override
    public boolean isEnabled() {
        return this.enabled;
    }

}
