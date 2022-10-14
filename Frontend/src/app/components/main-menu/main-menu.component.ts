import { Component, ElementRef, OnInit, ViewEncapsulation } from '@angular/core';
import { UwLoginNotifierService } from '@accusys/uw-core-authentication';
import { UwUserModel } from '@accusys/uw-core-service-model';
import { uwMenuItem } from './menu-item/menu-item.component';
import { environment } from 'src/environments/environment';
import { MainMenuScssStyleModel } from './main-menu-style.model';

@Component({
	selector: 'app-main-menu',
	templateUrl: './main-menu.component.html',
	styleUrls: ['./main-menu.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class MainMenuComponent implements OnInit {
	loading: boolean = true;

	roles: Array<string>;
	rolesId: Array<number>;

	//Menu de un administrador
	adminMenu: uwMenuItem[] = [
		{
			i18nTagName: null,
			displayName: 'Inicio',
			iconName: 'home',
			route: '/',
			visibile: true,
			separator_Bottom: true
		},
		{
			i18nTagName: null,
			displayName: 'Menu de Funcionalidades',
			visibile: true,
			separator_Top: false,
			separator_Bottom: false,
			bold: true,
			children: {
				expanded: true,
				items: [
					{
						displayName: 'Posicion Consolidada',
						iconName: 'attach_money',
						route: 'posicion',
						visibile: true
					},
					{
						displayName: 'Reserve de Efectivo',
						iconName: 'compare_arrows',
						route: 'reserva-efectivo',
						visibile: true
					}
					,
					{
						displayName: 'Transferencias Manuales',
						iconName: 'edit',
						route: 'abm',
						visibile: true
					}
					,
					{
						displayName: 'Bandeja de Control',
						iconName: 'mail_outline',
						route: 'abm',
						visibile: true
					}
					,
					{
						displayName: 'Parametria',
						iconName: 'format_list_bulleted',
						route: 'abm',
						visibile: true
					}
					,
					{
						displayName: 'Catalogos',
						iconName: 'receipt_long',
						route: 'abm',
						visibile: true
					}
					,
					{
						displayName: 'Parametria Nota Debito-Credito',
						iconName: 'balance',
						route: 'abm',
						visibile: true
					}
					,
					{
						displayName: 'Parametria Cobis BCRA',
						iconName: 'account_balance',
						route: 'abm',
						visibile: true
					}
					,
					{
						displayName: 'Usuarios',
						iconName: 'person',
						route: 'abm',
						visibile: true
					}
					,
					{
						displayName: 'Roles',
						iconName: 'dashboard',
						route: 'abm',
						visibile: true
					}
				]
			}
		}
	];
	//Menu de un super usuario
	superMenu: uwMenuItem[] = [
		/*
		{
			i18nTagName: null,
			displayName: 'Settings',
			route: '/application-advance-setting',
			iconName: 'settings',
			visibile: true,
			separator_Top: true,
			separator_Bottom: false,
			bold: false
		}
		*/
	];

	menu: uwMenuItem[] = [];
	menuStyle: MainMenuScssStyleModel; //TODO: Move Style to MainMenuService

	constructor(private loginNotifierService: UwLoginNotifierService, private elRef: ElementRef) {
		this.menuStyle = new MainMenuScssStyleModel(elRef);
	}

	ngOnInit(): void {
		if (environment.disableWSO2Login === false) {
			if (!this.loginNotifierService.getUserInSession()) {
				this.loginNotifierService.completedLogin().subscribe((user) => {
					this.getRoleInfo(user);
				});
			} else this.getRoleInfo(this.loginNotifierService.getUserInSession());
		} else {
			this.menu = [...this.adminMenu, ...this.superMenu];
			this.loading = false;
		}
	}

	getRoleInfo(user: UwUserModel) {
		this.roles = user.getNameRoles();
		this.rolesId = user.roles.map((x) => x.id);
		setTimeout(() => {
			this.setMenuByRole();
			this.loading = false;
		}, 750);
	}

	setMenuByRole() {
		this.menu = [...this.adminMenu]
		/*if (this.checkRolebyId([2])) {
			this.menu = [...this.adminMenu];
		}
		if (this.checkRolebyId([1])) {
			this.menu = [...this.adminMenu, ...this.superMenu];
		}*/
	}

	checkRolebyId(obj: number[]): boolean {
		const filteredList = this.rolesId.filter((item1) => !!obj.find((item2) => item1 === item2));
		if (filteredList && filteredList.length > 0) {
			return true;
		}
		return false;
	}
}
