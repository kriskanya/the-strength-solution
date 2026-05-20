-- User.id: SERIAL -> UUID v7 (portable; no pg_uuidv7 extension required).
-- https://postgresql.verite.pro/blog/2024/07/15/uuid-v7-pure-sql.html

CREATE OR REPLACE FUNCTION uuid_generate_v7()
RETURNS uuid
LANGUAGE sql
VOLATILE
AS $$
  SELECT encode(
    set_bit(
      set_bit(
        overlay(
          uuid_send(gen_random_uuid())
          PLACING substring(
            int8send(floor(extract(epoch FROM clock_timestamp()) * 1000)::bigint)
            FROM 3
          )
          FROM 1 FOR 6
        ),
        52, 1
      ),
      53, 1
    ),
    'hex'
  )::uuid;
$$;

ALTER TABLE "User" ADD COLUMN "id_new" UUID;

UPDATE "User" SET "id_new" = uuid_generate_v7();

ALTER TABLE "User" ALTER COLUMN "id_new" SET NOT NULL;

ALTER TABLE "ExercisePerformed" ADD COLUMN "userId_new" UUID;

UPDATE "ExercisePerformed" ep
SET "userId_new" = u."id_new"
FROM "User" u
WHERE ep."userId" = u."id";

ALTER TABLE "ExercisePerformed" ALTER COLUMN "userId_new" SET NOT NULL;

ALTER TABLE "ExercisePerformed" DROP CONSTRAINT "ExercisePerformed_userId_fkey";

ALTER TABLE "ExercisePerformed" DROP COLUMN "userId";

ALTER TABLE "ExercisePerformed" RENAME COLUMN "userId_new" TO "userId";

ALTER TABLE "User" DROP CONSTRAINT "User_pkey";

ALTER TABLE "User" DROP COLUMN "id";

ALTER TABLE "User" RENAME COLUMN "id_new" TO "id";

ALTER TABLE "User" ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");

ALTER TABLE "ExercisePerformed" ADD CONSTRAINT "ExercisePerformed_userId_fkey"
  FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

DROP FUNCTION uuid_generate_v7();
