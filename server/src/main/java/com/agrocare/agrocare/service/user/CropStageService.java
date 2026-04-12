package com.agrocare.agrocare.service.user;

import com.agrocare.agrocare.model.Crops;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Service
public class CropStageService {

    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ISO_LOCAL_DATE;

    /**
     * Calculate estimated crop stage based on planting date and crop type
     * Returns one of: seedling, vegetative, flowering, fruiting, maturity
     */
    public String estimateCropStage(Crops crop) {
        if (crop.getPlantingDate() == null || crop.getPlantingDate().isEmpty()) {
            return null;
        }

        try {
            LocalDate plantingDate = LocalDate.parse(crop.getPlantingDate(), dateFormatter);
            LocalDate today = LocalDate.now();
            long daysSincePlanting = ChronoUnit.DAYS.between(plantingDate, today);

            // Generic growth stage estimation (customize per crop type)
            // These are approximate ranges in days for most crops
            if (daysSincePlanting < 7) {
                return "seedling";
            } else if (daysSincePlanting < 30) {
                return "vegetative";
            } else if (daysSincePlanting < 60) {
                return "flowering";
            } else if (daysSincePlanting < 90) {
                return "fruiting";
            } else {
                return "maturity";
            }
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Get estimated days to maturity based on planting date and crop type
     */
    public Long getEstimatedDaysToMaturity(Crops crop) {
        if (crop.getPlantingDate() == null || crop.getPlantingDate().isEmpty()) {
            return null;
        }

        try {
            LocalDate plantingDate = LocalDate.parse(crop.getPlantingDate(), dateFormatter);
            LocalDate today = LocalDate.now();
            long daysSincePlanting = ChronoUnit.DAYS.between(plantingDate, today);

            // Approximate total growth period (customize per crop)
            int totalGrowthDays = 120; // Default 4 months
            
            long daysRemaining = totalGrowthDays - daysSincePlanting;
            return Math.max(daysRemaining, 0);
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Get fertilizer recommendation based on crop stage
     */
    public String getFertilizerRecommendation(String cropStage) {
        switch (cropStage) {
            case "seedling":
                return "High Nitrogen (N) - for leaf growth";
            case "vegetative":
                return "Balanced NPK - continue nitrogen for growth";
            case "flowering":
                return "Phosphorus & Potassium (P & K) - support flower formation";
            case "fruiting":
                return "Potassium rich - support fruit development";
            case "maturity":
                return "Reduce fertilizer - prepare for harvest";
            default:
                return "No specific recommendation";
        }
    }

    /**
     * Get irrigation recommendation based on crop stage
     */
    public String getIrrigationRecommendation(String cropStage) {
        switch (cropStage) {
            case "seedling":
                return "Frequent, light irrigation - keep soil moist";
            case "vegetative":
                return "Regular irrigation - maintain consistent moisture";
            case "flowering":
                return "Moderate irrigation - avoid waterlogging";
            case "fruiting":
                return "Adequate irrigation - critical stage";
            case "maturity":
                return "Reduce irrigation - prepare for harvest";
            default:
                return "Follow field capacity guidelines";
        }
    }
}
