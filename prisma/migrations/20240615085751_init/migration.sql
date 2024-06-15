-- CreateEnum
CREATE TYPE "Role" AS ENUM ('SUPER_ADMIN', 'ADMIN_COMPANY', 'SALE', 'STOCK', 'ACCOUNT', 'TRIAL_PERIOD');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "first_name" VARCHAR(50) NOT NULL,
    "last_name" VARCHAR(50) NOT NULL,
    "address" VARCHAR(255),
    "district" VARCHAR(100),
    "sub_district" VARCHAR(100),
    "province" VARCHAR(100),
    "zip_code" VARCHAR(5),
    "telephone" VARCHAR(10),
    "username" VARCHAR(50) NOT NULL,
    "password" VARCHAR(50) NOT NULL,
    "first_login" BOOLEAN NOT NULL DEFAULT false,
    "is_active" BOOLEAN NOT NULL DEFAULT true,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserOnRole" (
    "user_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,

    CONSTRAINT "UserOnRole_pkey" PRIMARY KEY ("user_id","role_id")
);

-- CreateTable
CREATE TABLE "UserOnCompany" (
    "user_id" INTEGER NOT NULL,
    "company_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,

    CONSTRAINT "UserOnCompany_pkey" PRIMARY KEY ("user_id","company_id")
);

-- CreateTable
CREATE TABLE "MasterCompany" (
    "id" SERIAL NOT NULL,
    "company_code" VARCHAR(10) NOT NULL,
    "name_th" VARCHAR(50) NOT NULL,
    "name_en" VARCHAR(50) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,

    CONSTRAINT "MasterCompany_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OtpForgotPassword" (
    "id" SERIAL NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "otp" VARCHAR(6) NOT NULL,
    "is_verify" BOOLEAN NOT NULL DEFAULT false,
    "expires" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OtpForgotPassword_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TrialPeriodAccout" (
    "id" SERIAL NOT NULL,
    "due_date" DATE NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,
    "user_id" INTEGER,

    CONSTRAINT "TrialPeriodAccout_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterRole" (
    "id" SERIAL NOT NULL,
    "role_code" VARCHAR(5) NOT NULL,
    "name" "Role" NOT NULL,
    "description" VARCHAR(50) NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,

    CONSTRAINT "MasterRole_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "TrialPeriodAccout_user_id_key" ON "TrialPeriodAccout"("user_id");

-- AddForeignKey
ALTER TABLE "UserOnRole" ADD CONSTRAINT "UserOnRole_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnRole" ADD CONSTRAINT "UserOnRole_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "MasterRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnCompany" ADD CONSTRAINT "UserOnCompany_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnCompany" ADD CONSTRAINT "UserOnCompany_company_id_fkey" FOREIGN KEY ("company_id") REFERENCES "MasterCompany"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TrialPeriodAccout" ADD CONSTRAINT "TrialPeriodAccout_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;
