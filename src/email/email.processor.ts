import { Processor, WorkerHost } from '@nestjs/bullmq';
import { Job } from 'bullmq';

function informStructureDeletion(userEmail: string): Promise<void> {
  const secondsToWait = Math.trunc(Math.random() * 7) + 1;

  return new Promise<void>(resolve => {
    setTimeout(() => {
      console.log(userEmail, 'informed!');
      resolve();
    }, secondsToWait * 1000);
  });
}
@Processor('email')
export class EmailProcessor extends WorkerHost {
  async process(job: Job): Promise<void> {
    const { email } = job.data;
    
    try {
      await informStructureDeletion(email);
    } catch (error) {
      console.error('Erreur lors du traitement du job :', error);
    }
  }
}