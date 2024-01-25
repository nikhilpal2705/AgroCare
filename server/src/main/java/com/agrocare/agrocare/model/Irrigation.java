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

import java.util.Date;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Table(name = "irrigation")
public class Irrigation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user")
    @JsonIgnore
    private Users user;

    @ManyToOne
    @JoinColumn(name = "crop")
    @JsonIgnore
    private Crops crop;

    @JsonProperty("scheduleDate")
    @Column(name = "scheduleDate", nullable = false)
    private String scheduleDate;

    @JsonProperty("status")
    @Column(name = "status", nullable = false)
    private int status = Constants.Status.INACTIVE;

    @CreatedDate
    @JsonProperty("createdAt")
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt = String.valueOf(new Date().toInstant());

    @LastModifiedDate
    @JsonProperty("updatedAt")
    @Column(name = "updatedAt", nullable = false)
    private String updatedAt = String.valueOf(new Date().toInstant());

    public Irrigation(Users user, Crops crop, String scheduleDate, int status) {
        this.user = user;
        this.crop = crop;
        this.scheduleDate = scheduleDate;
        this.status = status;
    }

    public Irrigation(int id, Users user, Crops crop, String scheduleDate, int status) {
        this.id = id;
        this.user = user;
        this.crop = crop;
        this.scheduleDate = scheduleDate;
        this.status = status;
    }
}
