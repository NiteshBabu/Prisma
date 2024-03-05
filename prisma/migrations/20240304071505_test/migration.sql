-- DropIndex
DROP INDEX "Post_authorId_key";

-- DropIndex
DROP INDEX "User_email_name_key";

-- AlterTable
ALTER TABLE "Post" ADD CONSTRAINT "Post_pkey" PRIMARY KEY ("id");
