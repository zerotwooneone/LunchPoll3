import { Observable } from 'rxjs';
import { UserIdModel } from './user-id.model';

export abstract class UserIdSource {
    readonly UserIdModel: Observable<UserIdModel>;
}
