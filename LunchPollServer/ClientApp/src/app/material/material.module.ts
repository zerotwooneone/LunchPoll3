import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatButtonModule, MatListModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export class MaterialModule {
  static readonly imports: any[] = [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule];
  static readonly importsForTest: any[] = [...MaterialModule.imports, NoopAnimationsModule];
 }
