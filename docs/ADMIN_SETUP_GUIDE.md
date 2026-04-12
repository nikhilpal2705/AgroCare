# AgroCare Admin User Setup Guide

## Overview

This guide covers how to create and manage admin users in AgroCare for development and production environments.

> **Automation**: First admin is created automatically via Flyway migrations when the application starts for the first time.

## Quick Start

1. Edit [server/src/main/resources/db/migration/V001__init_admin.sql](server/src/main/resources/db/migration/V001__init_admin.sql) with your admin name, email, and BCrypt password hash.
2. Start the backend with `cd server && ./mvnw spring-boot:run`.
3. Flyway runs the migration automatically and creates the first admin.
4. Login with that account and create additional admins from the admin dashboard.

---

## Creating the First Admin User (Production & Development)

### Method: SQL Script Only

#### Step 1: Update SQL Script
Edit `server/src/main/resources/db/migration/V001__init_admin.sql` with your credentials:

```sql
INSERT INTO users (
    name, email, password, authorities, ...
) VALUES (
    'Your Admin Name',
    'admin@yourdomain.com',
    '$2a$10$...bcrypt_hash...',  -- Generate using steps below
    'ADMIN',
    ...
);
```

#### Step 2: Generate BCrypt Password Hash

**Option A: Online Tool** (Quick)
- Visit https://bcrypt.online/
- Enter your desired password
- Copy the generated hash

**Option B: Command Line** (Recommended)

```bash
# Using Python
python3 -c "import bcrypt; print(bcrypt.hashpw(b'Your@Password123', bcrypt.gensalt()).decode())"

# Using OpenSSL + bcrypt gem (if installed)
echo 'Your@Password123' | bcrypt
```

**Password Requirements:**
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*)

Example: `Admin@123` or `SecureP@ssw0rd!`

#### Step 3: Execute SQL Script

**Automatic Execution** ✅

The SQL migration now runs automatically when the application starts:

1. Application boots up
2. Spring Flyway checks `db/migration/` folder
3. Flyway finds `V001__init_admin.sql`
4. Admin user is created in database
5. Application is ready with first admin

**No manual SQL execution needed!**

#### Step 4: Verify Admin Creation

```bash
# Query the database
mysql -u root -p agrocare_db
SELECT id, name, email, authorities, enabled FROM users WHERE authorities='ADMIN';
```

Expected output:
```
| id | name          | email               | authorities | enabled |
|----|---------------|----------------------|-------------|---------|
| 1  | Administrator | admin@agrocare.local | ADMIN       | 1       |
```

---

## First Admin Login & Password Change

### Initial Login
1. Open AgroCare application
2. Navigate to login page
3. Enter email and password from `V001__init_admin.sql`
4. Click "Login"

### Forced Password Change (Recommended Feature)
When logged in for the first time:
1. You'll see a "Change Password" prompt
2. Enter a new strong password
3. Confirm the password
4. Click "Update"
5. You'll be logged out and can login with new password

> **Note**: The password change feature requires a `must_change_password` flag in the Users model.

---

## Creating Additional Admin Users

### From Admin Dashboard

After the first admin is logged in:

1. **Navigate to Admin Dashboard**
   ```
   Admin Menu → Admin Dashboard → Farmers/Admins Section
   ```

2. **Click "Create New Admin" Button**
   - A modal form will appear
   - Fill in:
     - Full Name
     - Email Address
     - Strong Password (8+ chars with uppercase, lowercase, number, special char)
     - Confirm Password
     - Preferred Language

3. **Submit**
   - System validates password strength
   - Creates new admin user in database
   - Page reloads and shows new admin in list

### Backend API Endpoint (Internal Use Only)

```
POST /admin/manage/admins

Headers:
  Authorization: Bearer <JWT_TOKEN>
  Content-Type: application/json

Request Body:
{
  "name": "New Admin",
  "email": "newadmin@agrocare.com",
  "password": "NewAdmin@123",
  "preferredLanguage": "en"
}

Response:
{
  "success": true,
  "message": "Admin user created successfully",
  "data": {
    "id": 2,
    "name": "New Admin",
    "email": "newadmin@agrocare.com",
    "authorities": "ADMIN"
  }
}
```

**Security:**
- Requires valid JWT token
- Must be authenticated as ADMIN user
- Protected by `@PreAuthorize("hasAuthority('ADMIN')")`
- No public API access

---

## Architecture Overview

### Three-Tier Admin Security Model

