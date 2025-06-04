import { MigrationInterface, QueryRunner, Table } from 'typeorm';

/**
 * Migration to create the geo table
 * @class CreateGeoTable
 * @implements {MigrationInterface}
 */
export class CreateGeoTable202506030846 implements MigrationInterface {
  /** Migration name for logging */
  public name = 'CreateGeoTable202506030846';

  /**
   * Creates the geo table
   * @param queryRunner - TypeORM query runner
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'geo',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'lat',
            type: 'varchar',
            length: '20',
            isNullable: false,
          },
          {
            name: 'lng',
            type: 'varchar',
            length: '20',
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
   * Reverts the geo table creation
   * @param queryRunner - TypeORM query runner
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('geo');
  }
} 