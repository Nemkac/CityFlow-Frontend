import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RoutesComponent } from './pages/route/routes.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewEmployeeFormComponent } from './components/new-employee-form/new-employee-form.component';
import { ReportMalfunctionComponent } from './components/report-malfunction/report-malfunction.component';
import { BusServiceRankingsComponent } from './components/bus-service-rankings/bus-service-rankings.component';
import { GenAlgChargingComponent } from './components/gen-alg-charging/gen-alg-charging.component';
import { BusServicingsComponent } from './components/bus-servicings/bus-servicings.component';
import { HomePageComponent } from './components/home-page/home-page.component';
import { MalfunctionDataComponent } from './components/malfunction-data/malfunction-data.component';

export const routes: Routes = [
    {path:"", component : HomePageComponent},
    {path:"signin" , component:  SigninComponent},
    {path:"signup", component: SignupComponent},
    {path:"routes", component: RoutesComponent},
    {path:"employees", component: EmployeesComponent},
    {path:"route/:id", component: RouteDetailsComponent},
    {path:"profile", component: ProfileComponent},
    {path:"newEmployee", component: NewEmployeeFormComponent},
    {path:"reportMalfunction", component:ReportMalfunctionComponent},
    {path:"busesServiceRankings",component:BusServiceRankingsComponent},
    {path:"chargingPlanGeneticAlgorithm",component : GenAlgChargingComponent},
    {path:"busServicings",component : BusServicingsComponent},
    {path:"malfunctionData",component : MalfunctionDataComponent}
];
