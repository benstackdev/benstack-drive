CREATE TABLE "file_entity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"data" bytea NOT NULL,
	"path" text DEFAULT '/',
	"level" integer DEFAULT 1,
	"created_at" timestamp DEFAULT now(),
	"modified_at" timestamp DEFAULT now(),
	"is_directory" boolean DEFAULT false,
	"is_starred" boolean DEFAULT false,
	"is_trash" boolean DEFAULT false
);
--> statement-breakpoint
ALTER TABLE "file_entity" ADD CONSTRAINT "file_entity_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;