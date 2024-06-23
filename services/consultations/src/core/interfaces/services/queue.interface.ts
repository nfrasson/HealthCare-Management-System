export interface IQueueService {
    initialize(): Promise<void>
    produce(queueName: string, message: any): Promise<void>
    setQueueConsumer(queueName: string, callback: (message: any) => Promise<void>): Promise<void>
}