import type { MigrationInterface, QueryRunner } from 'typeorm';
import { Table } from 'typeorm';

/**
 * Migration to create the companies table
 * @class CreateCompaniesTable
 * @implements {MigrationInterface}
 */
export class CreateCompaniesTable202506030844 implements MigrationInterface {
  /** Migration name for logging */
  public name = 'CreateCompaniesTable202506030844';

  /**
   * Creates the companies table
   * @param queryRunner - TypeORM query runner
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'companies',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'catch_phrase',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'bs',
            type: 'varchar',
            length: '200',
            isNullable: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'CURRENT_TIMESTAMP',
            onUpdate: 'CURRENT_TIMESTAMP',
          },
        ],
      }),
      true,
    );
  }

  /**
   * Reverts the companies table creation
   * @param queryRunner - TypeORM query runner
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('companies');
  }
} 