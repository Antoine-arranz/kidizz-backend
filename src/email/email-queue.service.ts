import { Injectable } from '@nestjs/common';

interface EmailTask {
  userEmail: string;
}

@Injectable()
export class EmailQueueService {
  private queue: EmailTask[] = [];
  // Indicateur de traitement en cours
  private isProcessing = false;

  async addToQueue(userEmail: string): Promise<void> {
    this.queue.push({ userEmail });
    if (!this.isProcessing) {
      this.processQueue();
    }
  }

  private async processQueue(): Promise<void> {
    // Marquer le traitement comme en cours
    this.isProcessing = true;
    while (this.queue.length > 0) {
      // Récupérer un lot de 3 tâches
      const batch = this.queue.splice(0, 3);
      // Traiter chaque tâche du lot en parallèle
      await Promise.all(
        batch.map((task) => this.informStructureDeletion(task.userEmail)),
      );
    }
    this.isProcessing = false;
  }

  private async informStructureDeletion(userEmail: string): Promise<void> {
    const secondsToWait = Math.trunc(Math.random() * 7) + 1;
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        console.log(userEmail, 'informed!');
        resolve();
      }, secondsToWait * 1000);
    });
  }
}
