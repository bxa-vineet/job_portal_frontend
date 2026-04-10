import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Signup } from './features/auth/signup/signup';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

import { UserLayout } from './features/user/user-layout/user-layout';
import { EmployerLayout } from './features/employer/employer-layout/employer-layout';

import { EmployerDashboard } from './features/employer/employer-dashboard/employer-dashboard';
import { JobList } from './features/user/job-list/job-list';
import { MyApplications } from './features/user/my-applications/my-applications';
import { CreateCompany } from './features/employer/create-company/create-company';
import { MyJobs } from './features/employer/my-jobs/my-jobs';
import { CreateJob } from './features/employer/create-job/create-job';
import { Applicants } from './features/employer/applicants/applicants';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },

  { path: 'login', component: Login },
  { path: 'signup', component: Signup },

  {
    path: 'user',
    component: UserLayout, 
    canActivate: [authGuard, roleGuard('USER')],
    children: [
      { path: '', redirectTo: 'jobs', pathMatch: 'full' },
      { 
        path: 'jobs', 
        component: JobList,
        runGuardsAndResolvers: 'always' 
      },
      { path: 'applications', component: MyApplications,runGuardsAndResolvers: 'always' }
    ]
  },

  {
    path: 'employer',
    component: EmployerLayout, 
    canActivate: [authGuard, roleGuard('EMPLOYER')],
    children: [
      { path: '', component: EmployerDashboard, runGuardsAndResolvers: 'always' },
      { path: 'create-company', component: CreateCompany, runGuardsAndResolvers: 'always' },
      { path: 'jobs', component: MyJobs, runGuardsAndResolvers: 'always' },
      { path: 'create-job', component: CreateJob, runGuardsAndResolvers: 'always' },
      { path: 'applicants/:jobId', component: Applicants }
    ]
  },

  { path: '**', redirectTo: 'login' }
];