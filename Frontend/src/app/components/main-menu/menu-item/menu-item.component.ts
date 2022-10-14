import { Component, Input } from '@angular/core';
import { MainMenuService } from '../main-menu.service';

export interface uwMenuItemChildren {
	expanded: boolean;
	items?: uwMenuItem[];
}

export interface uwMenuItemLink {
	url: string;
	target: string;
}

export interface uwMenuItem {
	displayName: string;
	i18nTagName?: string;
	visibile: boolean;
	disabled?: boolean;
	iconName?: string;
	route?: string;
	link?: uwMenuItemLink;
	children?: uwMenuItemChildren;
	separator_Top?: boolean;
	separator_Bottom?: boolean;
	bold?: boolean;
	customAction?: Function;
}

@Component({
	selector: 'app-menu-item',
	templateUrl: './menu-item.component.html',
	styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent {
	constructor(private mainMenuService: MainMenuService) {}

	@Input() item: uwMenuItem;

	onClickItem() {
		if (this.item.customAction) {
			this.item.customAction();
		}
		this.mainMenuService.uwMenuItemClick();
	}
}
