import { MigrationInterface, QueryRunner, Table } from 'typeorm'

export class CreateRecebimentosTable1602771534123 implements MigrationInterface {
    private table = new Table({
      name: 'recebimentos',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment'
        },
        {
          name: 'paymentDate',
          type: 'date'
        },
        {
          name: 'value',
          type: 'decimal',
          scale: 2
        },
        {
          name: 'parcelaId',
          type: 'integer'
        }
      ],
      foreignKeys: [
        {
          name: 'fk_recebimento_parcela',
          columnNames: ['parcelaId'],
          referencedTableName: 'parcelas',
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
