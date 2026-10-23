package com.agrocare.agrocare.pojo;

import com.agrocare.agrocare.helper.Constants;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class PestRequest {
    private int id;
    private int userId;
    private int cropId;
    private String pestName;
    private String pesticide;
    private String severity;
    private String imageUrl;
    private String treatmentPlan;
    private String recheckDate;
    private int status = Constants.Status.ACTIVE;
    private int state;
    private String date;
}
