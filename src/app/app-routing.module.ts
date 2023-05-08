import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './_helpers/auth.guard';
import { BoardAdminComponent } from './components/board-admin/board-admin.component';
import { BoardModeratorComponent } from './components/board-moderator/board-moderator.component';
import { BoardUserComponent } from './components/board-user/board-user.component';
import { LoginComponent } from './components/login/login.component';
import { PayComponent } from './components/pay/pay.component';
import { ProfileComponent } from './components/profile/profile.component';
import { RegisterComponent } from './components/register/register.component';
import { DetailComponent } from './components/workers/detail/detail.component';
import { WorkersComponent } from './components/workers/workers.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, data: { toolbar: true } },
  { path: 'register', component: RegisterComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
  { path: 'user', component: BoardUserComponent, canActivate: [AuthGuard] },
  { path: 'mod', component: BoardModeratorComponent, canActivate: [AuthGuard] },
  { path: 'admin', component: BoardAdminComponent, canActivate: [AuthGuard] },
  {
    path: 'admin/workers',
    component: WorkersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'admin/workers/detail/:id/:name/:telephone',
    component: DetailComponent,
    canActivate: [AuthGuard],
  },
  { path: 'admin/pay', component: PayComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

/*
  {
    path: 'admin/workers',
    component: WorkersComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'detail/:id/:name/:telephone',
        component: DetailComponent,
        //canActivate: [AuthGuard],
      },
    ],
  },
  */
