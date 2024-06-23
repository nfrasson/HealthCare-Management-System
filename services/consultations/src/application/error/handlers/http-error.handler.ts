import {
  BaseError,
  NotFoundException,
  InvalidInputException,
  DoctorSpecialtyException,
  ConsultationAlreadyScheduledException,
} from "../errors";

export class HttpErrorHandler {
  private statusCodeMapper: Map<string, number> = new Map([
    [NotFoundException.name, 404],
    [InvalidInputException.name, 400],
    [DoctorSpecialtyException.name, 412],
    [ConsultationAlreadyScheduledException.name, 409],
  ]);

  handle(error: BaseError | Error): { statusCode: number; message: string } {
    return {
      message: error.message,
      statusCode: this.statusCodeMapper.get(error.name) || 500,
    };
  }
}
