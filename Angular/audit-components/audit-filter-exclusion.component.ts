import {Component, OnInit, model} from '@angular/core';
import {AuditService} from '../audit.service';
import { filter, timeout } from 'rxjs';

import { MatDialog } from '@angular/material/dialog';

import { DialogEditModal, DialogDeleteFilter } from './audit-editmodal/audit-editmodal.component'
import { DialogLoadModal } from './audit-loadmodal/audit-loadmodal.component'
import { DialogSaveModal } from './audit-savemodal/audit-savemodal.component'

export interface SaveFilterData {
  name: string;
}

@Component({
  selector: 'app-audit-filter-exclusion',
  templateUrl: './audit-filter-exclusion.component.html',
  styleUrls: ['./audit-filter-exclusion.component.scss']
})
export class AuditFilterExclusionComponent implements OnInit {

  showModal: boolean = false;
  isEditing: boolean = false;
  showEditModal: boolean = false;
  writtingName: [boolean, boolean, string] = [false, false, ''];
  admin: boolean = false;
  editEnable: boolean = false;
  readonly filterName = model('')

  constructor(
    private auditService: AuditService,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.auditService.updateCurrentUser().subscribe((data) => {
      this.auditService.setCurrentUser(data);
      this.admin = data.admin;
  });
  }

  isSmallDisplay(): boolean {
    return this.auditService.isSmallDisplay();
  }

  applyFilter(): void {
    this.auditService.applyFilter();
  }

  saveFilter(name: String): void {
    this.auditService.saveFilter(name).subscribe();
  }

  saveGlobalFilter(name: String): void {
    this.auditService.saveGlobalFilter(name).subscribe();
  }

  closeEditMode(){
    this.auditService.removeAll(true);
    this.auditService.removeAll(false);
    this.changeEditMode();
  }

  updateFilter(){
    this.auditService.updateFilter();
    this.closeEditMode();
  }

  deleteFilter(){
    const dialogRef = this.dialog.open(DialogDeleteFilter);

    dialogRef.componentInstance.filterDeleted.subscribe((data) => {
      console.log("Eliminado")
      this.closeEditMode()
    });
  }

  changeEditMode(){
    this.editEnable = !this.editEnable;
  }

  openDialogSaveModal(admin: boolean){
    const dialogRef = this.dialog.open(DialogSaveModal, {
      data:{
        name:this.filterName()
      },
    })

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        if(!admin) this.saveFilter(result);
        if(admin) this.saveGlobalFilter(result);
      }
    });
  }

  openDialogLoadModal(){
    const dialogRef = this.dialog.open(DialogLoadModal,{
      width: '50%',
      panelClass: 'loadmodal-dialog',
    });
  }

  openDialogEditModal(){
    const dialogRef = this.dialog.open(DialogEditModal,{
      width: '50%',
      panelClass: 'editmodal-dialog',
    });

    dialogRef.componentInstance.onEditModeDialog.subscribe((data) => {
      this.auditService.removeAll(true);
      this.auditService.removeAll(false);
      this.changeEditMode();
    });

    dialogRef.afterClosed().subscribe(() => {
      // console.log("Dialog cerrado");
    });
  }
}
