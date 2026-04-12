package com.agrocare.agrocare.model;

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
@Table(name = "inventory")
public class Inventory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty("id")
    private int id;

    @ManyToOne
    @JoinColumn(name = "user")
    @JsonIgnore
    private Users user;

    @OneToOne
    @JoinColumn(name = "crop")
    @JsonIgnore
    private Crops crop;

    @JsonProperty("totalStock")
    @Column(name = "totalStock", nullable = false)
    private int totalStock;

    @JsonProperty("availableStock")
    @Column(name = "availableStock", nullable = false)
    private int availableStock;

    @JsonProperty("category")
    @Column(name = "category")
    private String category; // seeds, fertilizer, pesticide, tools

    @JsonProperty("supplier")
    @Column(name = "supplier")
    private String supplier;

    @JsonProperty("costPerUnit")
    @Column(name = "costPerUnit")
    private Double costPerUnit;

    @JsonProperty("expiryDate")
    @Column(name = "expiryDate")
    private String expiryDate;

    @JsonProperty("minimumThreshold")
    @Column(name = "minimumThreshold", nullable = false)
    private int minimumThreshold = 10;

    @CreatedDate
    @JsonProperty("createdAt")
    @Column(name = "createdAt", nullable = false, updatable = false)
    private String createdAt = String.valueOf(new Date().toInstant());

    @LastModifiedDate
    @JsonProperty("updatedAt")
    @Column(name = "updatedAt", nullable = false)
    private String updatedAt = String.valueOf(new Date().toInstant());

    public Inventory(Users user, Crops crop, int totalStock, int availableStock) {
        this.user = user;
        this.crop = crop;
        this.totalStock = totalStock;
        this.availableStock = availableStock;
    }

    public Inventory(int id, Users user, Crops crop, int totalStock, int availableStock) {
        this.id = id;
        this.user = user;
        this.crop = crop;
        this.totalStock = totalStock;
        this.availableStock = availableStock;
    }
}
