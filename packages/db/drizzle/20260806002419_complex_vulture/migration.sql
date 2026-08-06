CREATE TABLE "directory_entity" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"user_id" text NOT NULL,
	"isRoot" boolean DEFAULT false NOT NULL,
	"name" text NOT NULL,
	"parent_id" text,
	"path" text DEFAULT '/' NOT NULL,
	"level" integer DEFAULT 1 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"modified_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "file_entity" ADD COLUMN "dir_id" text NOT NULL;--> statement-breakpoint
ALTER TABLE "file_entity" DROP COLUMN "is_directory";--> statement-breakpoint
ALTER TABLE "directory_entity" ADD CONSTRAINT "directory_entity_user_id_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE;--> statement-breakpoint
ALTER TABLE "directory_entity" ADD CONSTRAINT "directory_fk" FOREIGN KEY ("parent_id") REFERENCES "directory_entity"("id");--> statement-breakpoint
ALTER TABLE "file_entity" ADD CONSTRAINT "file_entity_dir_id_directory_entity_id_fkey" FOREIGN KEY ("dir_id") REFERENCES "directory_entity"("id") ON DELETE CASCADE;