import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AddmemberComponent } from './addmember/addmember.component';
import { ListmemberComponent } from './listmember/listmember.component';
import { AdminsetupComponent } from './adminsetup/adminsetup.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { PackagesComponent } from './packages/packages.component';
import { EquipmentsComponent } from './equipments/equipments.component';
import { AuthGuard } from './auth.guard';
import { UserGuard } from './user.guard';
import { ExmembersComponent } from './exmembers/exmembers.component';
import { ActivemembersComponent } from './activemembers/activemembers.component';
import { AlertboardComponent } from './alertboard/alertboard.component';
import { AbouttoexComponent } from './abouttoex/abouttoex.component';
import { PendingfeesComponent } from './pendingfees/pendingfees.component';


const routes: Routes = [
  {path:"" , component:LoginComponent},
  {path:"login",component:LoginComponent},
  {path:"home",component:HomeComponent,canActivate:[UserGuard],children:[
    {path:"dashboard",component:DashboardComponent,canActivate:[UserGuard]},
    {path:"add-member",component:AddmemberComponent,canActivate:[UserGuard]},
    {path:"members-list",component:ListmemberComponent,canActivate:[UserGuard]},
    {path:"activemembers",component:ActivemembersComponent,canActivate:[UserGuard]},
    {path:"exmembers",component:ExmembersComponent,canActivate:[UserGuard]},
    {path:"alertboard",component:AlertboardComponent,canActivate:[UserGuard],children:[
      {path:"",component:AbouttoexComponent,canActivate:[UserGuard]},
    {path:"pendingfees",component:PendingfeesComponent,canActivate:[UserGuard]}
    ]},
    {path:"packages",component:PackagesComponent,canActivate:[UserGuard]},
    {path:"equipments",component:EquipmentsComponent,canActivate:[UserGuard]},
    {path:"admin-setup",component:AdminsetupComponent, canActivate:[UserGuard,AuthGuard]},
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
