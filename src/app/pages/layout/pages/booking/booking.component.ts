import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { Router } from '@angular/router';
import { ManageReservationModalComponent } from './components/manage-reservation-modal/manage-reservation-modal.component';
import { BookingService } from '../../../../shared/services/booking.service';
import { PageTitleService } from '../../../../shared/services/page-title.service';
import { InfoModalComponent } from '../../../../shared/components/info-modal/info-modal.component';
import { IBookingReponse } from '../../../../shared/models/booking.model';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
  ],
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.scss'
})
export class BookingComponent {
  displayedColumns: string[] = [
    'position',
    'nameHotel',
    'nameClient',
    'ubication',
    // 'typeReservation',
    'dateInit',
    'dateEnd',
    'city',
    // 'valueReservation',
    'valueReservation',
    'enable',
    'action'

  ];
  dataSource = new MatTableDataSource<any>();
  data: any;
  dataSourcePrimitive: IBookingReponse[] = []
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(
    public dialog: MatDialog,
    private readonly service: BookingService,
    private readonly router: Router,
    private readonly _pageTitle: PageTitleService
  ) {
    this._pageTitle.setPageTitle({
      title: 'Gestión de reservas',
      backpath: '/layout'
    })
  }

  ngOnInit(): void {
    this.getReservation()
  }


  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getReservation(){
    this.service.get().subscribe( data =>{
      console.log(data.data)
      this.dataSourcePrimitive = data.data
      this.dataSource = new MatTableDataSource<any>(data.data);
    }) 
  }

  getReservationById(id:string){
    //this.router.navigateByUrl(`/layout/booking/${id}`)
    this.router.navigateByUrl(`/layout/manage/${id}`)
  }

  DetailReservation(): void {
    const dialogRef = this.dialog.open(ManageReservationModalComponent, {
      // data: this.data
    });
    // console.log(this.data)
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  enabled(element: IBookingReponse){   
    let enabled={
      enable: "habilitar",
      disable: "deshabilitar"
    }
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: "Atencion",
        description: `¿Está seguro de que desea ${element.enabled ? enabled.disable : enabled.enable} este hotel?`,
        btnTitle: "Sí, continuar"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(!result.content) {
        console.log(this.dataSourcePrimitive, result)
        this.dataSource.data = [];
        this.dataSource.data = [...this.dataSourcePrimitive]
        return
      }
      element.enabled = !element.enabled
      let valor = {
        id: element.id,
        enabled: element.enabled
      }
      this.service.putEnabled(valor).subscribe(response => {
      })
    });
  }

}

