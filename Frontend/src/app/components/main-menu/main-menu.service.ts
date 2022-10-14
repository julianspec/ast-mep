import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class MainMenuService {
	constructor() {}

	menuBreakPointOverlay: number = 1280;

	onMenuOpenMoveTopBar: boolean = true;
	onMenuOpenMoveContent: boolean = true;
	onMenuOpenShowOverlayBg: boolean = false;

	menuIsActive: boolean = true;

	menuDefaultWidth: number = 330;
	onMenuDefaultWidthChange = new EventEmitter<number>();
	emitMenuDefaultWidth(menuDefaultWidth: number) {
		this.menuDefaultWidth = menuDefaultWidth;
		this.onMenuDefaultWidthChange.emit(menuDefaultWidth);
	}

	onMenuItemClick = new EventEmitter();
	uwMenuItemClick() {
		this.onMenuItemClick.emit();
	}
}
