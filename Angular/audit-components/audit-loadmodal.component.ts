import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AuditService } from '../../audit.service';

import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'dialog-loadmodal',
  templateUrl: 'dialog-loadmodal.html',
  styleUrls: ['./audit-loadmodal.component.scss'],
  standalone: true,
  imports: [
    MatDialogModule,
    MatButtonModule,
    MatListModule,
    MatCardModule
],
})
export class DialogLoadModal implements OnInit{
    
    filterList: any[];

    @Output()
    onModalChange: EventEmitter<boolean> = new EventEmitter();

    constructor(private auditService: AuditService){}
    
    ngOnInit(): void {
        this.auditService.getGlobalFilters().subscribe( data =>{
            this.filterList = data
        });
    }

    loadFilter(id: Number, name: String,global: boolean){
        this.auditService.setFilterToUpdate(id,name,global);
        this.auditService.loadFilter();
        this.onModalChange.emit(true);
    }
}