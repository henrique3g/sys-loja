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
        name: 'description',
        length: '100'
      },
      {
        type: 'varchar',
        name: 'reference',
        length: '20',
        isNullable: true
      },
      {
        type: 'decimal',
        name: 'price',
        scale: 2
      },
      {
        type: 'integer',
        name: 'stock'
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
