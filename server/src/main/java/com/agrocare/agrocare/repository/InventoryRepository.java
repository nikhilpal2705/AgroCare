package com.agrocare.agrocare.repository;

import com.agrocare.agrocare.model.Inventory;
import com.agrocare.agrocare.model.Users;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface InventoryRepository extends JpaRepository<Inventory, Integer> {
    List<Inventory> findAllByUser(Users userFromHeader, Sort id);

    @Modifying
    @Query("DELETE FROM Inventory cm WHERE cm.id = :inventoryId")
    void deleteMonitorById(@Param("inventoryId") int inventoryId);

    Object countByUser(Users user);
}
