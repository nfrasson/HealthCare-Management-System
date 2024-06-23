export interface IHttpService {
  get<T>(url: string): Promise<T>;
}
