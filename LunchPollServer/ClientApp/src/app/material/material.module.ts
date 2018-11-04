import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule, MatButtonModule, MatListModule, MatCardModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

export class MaterialModule {
  static readonly imports: any[] = [MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatListModule,
    MatCardModule,
    MatButtonModule];
  static readonly importsForTest: any[] = [...MaterialModule.imports, NoopAnimationsModule];
 }
