import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './guard/auth.guard';

const routes: Routes = [

  // not active routes (non-restricted)
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // active route (restricted)
  { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },

  // default route
  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
