import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_projects_tone" AS ENUM('amber', 'blue', 'sand', 'green');
  CREATE TYPE "public"."enum__projects_v_version_tone" AS ENUM('amber', 'blue', 'sand', 'green');
  CREATE TABLE "projects_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "projects_highlights_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "projects_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"tag" varchar
  );
  
  CREATE TABLE "projects_layers_locales" (
  	"title" varchar,
  	"sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_highlights" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_highlights_locales" (
  	"title" varchar,
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_projects_v_version_layers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"tag" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_projects_v_version_layers_locales" (
  	"title" varchar,
  	"sub" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "projects" ADD COLUMN "tone" "enum_projects_tone" DEFAULT 'amber';
  ALTER TABLE "projects" ADD COLUMN "company" varchar DEFAULT 'Mancho Devs';
  ALTER TABLE "projects_locales" ADD COLUMN "tagline" varchar;
  ALTER TABLE "projects_locales" ADD COLUMN "intro" varchar;
  ALTER TABLE "_projects_v" ADD COLUMN "version_tone" "enum__projects_v_version_tone" DEFAULT 'amber';
  ALTER TABLE "_projects_v" ADD COLUMN "version_company" varchar DEFAULT 'Mancho Devs';
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_tagline" varchar;
  ALTER TABLE "_projects_v_locales" ADD COLUMN "version_intro" varchar;
  ALTER TABLE "projects_highlights" ADD CONSTRAINT "projects_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_highlights_locales" ADD CONSTRAINT "projects_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_layers" ADD CONSTRAINT "projects_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "projects_layers_locales" ADD CONSTRAINT "projects_layers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."projects_layers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_highlights" ADD CONSTRAINT "_projects_v_version_highlights_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_highlights_locales" ADD CONSTRAINT "_projects_v_version_highlights_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_highlights"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_layers" ADD CONSTRAINT "_projects_v_version_layers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_projects_v_version_layers_locales" ADD CONSTRAINT "_projects_v_version_layers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_projects_v_version_layers"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "projects_highlights_order_idx" ON "projects_highlights" USING btree ("_order");
  CREATE INDEX "projects_highlights_parent_id_idx" ON "projects_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_highlights_locales_locale_parent_id_unique" ON "projects_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_highlights_locales_parent_id_idx" ON "projects_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "projects_layers_order_idx" ON "projects_layers" USING btree ("_order");
  CREATE INDEX "projects_layers_parent_id_idx" ON "projects_layers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "projects_layers_locales_locale_parent_id_unique" ON "projects_layers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "projects_layers_locales_parent_id_idx" ON "projects_layers_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_highlights_order_idx" ON "_projects_v_version_highlights" USING btree ("_order");
  CREATE INDEX "_projects_v_version_highlights_parent_id_idx" ON "_projects_v_version_highlights" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_highlights_locales_locale_parent_id_uniq" ON "_projects_v_version_highlights_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_highlights_locales_parent_id_idx" ON "_projects_v_version_highlights_locales" USING btree ("_parent_id");
  CREATE INDEX "_projects_v_version_layers_order_idx" ON "_projects_v_version_layers" USING btree ("_order");
  CREATE INDEX "_projects_v_version_layers_parent_id_idx" ON "_projects_v_version_layers" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_projects_v_version_layers_locales_locale_parent_id_unique" ON "_projects_v_version_layers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_projects_v_version_layers_locales_parent_id_idx" ON "_projects_v_version_layers_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "projects_highlights" CASCADE;
  DROP TABLE "projects_highlights_locales" CASCADE;
  DROP TABLE "projects_layers" CASCADE;
  DROP TABLE "projects_layers_locales" CASCADE;
  DROP TABLE "_projects_v_version_highlights" CASCADE;
  DROP TABLE "_projects_v_version_highlights_locales" CASCADE;
  DROP TABLE "_projects_v_version_layers" CASCADE;
  DROP TABLE "_projects_v_version_layers_locales" CASCADE;
  ALTER TABLE "projects" DROP COLUMN "tone";
  ALTER TABLE "projects" DROP COLUMN "company";
  ALTER TABLE "projects_locales" DROP COLUMN "tagline";
  ALTER TABLE "projects_locales" DROP COLUMN "intro";
  ALTER TABLE "_projects_v" DROP COLUMN "version_tone";
  ALTER TABLE "_projects_v" DROP COLUMN "version_company";
  ALTER TABLE "_projects_v_locales" DROP COLUMN "version_tagline";
  ALTER TABLE "_projects_v_locales" DROP COLUMN "version_intro";
  DROP TYPE "public"."enum_projects_tone";
  DROP TYPE "public"."enum__projects_v_version_tone";`)
}
