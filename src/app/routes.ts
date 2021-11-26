import { XComponent } from './x/x.component';
import { OnlinecodeComponent } from './onlinecode/onlinecode.component';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { ResultAnalysisComponent } from './home/result-analysis/result-analysis.component';
import { PortalComponent } from './portal/portal.component';
import { DbpreviousresultComponent } from './dbpreviousresult/dbpreviousresult.component';

import { AuthGuard } from './auth/auth.guard';
import { SignupComponent } from './signup/signup.component';
import { TestBookingComponent } from './test-booking/test-booking.component';
import { PatientbucketComponent } from './patientbucket/patientbucket.component';


export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent ,canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent},
    { path: 'signup', component: SignupComponent},
    { path: 'online', component: OnlinecodeComponent},
    { path: 'x', component: XComponent},
    { path: 'allvisit', component: PortalComponent,canActivate:[AuthGuard]},
    { path: 'result-analysis', component: DbpreviousresultComponent,canActivate:[AuthGuard]},
    { path: 'patient-bucket', component: PatientbucketComponent,canActivate:[AuthGuard]},
    { path: 'test-booking', component: TestBookingComponent,canActivate:[AuthGuard]},
    { path : '', redirectTo:'/login', pathMatch : 'full'}
    
]