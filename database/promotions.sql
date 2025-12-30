-- Create promotions table
CREATE TABLE IF NOT EXISTS promotions (
  _id INT AUTO_INCREMENT PRIMARY KEY,
  code VARCHAR(50) DEFAULT NULL,
  title VARCHAR(255) NOT NULL,
  titleAr VARCHAR(255) DEFAULT NULL,
  description TEXT,
  descriptionAr TEXT DEFAULT NULL,
  discountType ENUM('percentage', 'fixed') DEFAULT 'percentage',
  discountValue DECIMAL(10, 2) NOT NULL,
  isActive BOOLEAN DEFAULT FALSE,
  startDate DATETIME DEFAULT NULL,
  endDate DATETIME DEFAULT NULL,
  imageUrl VARCHAR(500) DEFAULT NULL,
  buttonText VARCHAR(100) DEFAULT 'Voir l\'offre',
  buttonTextAr VARCHAR(100) DEFAULT 'شاهد العرض',
  buttonLink VARCHAR(500) DEFAULT NULL,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX idx_isActive (isActive),
  INDEX idx_dates (startDate, endDate)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

