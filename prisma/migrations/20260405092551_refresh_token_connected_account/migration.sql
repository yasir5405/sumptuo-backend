/*
  Warnings:

  - The values [META] on the enum `Platform` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `refreshToken` to the `ConnectedAccount` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "Platform_new" AS ENUM ('GOOGLE');
ALTER TABLE "ConnectedAccount" ALTER COLUMN "platform" TYPE "Platform_new" USING ("platform"::text::"Platform_new");
ALTER TYPE "Platform" RENAME TO "Platform_old";
ALTER TYPE "Platform_new" RENAME TO "Platform";
DROP TYPE "public"."Platform_old";
COMMIT;

-- AlterTable
ALTER TABLE "ConnectedAccount" ADD COLUMN     "refreshToken" TEXT NOT NULL;
