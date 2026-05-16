package com.agrocare.agrocare.configuration.db;

import org.flywaydb.core.Flyway;
import org.springframework.boot.ApplicationRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import javax.sql.DataSource;
import lombok.extern.slf4j.Slf4j;

import java.util.Arrays;

/**
 * Executes Flyway database migrations AFTER Hibernate schema creation.
 * 
 * Configuration Flow:
 * 1. Spring Boot starts, Hibernate creates/updates schema
 * 2. All beans are initialized (EntityManager, DataSource ready)
 * 3. ApplicationRunner bean executes after Spring context is fully ready
 * 4. Flyway migrations run (admin seed script)
 * 
 * Why this order matters:
 * - Flyway must run AFTER Hibernate creates tables
 * - If Flyway runs before, tables don't exist and INSERT statements fail
 * - ApplicationRunner is guaranteed to run after all bean initialization
 */
@Slf4j
@Configuration
public class FlywayConfig {

    /**
     * Create and run Flyway migrations after Spring application is fully initialized.
     * This ensures Hibernate has already created all database tables.
     */
    @Bean
    public ApplicationRunner runFlywayAfterHibernate(DataSource dataSource) {
        return args -> {
            Flyway flyway = Flyway.configure()
                    .dataSource(dataSource)
                    .locations("classpath:db/migration")
                    .baselineOnMigrate(true)
                    .baselineVersion("0")
                    .outOfOrder(false)
                    .validateOnMigrate(true)
                    .load();

            try {
                log.info("▶ Starting Flyway migrations after Hibernate schema creation...");

                boolean hasFailedMigrations = Arrays.stream(flyway.info().all())
                        .anyMatch(migrationInfo -> migrationInfo.getState().isFailed());

                if (hasFailedMigrations) {
                    log.warn("Detected failed Flyway history entries. Repairing schema history before migration...");
                    flyway.repair();
                }

                var result = flyway.migrate();

                log.info("✓ Flyway migration completed successfully");
                log.info("  Migrations executed: {}", result.migrationsExecuted);
            } catch (Exception e) {
                log.error("✗ Flyway migration failed: {}", e.getMessage());
                throw new RuntimeException("Database migration failed: " + e.getMessage(), e);
            }
        };
    }
}
