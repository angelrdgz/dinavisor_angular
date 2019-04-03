import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './_layouts/site-layout/site-layout.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
{
	path:  '',
	component:  SiteLayoutComponent,
	children: [
	{
		path:  '', component:  HomeComponent, pathMatch: 'full'
	}
	],
},
{ path: '**', redirectTo: '' }

]

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
