import { Observable } from 'rxjs';
import { UserIdStorageModel } from './user-id-storage-model';

export abstract class UserIdStorageService {

  constructor() { }

  abstract readonly UserId: Observable<UserIdStorageModel>;
  abstract Set(userId: string): Observable<any>;
}
