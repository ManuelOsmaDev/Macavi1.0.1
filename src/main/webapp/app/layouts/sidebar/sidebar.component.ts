import { Component, OnInit } from '@angular/core';
import { Account } from '../../core/auth/account.model';
import { AccountService } from '../../core/auth/account.service';

@Component({
  selector: 'macavi-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent {
  constructor(private accountService: AccountService) {}
}
