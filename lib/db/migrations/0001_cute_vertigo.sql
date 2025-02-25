ALTER TABLE "recipes" ADD COLUMN "slug" varchar(21) NOT NULL;--> statement-breakpoint
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_slug_unique" UNIQUE("slug");