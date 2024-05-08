import { Routes } from '@angular/router';
import { SigninComponent } from './pages/signin/signin.component';
import { SignupComponent } from './pages/signup/signup.component';
import { RoutesComponent } from './pages/route/routes.component';
import { EmployeesComponent } from './pages/employees/employees.component';
import { RouteDetailsComponent } from './pages/route-details/route-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { NewEmployeeFormComponent } from './components/new-employee-form/new-employee-form.component';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { UpdateEmployeFormComponent } from './components/update-employe-form/update-employe-form.component';

export const routes: Routes = [
    {path:"signin" , component:  SigninComponent},
    {path:"signup", component: SignupComponent},
    {path:"routes", component: RoutesComponent},
    {path:"employees", component: EmployeesComponent},
    {path:"route/:id", component: RouteDetailsComponent},
    {path:"profile", component: ProfileComponent},
    {path:"newEmployee", component: NewEmployeeFormComponent},
    {path: 'employees-list', component: EmployeesListComponent },
    { path: 'update-employee/:id', component: UpdateEmployeFormComponent }

];
