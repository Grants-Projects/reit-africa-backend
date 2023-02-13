import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateUser1668791714717 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'alter table `user` add column `image` VARCHAR(225) NOT NULL after user_type'
    );
    await queryRunner.query(
        'alter table `user` add column `title` VARCHAR(45) NOT NULL after image'
      );
      await queryRunner.query(
        'alter table `user` add column `terms_and_conditions` BOOLEAN DEFAULT false'
      );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('alter table `user` drop column image');
    await queryRunner.query('alter table `user` drop column title');
    await queryRunner.query('alter table `user` drop column terms_and_conditions');
  }
}
