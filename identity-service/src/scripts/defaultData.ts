import { Question } from 'src/questions/entities/question.entity';
import { ConnectionOptions, createConnection } from 'typeorm';
import { configService } from '../config/config.service';

const defaultQuestions = [
  'What is the middle name of your oldest child/sibling?',
  "What are the last five digits of your driver's license number?",
  "What is your grandmother's (on your mother's side) maiden name?",
  "What is your spouse or partner's mother's maiden name?",
  'In what city does your nearest sibling live?',
  'What was your childhood nickname?',
  'In what city did you meet your spouse/significant other?',
  'What is the name of your favorite childhood friend?',
  'What street did you live on in third grade?',
];

async function run() {
  const opt = {
    ...configService.getTypeOrmConfig(),
    debug: true,
  };

  const connection = await createConnection(opt as ConnectionOptions);
  const repo = connection.getRepository(Question);
  for await (const _question of defaultQuestions) {
    await repo.save({ value: _question });
  }

  // return await Promise.all(work);
}

run()
  .then(() => console.log('...wait for script to exit'))
  .catch((error) => console.error('seed error', error));
