import axios from "axios";
import { IHttpService } from "@core/interfaces/services/http.interface";

export class AxiosHttpService implements IHttpService {
  async get<T>(url: string): Promise<T> {
    const response = await axios.get(url);

    return response.data;
  }
}