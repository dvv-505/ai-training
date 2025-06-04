import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

/**
 * Migration to create the auth table
 * @class CreateAuthTable
 * @implements {MigrationInterface}
 */
export class CreateAuthTable202506030848 implements MigrationInterface {
  /** Migration name for logging */
  public name = 'CreateAuthTable202506030848';

  /**
   * Creates the auth table
   * @param queryRunner - TypeORM query runner
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'auth',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'password_hash',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'refresh_token',
            type: 'varchar',
            length: '500',
            isNullable: true,
          },
          {
            name: 'token_expires',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'last_login',
            type: 'timestamp',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'int',
            isNullable: false,
            isUnique: true,
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

    await queryRunner.createForeignKey(
      'auth',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'users',
        onDelete: 'CASCADE',
      }),
    );
  }

  /**
   * Reverts the auth table creation
   * @param queryRunner - TypeORM query runner
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('auth');
    if (table) {
      const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('user_id') !== -1);
      if (foreignKey) {
        await queryRunner.dropForeignKey('auth', foreignKey);
      }
    }
    await queryRunner.dropTable('auth');
  }
} 