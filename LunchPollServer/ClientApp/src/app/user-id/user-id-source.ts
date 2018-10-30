import { Observable } from 'rxjs';
import { UserIdModel } from './user-id.model';

export abstract class UserIdSource {
    readonly UserIdObservable: Observable<UserIdModel>;
    abstract getUserId(): Promise<UserIdModel>;
}
