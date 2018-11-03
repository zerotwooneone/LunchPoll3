import { Injectable } from '@angular/core';
import { InMemoryGetterService } from './user-id/in-memory-getter.service';
import { UserIdStorageService } from './user-id/user-id-storage.service';
import { InMemorySetterService } from './user-id/in-memory-setter.service';
import { take, defaultIfEmpty, mergeMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppInitializerService {
  constructor(private inMemoryGetterService: InMemoryGetterService,
    private userIdStorageService: UserIdStorageService,
    private inMemorySetterService: InMemorySetterService) { }

  async Init(): Promise<any> {
    const u = await this.userIdStorageService
        .UserId
        .pipe(
            take(1),
            defaultIfEmpty()
        )
        .toPromise();

    if (u) {
      this.inMemorySetterService.newUser(u.UserId);
    }

    this.inMemoryGetterService
        .UserIdObservable
        .pipe(
            mergeMap(um => {
              return this.userIdStorageService.Set(um.id);
            })
        ).subscribe(
            v => console.log(`App component user id source change. Storage service says:${v}`),
            console.error
        );
  }
}
