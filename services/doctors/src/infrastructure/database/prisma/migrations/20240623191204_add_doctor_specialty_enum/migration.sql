/*
  Warnings:

  - The `specialties` column on the `Doctor` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "DoctorSpecialty" AS ENUM ('GENERAL', 'PEDIATRIC', 'CARDIOLOGIST', 'NEUROLOGIST');

-- AlterTable
ALTER TABLE "Doctor" DROP COLUMN "specialties",
ADD COLUMN     "specialties" "DoctorSpecialty"[];
