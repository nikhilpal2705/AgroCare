package com.agrocare.agrocare.pojo;

import com.agrocare.agrocare.helper.Constants;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class IrrigationRequest {
    private int id;
    private int userId;
    private int cropId;
    private String scheduledDate;
    private int status = Constants.Status.INACTIVE;
}
