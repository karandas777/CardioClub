import { NgModule } from "@angular/core";
import {
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSortModule
} from "@angular/material";

const MaterialComponent = [
  MatButtonModule,
  MatTableModule,
  MatPaginatorModule,
  MatFormFieldModule,
  MatInputModule,
  MatRippleModule,
  MatSortModule
];

@NgModule({
  imports: [MaterialComponent],
  exports: [MaterialComponent]
})
export class MaterialModule {}
