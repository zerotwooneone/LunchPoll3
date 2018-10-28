import { Injectable } from '@angular/core';
import { UserIdStorageService } from './user-id-storage.service';
import { Observable, defer} from 'rxjs';
import { LocalStorage, JSONSchema } from '@ngx-pwa/local-storage';
import { UserIdStorageModel } from './user-id-storage-model';

@Injectable({
  providedIn: 'root'
})
export class LocalUserIdStorageService extends UserIdStorageService {
  readonly UserId: Observable<UserIdStorageModel>;

  Set(userId: string): Observable<any> {
    const usm: UserIdStorageModel = {
      UserId: userId
    };
    return this.localStorage.setItem(localStorageKey, usm);
  }

  constructor(private localStorage: LocalStorage) {
    super();

    this.UserId = defer(() => {
      return this.localStorage.getItem<UserIdStorageModel>(localStorageKey, { schema: schema });
    });
   }
}

const schema: JSONSchema = { type: 'object', properties: { UserId: {type: 'string', minLength: 1, maxLength: 1000} } };
const localStorageKey = 'user id';
