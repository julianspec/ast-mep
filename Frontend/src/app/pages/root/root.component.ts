import { Component, OnInit } from '@angular/core';
import { MainMenuService } from 'src/app/components/main-menu/main-menu.service';
@Component({
	selector: 'app-root',
	templateUrl: './root.component.html',
	styleUrls: ['./root.component.scss']
})
export class RootComponent implements OnInit {
	constructor(public mainMenuService: MainMenuService) {}

	ngOnInit(): void {
		this.mainMenuService.onMenuItemClick.subscribe(() => {
			this.onClickItem();
		});

		this.mainMenuService.onMenuDefaultWidthChange.subscribe((x) => {
			this.setDefaultMenuWidth(x);
		});

		document.documentElement.style.setProperty('--uw-menu-width', this.mainMenuService.menuDefaultWidth + 'px');
		this.onClickItem();
	}

	setDefaultMenuWidth(width: number) {
		document.documentElement.style.setProperty('--uw-menu-width', width + 'px');
	}

	onClickOverlay(e) {
		if (window.innerWidth >= 1280) {
			if ((e as HTMLElement).tagName != 'NAV') {
				this.mainMenuService.menuIsActive = false;
			}
		} else {
			this.mainMenuService.menuIsActive = false;
		}
	}

	onClickItem() {
		if (window.innerWidth >= this.mainMenuService.menuBreakPointOverlay) {
			this.mainMenuService.onMenuOpenMoveContent = true;
			this.mainMenuService.onMenuOpenShowOverlayBg = false;
			this.mainMenuService.menuIsActive = true;
		} else {
			this.mainMenuService.onMenuOpenMoveContent = false;
			this.mainMenuService.onMenuOpenShowOverlayBg = true;
			this.mainMenuService.menuIsActive = false;
		}
	}

	onClickTopBarMenuBtn(status) {
		if (window.innerWidth >= this.mainMenuService.menuBreakPointOverlay) {
			this.mainMenuService.onMenuOpenMoveContent = true;
			this.mainMenuService.onMenuOpenShowOverlayBg = false;
			this.mainMenuService.menuIsActive = !status;
		} else {
			this.mainMenuService.onMenuOpenMoveContent = false;
			this.mainMenuService.onMenuOpenShowOverlayBg = true;
			this.mainMenuService.menuIsActive = true;
		}
	}
}
