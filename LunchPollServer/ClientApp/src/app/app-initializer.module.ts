import { NgModule, APP_INITIALIZER } from '@angular/core';
import { AppInitializerService } from './app-initializer.service';

export function init_app(appInitializerService: AppInitializerService) {
    return async () => {
        appInitializerService.Init();
    };
}

@NgModule({
  imports: [],
  providers: [
    {
        provide: APP_INITIALIZER,
        useFactory: init_app,
        deps: [AppInitializerService], // InMemoryGetterService, UserIdStorageService, InMemorySetterService],
        multi: true
    }
  ]
})
export class AppInitializerModule { }
