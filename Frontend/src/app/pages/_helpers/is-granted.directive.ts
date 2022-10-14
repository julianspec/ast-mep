import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { PermissionManagerService } from './../_servicios';

@Directive({
  selector: '[appIsGranted]'
})
export class IsGrantedDirective {

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private permissionManagerS: PermissionManagerService
  ) { }

  @Input() set appIsGranted(permiso: number) {
    this.isGranted(permiso);
  }

  private isGranted(permiso: number) {

    if (this.permissionManagerS.isGranted(permiso)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

}