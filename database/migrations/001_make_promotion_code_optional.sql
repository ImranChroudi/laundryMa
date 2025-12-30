-- Migration: Make promotion code optional
-- This migration updates the promotions table to make the code field optional
-- and updates default button text to remove code references

-- Step 1: Remove UNIQUE constraint from code (if exists)
ALTER TABLE promotions MODIFY COLUMN code VARCHAR(50) DEFAULT NULL;

-- Step 2: Update default button text values
ALTER TABLE promotions MODIFY COLUMN buttonText VARCHAR(100) DEFAULT 'Voir l\'offre';
ALTER TABLE promotions MODIFY COLUMN buttonTextAr VARCHAR(100) DEFAULT 'شاهد العرض';

-- Step 3: Update existing records to have new default button text if they have old defaults
UPDATE promotions 
SET buttonText = 'Voir l\'offre' 
WHERE buttonText = 'Utiliser le code' OR buttonText IS NULL;

UPDATE promotions 
SET buttonTextAr = 'شاهد العرض' 
WHERE buttonTextAr = 'استخدم الكود' OR buttonTextAr IS NULL;

