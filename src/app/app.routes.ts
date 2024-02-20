import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login/login.component';
import { EnterRaffleComponent } from './enter-raffle/enter-raffle.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'enter', component: EnterRaffleComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
