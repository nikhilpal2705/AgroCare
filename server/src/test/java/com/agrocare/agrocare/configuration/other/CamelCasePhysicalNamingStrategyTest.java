package com.agrocare.agrocare.configuration.other;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;

import org.hibernate.boot.model.naming.Identifier;
import org.junit.jupiter.api.Test;

class CamelCasePhysicalNamingStrategyTest {

    @Test
    void shouldKeepColumnNameAndQuotedFlagUnchanged() {
        CamelCasePhysicalNamingStrategy strategy = new CamelCasePhysicalNamingStrategy();
        Identifier original = Identifier.toIdentifier("cropName", true);

        Identifier converted = strategy.toPhysicalColumnName(original, null);

        assertEquals("cropName", converted.getText());
        assertTrue(converted.isQuoted());
    }
}
