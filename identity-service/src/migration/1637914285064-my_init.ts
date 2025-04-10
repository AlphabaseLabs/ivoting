import {MigrationInterface, QueryRunner} from "typeorm";

export class myInit1637914285064 implements MigrationInterface {
    name = 'myInit1637914285064'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, CONSTRAINT "UQ_60452c45f2761e3ad56cbb79953" UNIQUE ("value"), CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "upload" ("id" SERIAL NOT NULL, "data" bytea NOT NULL, "user_id" uuid NOT NULL, "file_name" character varying NOT NULL, "original_name" character varying NOT NULL, "file_type" character varying NOT NULL, "mimetype" character varying NOT NULL, "encoding" character varying NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_1fe8db121b3de4ddfa677fc51f3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_status_enum" AS ENUM('ACTIVE', 'DISABLED', 'BLACKLISTED', 'PENDING_ANSWERS', 'PENDING_UPLOADS', 'PENDING_ACCEPTANCE', 'PENDING_PHONE_VERIFICATION', 'PENDING_EMAIL_VERIFICATION')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "uuid" uuid NOT NULL DEFAULT uuid_generate_v4(), "first_name" character varying(255), "last_name" character varying(255), "email" character varying, "national_identity" character varying(30), "passport_nr" character varying(20), "phone_nr" character varying(20) NOT NULL, "password" character varying(64), "status" "public"."user_status_enum" NOT NULL, "wallet_address" character varying, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "elections" character varying array, CONSTRAINT "UQ_a95e949168be7b7ece1a2382fed" UNIQUE ("uuid"), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "UQ_4ff4f121a11e304d8653724ae1e" UNIQUE ("national_identity"), CONSTRAINT "UQ_ca0ed4b2f51989831092a9c3712" UNIQUE ("passport_nr"), CONSTRAINT "UQ_812e21123b9d1794f5a4c52aef2" UNIQUE ("phone_nr"), CONSTRAINT "UQ_ac2af862c8540eccb210b293107" UNIQUE ("wallet_address"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "index_email" ON "user" ("email") `);
        await queryRunner.query(`CREATE INDEX "index_national_identity" ON "user" ("national_identity") `);
        await queryRunner.query(`CREATE INDEX "index_password" ON "user" ("password") `);
        await queryRunner.query(`CREATE INDEX "index_wallet_address" ON "user" ("wallet_address") `);
        await queryRunner.query(`CREATE TABLE "answer" ("id" SERIAL NOT NULL, "value" character varying NOT NULL, "user_id" uuid NOT NULL, "question_id" integer NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "deletedAt" TIMESTAMP, CONSTRAINT "PK_9232db17b63fb1e94f97e5c224f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "upload" ADD CONSTRAINT "FK_ea69a221d94b98c476875cec7d5" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194" FOREIGN KEY ("question_id") REFERENCES "question"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "answer" ADD CONSTRAINT "FK_add8ab72aec4ce5eb87fdc2740d" FOREIGN KEY ("user_id") REFERENCES "user"("uuid") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_add8ab72aec4ce5eb87fdc2740d"`);
        await queryRunner.query(`ALTER TABLE "answer" DROP CONSTRAINT "FK_c3d19a89541e4f0813f2fe09194"`);
        await queryRunner.query(`ALTER TABLE "upload" DROP CONSTRAINT "FK_ea69a221d94b98c476875cec7d5"`);
        await queryRunner.query(`DROP TABLE "answer"`);
        await queryRunner.query(`DROP INDEX "public"."index_wallet_address"`);
        await queryRunner.query(`DROP INDEX "public"."index_password"`);
        await queryRunner.query(`DROP INDEX "public"."index_national_identity"`);
        await queryRunner.query(`DROP INDEX "public"."index_email"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_status_enum"`);
        await queryRunner.query(`DROP TABLE "upload"`);
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
