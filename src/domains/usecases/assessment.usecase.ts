import { Catch, HttpException, Injectable } from "@nestjs/common";

@Injectable()
@Catch(HttpException)
export class AssessmentUseCase {

}