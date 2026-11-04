-- Seed initial superadmin user for Snappie Photobooth Backoffice
-- Default Credentials for local development:
-- Username: admin
-- Password: admin (or hashed with bcrypt cost factor 10)

INSERT INTO public."admin" (id_admin, nama_admin, username, password_hash, "role")
VALUES (1, 'Administrator Utama', 'admin', '$2y$10$N9qo8uLOickgx2ZMRZoMye2uQg6z/Zf1/4C9Mt6QFqJ8VHcHcSJdW', 'superadmin')
ON CONFLICT (id_admin) DO NOTHING;
