CREATE TABLE IF NOT EXISTS "recipes" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"url" varchar(1024) NOT NULL,
	"labels" text[],
	"date_added" timestamp with time zone DEFAULT now() NOT NULL
);
