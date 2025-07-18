-- DropForeignKey
ALTER TABLE "groupMembers" DROP CONSTRAINT "groupMembers_User_id_fkey";

-- DropForeignKey
ALTER TABLE "groupMembers" DROP CONSTRAINT "groupMembers_group_id_fkey";

-- AddForeignKey
ALTER TABLE "groupMembers" ADD CONSTRAINT "groupMembers_group_id_fkey" FOREIGN KEY ("group_id") REFERENCES "group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "groupMembers" ADD CONSTRAINT "groupMembers_User_id_fkey" FOREIGN KEY ("User_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
