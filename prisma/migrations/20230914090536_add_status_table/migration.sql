-- CreateTable
CREATE TABLE "Status" (
    "postId" TEXT NOT NULL,
    "replyId" TEXT NOT NULL,

    CONSTRAINT "Status_pkey" PRIMARY KEY ("postId","replyId")
);

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Status" ADD CONSTRAINT "Status_replyId_fkey" FOREIGN KEY ("replyId") REFERENCES "Tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
