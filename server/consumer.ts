import dotenv from 'dotenv';
import colors from 'colors';
import db from './config/db';
import { getQueueChannel, queue } from './config/queue';
import { codeExecuteEngine, languageMapping } from '@utils/languages';

// Config
colors?.enable();
dotenv.config({ path: './config/config.env' });

(async () => {
  try {
    const channel = await getQueueChannel();

    await channel.consume(
      queue,
      message => {
        if (message !== null) {
          const data = JSON.parse(message.content.toString());
          const languageType = languageMapping(data.language);

          (async () => {
            const output = await codeExecuteEngine(
              languageType,
              data.code,
              data.input
            );

            const database = await db();
            await database.update(({ jobs }) => (jobs[data.id] = output));
            console.log(`[+] Executed Program ${data.id}`.yellow);
          })();
        }
      },
      { noAck: true }
    );

    process.once('SIGINT', async () => {
      await channel.close();
    });

    console.log('[*] Waiting for messages. To exit press CTRL+C'.green);
  } catch (error) {
    console.warn(error);
  }
})();
