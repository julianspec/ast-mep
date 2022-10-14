import { ElementRef } from '@angular/core';

export enum UwScssStyleTypeModel {
	COLOR = 'COLOR',
	PADDING = 'PADDING',
	SHADOW = 'SHADOW',
	STRING = 'STRING'
}

export class UwScssStyleModel {
	propertyName: string;
	value: string;
	type?: UwScssStyleTypeModel;
}

export abstract class UwScssStyleObjectModel {
	component: ElementRef;
	defaultStyle: UwScssStyleModel[];
	constructor(component: ElementRef) {
		this.component = component;
	}

	applyStyle(style: UwScssStyleModel[]) {
		if (style && this.component) {
			style.forEach((element) => {
				this.component.nativeElement.style.setProperty(element.propertyName, element.value);
			});
		}
	}
}

export class MainMenuScssStyleModel extends UwScssStyleObjectModel {
	currentStyle: number;

	constructor(component: ElementRef) {
		super(component);
		this.defaultStyle = this.setWhiteStyle();
	}

	public setWhiteStyle(): UwScssStyleModel[] {
		var style = [
			{
				propertyName: '--uw-menu-title',
				value: 'var(--primary_color)'
			},
			{
				propertyName: '--uw-menu-logo-color',
				value: '#b4b4b4'
			},
			{
				propertyName: '--uw-menu-bg',
				value: 'white'
			},
			{
				propertyName: '--uw-menu-separator',
				value: '#c9c9c9'
			},
			{
				propertyName: '--uw-menu-loader',
				value: 'var(--primary_color)'
			},
			{
				propertyName: '--uw-menu-item-bg',
				value: 'transparent'
			},
			{
				propertyName: '--uw-menu-item-bg-active',
				value: 'transparent'
			},
			{
				propertyName: '--uw-menu-item-bg-hover',
				value: '#ececec'
			},
			{
				propertyName: '--uw-menu-item-text',
				value: '#393939'
			},
			{
				propertyName: '--uw-menu-item-text-active',
				value: 'var(--primary_color)'
			},
			{
				propertyName: '--uw-menu-item-text-hover',
				value: 'var(--primary_color)'
			},
			{
				propertyName: '--uw-menu-item-icon',
				value: '#bfbfbf'
			},
			{
				propertyName: '--uw-menu-item-icon-active',
				value: 'var(--primary_color)'
			},
			{
				propertyName: '--uw-menu-item-icon-hover',
				value: '#bfbfbf'
			},
			{
				propertyName: '--uw-menu-item-expander-bg',
				value: 'var(--uw-menu-item-bg)'
			},
			{
				propertyName: '--uw-menu-item-expander-bg-hover',
				value: 'var(--uw-menu-item-bg-hover)'
			},
			{
				propertyName: '--uw-menu-item-expander-text',
				value: 'var(--uw-menu-item-text)'
			},
			{
				propertyName: '--uw-menu-item-expander-text-hover',
				value: 'var(--primary_color)'
			},
			{
				propertyName: '--uw-menu-item-expander-icon',
				value: 'var(--uw-menu-item-text)'
			},
			{
				propertyName: '--uw-menu-item-expander-icon-hover',
				value: 'var(--primary_color)'
			},
			{
				propertyName: 'background',
				value: 'var(--uw-menu-bg)'
			},
			{
				propertyName: 'box-shadow',
				value: '0 0 20px 0 #000000a'
			}
		];

		this.currentStyle = 0;
		this.applyStyle(style);
		return style;
	}

	public setDarkStyle(): UwScssStyleModel[] {
		var style = [
			{
				propertyName: '--uw-menu-title',
				value: 'white'
			},
			{
				propertyName: '--uw-menu-logo-color',
				value: '#6e6e6e'
			},
			{
				propertyName: '--uw-menu-bg',
				value: '#2c2c2c'
			},
			{
				propertyName: '--uw-menu-separator',
				value: '#464646'
			},
			{
				propertyName: '--uw-menu-loader',
				value: '#ff9b00'
			},

			{
				propertyName: '--uw-menu-item-bg-active',
				value: 'transparent'
			},
			{
				propertyName: '--uw-menu-item-bg-hover',
				value: '#222222'
			},
			{
				propertyName: '--uw-menu-item-text',
				value: '#b7b7b7'
			},
			{
				propertyName: '--uw-menu-item-text-active',
				value: '#ff9b00'
			},
			{
				propertyName: '--uw-menu-item-text-hover',
				value: '#ff9b00'
			},
			{
				propertyName: '--uw-menu-item-icon',
				value: '#474747'
			},
			{
				propertyName: '--uw-menu-item-icon-active',
				value: '#ff9b00'
			},
			{
				propertyName: '--uw-menu-item-icon-hover',
				value: '#bfbfbf'
			},

			{
				propertyName: '--uw-menu-item-expander-bg',
				value: 'var(--uw-menu-item-bg)'
			},
			{
				propertyName: '--uw-menu-item-expander-bg-hover',
				value: 'var(--uw-menu-item-bg-hover)'
			},
			{
				propertyName: '--uw-menu-item-expander-text',
				value: 'var(--uw-menu-item-text)'
			},
			{
				propertyName: '--uw-menu-item-expander-text-hover',
				value: '#ff9b00'
			},
			{
				propertyName: '--uw-menu-item-expander-icon',
				value: 'var(--uw-menu-item-text)'
			},
			{
				propertyName: '--uw-menu-item-expander-icon-hover',
				value: '#ff9b00'
			}
		];
		this.currentStyle = 1;
		this.applyStyle(style);
		return style;
	}

	public swithcStyles() {
		if (this.currentStyle == 0) {
			this.setDarkStyle();
		} else {
			this.setWhiteStyle();
		}
	}
}
