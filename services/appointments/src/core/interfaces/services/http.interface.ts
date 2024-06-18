export interface IHttpService {
    get(url: string): Promise<string | object | null>;
}