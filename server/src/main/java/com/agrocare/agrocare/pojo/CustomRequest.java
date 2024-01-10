package com.agrocare.agrocare.pojo;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Builder
public class CustomRequest {

    private int userId;
    private Object data;
}
