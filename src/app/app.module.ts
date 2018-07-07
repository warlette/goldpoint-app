import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule, Routes } from '@angular/router';
import { NgProgressModule } from '@ngx-progressbar/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { NgxSmartModalModule } from 'ngx-smart-modal';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FooterComponent } from './footer/footer.component';
import { PledgeComponent } from './pledge/pledge.component';
import { HomeComponent } from './home/home.component';
import { NewCustomerComponent } from './new-customer/new-customer.component';
import { RenewComponent } from './renew/renew.component';
import { RedeemComponent } from './redeem/redeem.component';
import { SellComponent } from './sell/sell.component';
import { CustomersComponent } from './customers/customers.component';
import { PledgesComponent } from './pledges/pledges.component';
import { RedeemedComponent } from './redeemed/redeemed.component';
import { RenewedComponent } from './renewed/renewed.component';
import { RepossessedComponent } from './repossessed/repossessed.component';
import { SoldComponent } from './sold/sold.component';
import { FundsComponent } from './funds/funds.component';
import { AddFundComponent } from './add-fund/add-fund.component';
import { WithdrawFundComponent } from './withdraw-fund/withdraw-fund.component';
import { UsersComponent } from './users/users.component';
import { UserRolesComponent } from './user-roles/user-roles.component';

const appRoutes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'newcustomer', component: NewCustomerComponent },
  { path: 'pledge', component: PledgeComponent },
  { path: 'redeem', component: RedeemComponent },
  { path: 'renew', component: RenewComponent },
  { path: 'sell', component: SellComponent },
  { path: 'customers', component: CustomersComponent },
  { path: 'pledges', component: PledgesComponent },
  { path: 'redeemed', component: RedeemedComponent },
  { path: 'renewed', component: RenewedComponent },
  { path: 'repossessed', component: RepossessedComponent },
  { path: 'sold', component: SoldComponent },
  { path: 'funds', component: FundsComponent },
  { path: 'addfund', component: AddFundComponent },
  { path: 'withdrawfund', component: WithdrawFundComponent },
  { path: 'users', component: UsersComponent },
  { path: 'userroles', component: UserRolesComponent },
  { path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    PledgeComponent,
    HomeComponent,
    NewCustomerComponent,
    RenewComponent,
    RedeemComponent,
    SellComponent,
    CustomersComponent,
    PledgesComponent,
    RedeemedComponent,
    RenewedComponent,
    RepossessedComponent,
    SoldComponent,
    FundsComponent,
    AddFundComponent,
    WithdrawFundComponent,
    UsersComponent,
    UserRolesComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true, useHash: true  } // <-- debugging purposes only
    ),
    BrowserModule,
    HttpClientModule,
    FormsModule,
    NgbModule.forRoot(),
    NgProgressModule.forRoot(/*config*/),
    NgxSmartModalModule.forRoot() 
  ],
  providers: [ CookieService, DatePipe ],
  bootstrap: [AppComponent]
})
export class AppModule { }
