import { Component, OnInit } from '@angular/core';
import { UserIdStorageService } from './user-id/user-id-storage.service';
import { UserIdSource } from './user-id/user-id-source';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'zh-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Lunch Poll';

  constructor(private userIdSource: UserIdSource,
    private userIdStorageService: UserIdStorageService) { }

  ngOnInit(): void {
    this.userIdSource
      .UserIdObservable
      .pipe(
        mergeMap(u => {
          return this.userIdStorageService.Set(u.id);
        }
      )
    ).subscribe(
        v => console.log(`App component user id source change. Storage service says:${v}`),
        console.error);
  }

}
