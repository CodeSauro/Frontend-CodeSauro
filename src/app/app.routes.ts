import { Routes } from '@angular/router';
import { HomeComponent } from './core/before-auth/home/home.component';
import { AuthComponent } from './core/before-auth/auth/auth.component';
import { RegisterComponent } from './core/before-auth/register/register.component';
import { SettingsBeforeAuthComponent } from './core/before-auth/settings-before-auth/settings-before-auth.component';
import { SettingsAfterAuthComponent } from './core/after-auth/settings-after-auth/settings-after-auth.component';
import { NotFoundComponent } from './core/not-found/not-found.component';
import { canActivateChildGuard } from './guard/can-activate-child.guard';
import { WithoutLifeComponent } from './core/after-auth/punctuation/without-life/without-life.component';
import { ZeroStarComponent } from './core/after-auth/punctuation/zero-star/zero-star.component';
import { OneStarComponent } from './core/after-auth/punctuation/one-star/one-star.component';
import { TwoStarsComponent } from './core/after-auth/punctuation/two-stars/two-stars.component';
import { ThreeStarsComponent } from './core/after-auth/punctuation/three-stars/three-stars.component';
import { DataTypeComponent } from './core/after-auth/phases/data-type/data-type.component';

export const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '', component: HomeComponent
      },
      {
        path: 'auth', component: AuthComponent
      },
      {
        path: 'register', component: RegisterComponent
      },
      {
        path: 'settings', component: SettingsBeforeAuthComponent
      },

    ],
  },
  {
    path: 'authenticated',
    canActivateChild: [canActivateChildGuard],
    children: [
      {
        path: 'settings', component: SettingsAfterAuthComponent
      },
      {
        path: 'phases',
        children: [
          {
            path: 'data-type', component: DataTypeComponent
          }
        ]
      },
      {
        path: 'punctuation',
        children: [
          {
          path: 'without-life', component: WithoutLifeComponent
          },
          {
            path: 'zero-star', component: ZeroStarComponent
          },
          {
            path: 'one-star', component: OneStarComponent
          },
          {
            path: 'two-stars', component: TwoStarsComponent
          },
          {
            path: 'three-stars', component: ThreeStarsComponent
          },
        ],
      }
    ],
  },
  {
    path: '**', component: NotFoundComponent,
  },
];
