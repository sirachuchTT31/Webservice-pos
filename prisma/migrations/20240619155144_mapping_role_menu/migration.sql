-- AlterTable
ALTER TABLE "User" ALTER COLUMN "username" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "password" SET DATA TYPE VARCHAR(100);

-- CreateTable
CREATE TABLE "MappingRoleMenu" (
    "id" SERIAL NOT NULL,
    "menu_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,

    CONSTRAINT "MappingRoleMenu_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterMenu" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR(50) NOT NULL,
    "icon" VARCHAR(255) NOT NULL,
    "is_active" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_by" INTEGER,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_by" INTEGER,

    CONSTRAINT "MasterMenu_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "MappingRoleMenu" ADD CONSTRAINT "MappingRoleMenu_menu_id_fkey" FOREIGN KEY ("menu_id") REFERENCES "MasterMenu"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MappingRoleMenu" ADD CONSTRAINT "MappingRoleMenu_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "MasterRole"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
