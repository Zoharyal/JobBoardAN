import { AuthService } from './service/auth.service';
import { JobService } from './service/job.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { JobListComponent } from './job-list/job-list.component';
import { HttpModule } from '@angular/http';
import { JobAddFormComponent } from './job-add-form/job-add-form.component';
import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DaysAgoPipe } from './pipes/days-ago.pipe';
import { HomeComponent } from './home/home.component';
import { JobDetailsComponent } from './job-details/job-details.component';
import { AboutComponent } from './about/about.component';
import { ShortDatePipe } from './pipes/short-date.pipe';
import { CurrencySymbolPipe } from './pipes/currency-symbol.pipe';
import { SearchResultComponent } from './search-result/search-result.component';
import { AuthenticationComponent } from './authentication/authentication.component';
import { RegisterComponent } from './register/register.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { TruncatePipe } from './pipes/truncate.pipe';

const routes = [
  { path:'', component: HomeComponent },
  { path:'jobs/add', component: JobAddFormComponent }, 
  { path:'jobs/:id', component: JobDetailsComponent },  
  { path:'jobs', component: JobListComponent },
  { path:'about', component: AboutComponent },
  { path:'login', component: AuthenticationComponent },
  { path:'register', component: RegisterComponent },
  { path:'profil', component: UserProfilComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    JobListComponent,
    JobAddFormComponent,
    DaysAgoPipe,
    HomeComponent,
    JobDetailsComponent,
    AboutComponent,
    ShortDatePipe,
    CurrencySymbolPipe,
    SearchResultComponent,
    AuthenticationComponent,
    RegisterComponent,
    UserProfilComponent,
    TruncatePipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [JobService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
