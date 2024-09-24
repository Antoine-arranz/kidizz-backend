import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { InjectQueue } from '@nestjs/bull';

@Injectable()
export class EmailQueueService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async addEmailsToQueue(emails: string[]): Promise<void> {
    try {
      const jobs = emails.map((email) => ({
        name: 'email',
        data: { email },
      }));
      await this.emailQueue.addBulk(jobs);
    } catch (error) {
      console.log('error', error);
    }
  }
}
