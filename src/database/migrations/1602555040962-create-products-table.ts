import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProductsTable1602555040962 implements MigrationInterface {
  table = new Table({
    name: 'products',
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
        name: 'description'
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
