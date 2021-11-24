import { AuthGuard } from './auth/auth.guard';
import { PatientService } from './shared/patient.service';
import { appRoutes } from './routes';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { HttpClientModule , HTTP_INTERCEPTORS  } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {MatDialogModule} from '@angular/material/dialog';

import { ChartsModule} from 'ng2-charts';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { PortalComponent } from './portal/portal.component';
import { SharedComponent } from './shared/shared.component';
import { HomeComponent } from './home/home.component';
import { AllvisitsComponent } from './home/allvisits/allvisits.component';
import { CurrentvisitComponent } from './home/currentvisit/currentvisit.component';
import { PatientinfoComponent } from './home/patientinfo/patientinfo.component';
import { ResultAnalysisComponent } from './home/result-analysis/result-analysis.component';
import { CresultanalysisComponent } from './cresultanalysis/cresultanalysis.component';
import { DbpreviousresultComponent } from './dbpreviousresult/dbpreviousresult.component';
import { TestnamesComponent } from './dbpreviousresult/testnames/testnames.component';
import { ResultchartComponent } from './resultchart/resultchart.component';
import { TopheadComponent } from './home/tophead/tophead.component';
import { OnlinecodeComponent } from './onlinecode/onlinecode.component';
import { XComponent } from './x/x.component';
import {MatTabsModule} from '@angular/material/tabs';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    PortalComponent,
    SharedComponent,
    HomeComponent,
    AllvisitsComponent,
    CurrentvisitComponent,
    PatientinfoComponent,
    ResultAnalysisComponent,
    CresultanalysisComponent,
    DbpreviousresultComponent,
    TestnamesComponent,
    ResultchartComponent,
    TopheadComponent,
    OnlinecodeComponent,
    XComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ChartsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    MatDialogModule,
    MatTabsModule,
    ReactiveFormsModule,
    
  ],
  entryComponents : [ResultchartComponent],
  providers: [PatientService,AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
