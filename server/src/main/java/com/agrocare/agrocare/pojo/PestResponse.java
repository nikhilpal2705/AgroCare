package com.agrocare.agrocare.pojo;

import com.agrocare.agrocare.model.Crops;
import com.agrocare.agrocare.model.Users;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PestResponse {
    private int id;
    private Users user;
    private Crops crop;
    private String pestName;
    private String pestiside;
    private int status;
    private int state;
    private String date;
    private String createdAt;
    private String updatedAt;

    public PestResponse(int id, Users user, String pestName, String pestiside, int status, int state, String date, String createdAt, String updatedAt) {
        this.id = id;
        this.user = user;
        this.pestName = pestName;
        this.pestiside = pestiside;
        this.status = status;
        this.state = state;
        this.date = date;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
}
