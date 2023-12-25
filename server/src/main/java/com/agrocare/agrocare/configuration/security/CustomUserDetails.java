package com.agrocare.agrocare.configuration.security;

import com.agrocare.agrocare.model.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;

public class CustomUserDetails implements UserDetails {

    private final Users user;

    public CustomUserDetails(Users user) {
        super();
        this.user = user;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        SimpleGrantedAuthority simpleGrantedAuthority = new SimpleGrantedAuthority(user.getRole());
        System.out.println("SimpleGrantedAuthority : "+simpleGrantedAuthority);
        System.out.println(simpleGrantedAuthority.getAuthority());
        ArrayList<SimpleGrantedAuthority> list = new ArrayList<>();
        list.add(simpleGrantedAuthority);
        return list;
    }

    @Override
    public String getPassword() {
        System.out.println("getPassword : "+user.getPassword());
        return user.getPassword();
    }

    @Override
    public String getUsername() {
        System.out.println("getUsername : "+user.getEmail());
        return user.getEmail();
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
