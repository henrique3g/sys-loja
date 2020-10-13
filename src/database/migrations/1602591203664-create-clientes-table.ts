import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateClientesTable1602591203664 implements MigrationInterface {
    private table = new Table({
      name: 'clientes',
      columns: [
        {
          type: 'integer',
          name: 'id',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          type: 'varchar',
          name: 'name'
        }
      ]
    })

    public async up (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(this.table)
    }

    public async down (queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.table)
    }
}