```
┌─────────────────────────────────────────┐
│     First Admin Creation                │
│     (Production - SQL Only)             │
│     ✓ No API exposure                   │
│     ✓ Manual, explicit action           │
│     ✓ Audit trail in SQL                │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│     Second+ Admin Creation              │
│     (Via UI Form - Admin Only)          │
│     ✓ Accessible only to existing admin │
│     ✓ Strong password validation        │
│     ✓ Protected endpoint                │
└─────────────────────────────────────────┘
                   ↓
┌─────────────────────────────────────────┐
│     Admin Actions                       │
│     (Authenticated via JWT)             │
│     ✓ Create users                      │
│     ✓ Manage permissions                │
│     ✓ View analytics                    │
└─────────────────────────────────────────┘
```

### File Structure

```
AgroCare/
├── server/
│   └── src/main/resources/
│       └── db/migration/
│           └── V001__init_admin.sql       ← First admin setup
│   └── src/main/java/.../
│       ├── AdminController.java           ← Manages admin operations
│       └── AdminService.java              ← Business logic
└── client/
    └── src/components/admin/
        ├── AdminUsers.jsx                 ← Admin list & management
        └── AdminCreateUser.jsx            ← Create admin form
```

---

## Security Best Practices

### ✅ Do This
- **SQL Only** for first admin in production
- **Strong passwords**: Mix of character types
- **Change default** password on first login
- **Audit logs**: Track admin creation and actions
- **JWT tokens**: Use for all subsequent requests
- **HTTPS**: Always use in production
- **Secure storage**: Keep SQL hashes in version control (they're already hashed)

### ❌ Don't Do This
- ❌ Hardcode plaintext passwords in code
- ❌ Use weak passwords like `admin123`
- ❌ Share admin credentials in chat/email
- ❌ Create admin via public API
- ❌ Commit BCrypt hashes with plaintext passwords
- ❌ Use auto-initialization in production
- ❌ Reuse passwords across accounts

---

## Troubleshooting

### "Admin user already exists" Error
```bash
# Delete existing admin and retry
mysql -u root -p agrocare_db -e "DELETE FROM users WHERE authorities='ADMIN';"
```

### "Email already exists" Error
```bash
# Use a different email address OR
# Update existing user
mysql -u root -p agrocare_db
UPDATE users SET name='New Name' WHERE email='admin@agrocare.local';
```

### "Permission Denied" when executing SQL
```bash
# Ensure you have database write permissions
# Use admin credentials:
mysql -h localhost -u admin -p agrocare_db < server/src/main/resources/db/migration/V001__init_admin.sql
```

### "Cannot login" after SQL setup
1. Verify SQL execution completed: `SELECT * FROM users WHERE authorities='ADMIN';`
2. Check email and password match
3. Ensure `enabled=1` in database
4. Check JWT configuration in `application.properties`

### Password Hash Not Working
1. Regenerate BCrypt hash: https://bcrypt.online/
2. Copy hash WITHOUT quotes
3. Update SQL script: `password = '$2a$10$...'`
4. Re-execute SQL

---

## Environment Variables

### Development
```properties
# application.properties
DATABASE_URL=jdbc:mysql://localhost:3306/agrocare_db
DATABASE_USER=root
DATABASE_PASSWORD=root
JWT_SECRET=your_dev_secret_key
```

### Production (Azure)
```properties
# application.properties or Azure Key Vault
SPRING_DATASOURCE_URL=jdbc:mysql://myserver.mysql.database.azure.com/agrocare_db?useSSL=true
SPRING_DATASOURCE_USERNAME=admin@myserver
SPRING_DATASOURCE_PASSWORD=${DB_PASSWORD}  # From Key Vault
JWT_SECRET=${JWT_SECRET}                    # From Key Vault
ADMIN_TEMP_PASSWORD=${ADMIN_PASSWORD}       # For V001__init_admin.sql
```

---

## Deployment Checklist

- [ ] Generate strong BCrypt password hash
- [ ] Update V001__init_admin.sql with:
  - [ ] Admin name
  - [ ] Admin email
  - [ ] Password hash
- [ ] Execute SQL script on production database
- [ ] Verify admin creation: `SELECT * FROM users WHERE authorities='ADMIN';`
- [ ] Test first admin login
- [ ] Change default password (if using provided defaults)
- [ ] Create additional admins via UI
- [ ] Test admin dashboard functionality
- [ ] Review audit logs
- [ ] Document credentials in secure location (password manager)

---

## References

- [BCrypt Hash Generator](https://bcrypt.online/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Azure MySQL Tutorials](https://learn.microsoft.com/en-us/azure/mysql/)
- [JWT Best Practices](https://tools.ietf.org/html/rfc8725)

---

**Last Updated**: April 12, 2026  
**Version**: 1.0  
**Status**: Production-Ready
