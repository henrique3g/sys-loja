import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateContaAReceberTable1602770698128 implements MigrationInterface {
    private table = new Table({
      name: 'contas_a_receber',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'value',
          type: 'decimal',
          scale: 2
        },
        {
          name: 'date',
          type: 'date'
        },
        {
          name: 'vendaId',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'fk_conta_venda',
          referencedTableName: 'vendas',
          columnNames: ['vendaId'],
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
