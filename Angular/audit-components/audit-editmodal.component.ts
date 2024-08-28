import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuditService } from '../../audit.service';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'dialog-editmodal',
  templateUrl: 'dialog-editmodal.html',
  styleUrls: ['./audit-editmodal.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatListModule,
],
})

export class DialogEditModal implements OnInit{
    
    filterList: any[];
    showConfirmation: boolean = false;

    @Output() onEditModeDialog: EventEmitter<boolean> = new EventEmitter();

    constructor(private auditService: AuditService){}
    
    ngOnInit(): void {
        this.auditService.getFiltersByUser().subscribe( data => {
            this.filterList = data;
        });
    }

    openEditor(id: Number, name: String, global: boolean){
        this.auditService.setFilterToUpdate(id,name,global);
        this.onEditModeDialog.emit(true);
        this.auditService.loadFilter();
    }
}

@Component({
    selector: 'dialog-deletefilter',
    template: `
        <h2 mat-dialog-title>Delete filter</h2>
        <mat-dialog-content>
            Would you like to delete this filter?
        </mat-dialog-content>
        <mat-dialog-actions>
        <button mat-button mat-dialog-close>No</button>
        <button mat-button mat-dialog-close cdkFocusInitial (click)="delete()">Yes</button>
        </mat-dialog-actions>
    `,
    standalone: true,
    imports: [
      MatDialogModule,
      MatButtonModule,
  ],
  })
  
  export class DialogDeleteFilter{
    
    filterList: any[];

    @Output() filterDeleted: EventEmitter<boolean> = new EventEmitter();

    constructor(private auditService: AuditService){}
    
    delete(){
        this.auditService.deleteById();
        this.filterDeleted.emit(true);

        setTimeout(() => this.auditService.getFiltersByUser().subscribe( data => {
            this.filterList = data;
        }), 10)
    }
  }