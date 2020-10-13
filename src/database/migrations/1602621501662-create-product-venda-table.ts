import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateProductVendaTable1602621501662 implements MigrationInterface {
  private table = new Table({
    name: 'product_venda',
    columns: [
      {
        name: 'id',
        type: 'integer',
        isPrimary: true,
        isGenerated: true,
        generationStrategy: 'increment'
      },
      {
        name: 'amount',
        type: 'integer'
      },
      {
        name: 'price',
        type: 'decimal',
        scale: 2
      },
      {
        name: 'vendaId',
        type: 'integer'
      },
      {
        name: 'productId',
        type: 'integer'
      }
    ],
    foreignKeys: [
      {
        name: 'produto_venda_fk',
        columnNames: ['productId'],
        referencedTableName: 'products',
        referencedColumnNames: ['id']
      },
      {
        name: 'venda_produto_fk',
        columnNames: ['vendaId'],
        referencedTableName: 'vendas',
        referencedColumnNames: ['id']
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
