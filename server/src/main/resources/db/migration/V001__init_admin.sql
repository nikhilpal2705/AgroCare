-- ═══════════════════════════════════════════════════════════════════════════════
-- AGROCARE - Initial Admin User Setup Script
-- ═══════════════════════════════════════════════════════════════════════════════
--
-- PURPOSE: Create FIRST admin user for both local development and production
-- 
-- WHEN TO USE THIS:
--   ✓ First deployment to production
--   ✓ Local development setup
--   ✗ NOT for creating additional admins (use UI dashboard instead)
--
-- SECURITY REQUIREMENTS:
--   • This is the ONLY way to create the first admin user
--   • No public API endpoint exists for this
--   • Requires direct database access
--   • Password must be strong and changed on first login
--
-- INSTRUCTIONS:
--   1. Generate a BCrypt password hash (see PASSWORD GENERATION section below)
--   2. Edit the INSERT VALUES below with your credentials
--   3. Flyway runs this migration automatically on application startup
--   4. Login with the email and original password
--   5. CHANGE DEFAULT PASSWORD on first login (use your profile settings)
--   6. For additional admins: Use Admin Dashboard → Farmers page → "Create New Admin"
--
-- PASSWORD GENERATION:
--
--   OPTION A: Online (Quick & Easy)
--     Visit: https://bcrypt.online/
--     Enter your password (e.g., "SecureP@ss123")
--     Copy the generated hash
--
--   OPTION B: Command Line (Recommended)
--     Python: python3 -c "import bcrypt; print(bcrypt.hashpw(b'SecureP@ss123', bcrypt.gensalt()).decode())"
--     macOS:  brew install bcrypt && echo "SecureP@ss123" | bcrypt
--
-- PASSWORD REQUIREMENTS:
--   ✓ Minimum 8 characters
--   ✓ At least 1 UPPERCASE letter (A-Z)
--   ✓ At least 1 lowercase letter (a-z)
--   ✓ At least 1 number (0-9)
--   ✓ At least 1 special character (!@#$%^&*)
--
-- EXAMPLES:
--   ✓ Good: Admin@123, SecureP@ss456!, MyAdm!n2024
--   ✗ Bad:  admin123, password, Admin123 (no special char)
--
-- DEFAULT CREDENTIALS (if using example hash below):
--   Email:    admin@agrocare.local
--   Password: Admin@123
--   ⚠️  You MUST change this password after first login!
--
-- ═══════════════════════════════════════════════════════════════════════════════

-- Step 1: Delete existing admin (if any) - Comment this out if you want to preserve
-- DELETE FROM users WHERE email='admin@agrocare.local';

-- Step 2: Create first admin user
INSERT INTO users (
    name,                       -- Admin's display name
    email,                      -- Login email address
    password,                   -- BCrypt hashed password
    authorities,                -- Role (must be: ADMIN)
    status,                     -- 1=ACTIVE, 0=INACTIVE
    accountNonExpired,          -- true=Active account
    accountNonLocked,           -- true=Account not locked
    credentialsNonExpired,      -- true=Credentials valid
    enabled,                    -- true=User enabled
    preferredLanguage,          -- UI Language (en, hi, mr, gu, ta, kn, te)
    createdAt,                  -- Creation timestamp
    updatedAt                   -- Last update timestamp
) VALUES (
    'Administrator',                                                    -- Admin name (edit this)
    'admin@agrocare.local',                                             -- Admin email (edit this)
    '$2b$10$aaQcqbDpYQkNJfRn1aVQjeT4neVghVVFFhUD3E/hDbp3hocTjHZ7m',     -- Password hash for default password Admin@123 (EDIT THIS!)
    'ADMIN',                                                            -- Authority (do NOT change)
    1,                                                                  -- Status: ACTIVE
    true,                                                               -- accountNonExpired
    true,                                                               -- accountNonLocked
    true,                                                               -- credentialsNonExpired
    true,                                                               -- enabled
    'en',                                                               -- preferredLanguage
    NOW(),                                                              -- createdAt
    NOW()                                                               -- updatedAt
)
ON DUPLICATE KEY UPDATE 
    name='Administrator', 
    updatedAt=NOW();

-- Step 3: Verify admin creation
SELECT 
    id, 
    name, 
    email, 
    authorities, 
    enabled, 
    createdAt 
FROM users 
WHERE authorities='ADMIN' 
ORDER BY createdAt DESC;

-- ═══════════════════════════════════════════════════════════════════════════════
-- DEPLOYMENT CHECKLIST:
--
-- ✓ BEFORE Running This Script:
--   [ ] Generate BCrypt password hash (see PASSWORD GENERATION above)
--   [ ] Update email address to your admin email
--   [ ] Update name to your admin name
--   [ ] Replace password hash in the INSERT statement
--   [ ] Review the values one more time
--
-- ✓ AFTER Running This Script:
--   [ ] Verify admin creation (see query above for results)
--   [ ] Login with the credentials
--   [ ] CHANGE PASSWORD in user profile
--   [ ] Create additional admins via Admin Dashboard
--   [ ] Test admin dashboard functionality
--   [ ] Document in password manager (securely!)
--
-- ═══════════════════════════════════════════════════════════════════════════════
-- NEXT STEPS AS ADMIN:
-- 
-- 1. Login to AgroCare
--    Email: admin@agrocare.local (or your email)
--    Password: Admin@123 (or your password)
--
-- 2. Navigate to Admin Dashboard
--    Dashboard / Admin Tools / Farmers page
--
-- 3. Create Additional Admins (if needed)
--    Click "Create New Admin" button
--    Fill in name, email, strong password
--
-- 4. Manage Users & Permissions
--    View all users
--    Create/disable farmer accounts
--    View analytics
--
-- ═══════════════════════════════════════════════════════════════════════════════

