import { MigrationInterface, QueryRunner } from 'typeorm';

export class FactoryErp1724276969412 implements MigrationInterface {

    private getAnswerForIndex(index: number): string {
        const answers = ['yes', 'no', 'not mandatory'];
        return answers[index % answers.length];
    }


    public async up(queryRunner: QueryRunner): Promise<void> {
        try {
            console.log('Starting migration...');

            // Insert 10 demo users with known IDs
            const userIds = [];
            for (let i = 1; i <= 10; i++) {
                await queryRunner.query(
                    `INSERT INTO user (name, emp_id, password, last_login, last_pass_update) 
                     VALUES ('User ${i}', 'EMP${i}', 'password${i}', NULL, NULL)`
                );
                
                // Retrieve the last inserted user ID
                const [result] = await queryRunner.query('SELECT LAST_INSERT_ID() AS id');
                userIds.push(result.id);
            }

            // Insert 10 demo machines with known IDs
            const machineIds = [];
            for (let i = 1; i <= 10; i++) {
                await queryRunner.query(
                    `INSERT INTO machine (machine_name, machine_type, created_at) 
                     VALUES ('Machine ${i}', '${i % 2 === 0 ? 'maker' : 'packer'}', NOW())`
                );
                
                // Retrieve the last inserted machine ID
                const [result] = await queryRunner.query('SELECT LAST_INSERT_ID() AS id');
                machineIds.push(result.id);
                console.log(`Inserted machine ${i} with ID ${result.id}`);
            }

            // Insert 100 demo form submissions using the known user IDs and machine IDs
            for (let i = 1; i <= 100; i++) {
                const randomMachineId = machineIds[i % machineIds.length];
                const randomUserId = userIds[i % userIds.length];

                await queryRunner.query(
                    `INSERT INTO machine_data (machine_id, user_id, date, q1, q2, q3, q4, q5, created_at) 
                     VALUES (${randomMachineId}, ${randomUserId}, NOW(), '${this.getAnswerForIndex(i % 5)}', '${this.getAnswerForIndex(i % 5)}', '${this.getAnswerForIndex(i % 5)}', '${this.getAnswerForIndex(i % 5)}', '${this.getAnswerForIndex(i % 5)}', NOW())`
                );
            }
        } catch (error) {
            console.error('Error during migration:', error);
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Optionally, you can implement the logic to remove the inserted data if needed
        await queryRunner.query('DELETE FROM machine_data');
        await queryRunner.query('DELETE FROM machine');
        await queryRunner.query('DELETE FROM user');
    }
}
