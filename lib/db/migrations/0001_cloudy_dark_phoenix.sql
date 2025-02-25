ALTER TABLE "recipes" ADD COLUMN "slug" varchar(21);

UPDATE "recipes" SET "slug" = LEFT(
    md5(random()::text || clock_timestamp()::text),
    21
);

-- Now make it NOT NULL and add the unique constraint
ALTER TABLE "recipes" ALTER COLUMN "slug" SET NOT NULL;
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_slug_unique" UNIQUE("slug");