import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

/**
 * Migration to create the users table
 * @class CreateUsersTable
 * @implements {MigrationInterface}
 */
export class CreateUsersTable202506030845 implements MigrationInterface {
  /** Migration name for logging */
  public name = 'CreateUsersTable202506030845';

  /**
   * Creates the users table
   * @param queryRunner - TypeORM query runner
   */
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
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
            name: 'username',
            type: 'varchar',
            length: '50',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'email',
            type: 'varchar',
            length: '100',
            isNullable: false,
            isUnique: true,
          },
          {
            name: 'phone',
            type: 'varchar',
            length: '50',
            isNullable: false,
          },
          {
            name: 'website',
            type: 'varchar',
            length: '100',
            isNullable: false,
          },
          {
            name: 'company_id',
            type: 'int',
            isNullable: true,
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
      'users',
      new TableForeignKey({
        columnNames: ['company_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'companies',
        onDelete: 'SET NULL',
      }),
    );
  }

  /**
   * Reverts the users table creation
   * @param queryRunner - TypeORM query runner
   */
  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('users');
    if (table) {
      const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('company_id') !== -1);
      if (foreignKey) {
        await queryRunner.dropForeignKey('users', foreignKey);
      }
    }
    await queryRunner.dropTable('users');
  }
} 