import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTable, MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { ManageHotelModalComponent } from './components/manage-hotel-modal/manage-hotel-modal.component';
import { IHotel, INIT_HOTEL } from './hotel-modal';
import { InfoModalComponent } from '../../../../shared/components/info-modal/info-modal.component';
import { HotelService } from '../../../../shared/services/hotel.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PageTitleService } from '../../../../shared/services/page-title.service';


@Component({
  selector: 'app-hotel',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  templateUrl: './hotel.component.html',
  styleUrl: './hotel.component.scss',

})
export class HotelComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  displayedColumns: string[] = ['name', 'room', 'enabled', 'action'];
  dataSource = new MatTableDataSource<IHotel>();
  dataSourcePrimitive: IHotel[] = []
  data: any ;
  dataManageHotel = INIT_HOTEL
  formEnabled!: FormGroup

  
  constructor(
    public dialog: MatDialog,
    private readonly service: HotelService,
    private formBuilder: FormBuilder,
    private readonly _pageTitle: PageTitleService
  ) {
    this._pageTitle.setPageTitle({
      title: 'Gestión de hoteles',
      backpath: '/layout'
    })
    this.formEnabled = this.formBuilder.group({
      id:[''],
      enabled:[false]
    })
  }

  ngOnInit(): void {
    this.getHotel()
  }

  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  
  getHotel(){
     this.service.getHotel({}).subscribe(resp =>{
      this.dataSource = new MatTableDataSource<IHotel>(resp.data)
      this.dataSourcePrimitive = [...resp.data]
      resp.data.find(item => {
        this.formEnabled.controls['id'].setValue(item.id)
        this.formEnabled.controls['enabled'].setValue(item.enabled)
      })
    })
  }

  editHotel(id:string){
     this.service.getHotelById(id).subscribe( response => {
      this.openDialogEditHotel(response.data)
      })
  }

  enabled(element: IHotel){   
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
      if(!result) {
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

  openDialogRegisterHotel(data: any): void {
    const dialogRef = this.dialog.open(ManageHotelModalComponent, {
      data: {
        data,
        title: "Registrar hotel",
        button: "Registrar",
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.dataManageHotel = result
        this.openDialogConfirmation()
      }
    
    });
  }
  openDialogConfirmation() {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: "Atención",
        description: "¿Está seguro que desea guardar un nuevo hotel?",
        btnTitle: "Guardar",
        icon: "info"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.openDialogRegisterHotel(result)
        return
      }
      this.service.postHotel(this.dataManageHotel).subscribe(data => {
        if (data.status != 200) return
        this.getHotel()
        const dialogRef = this.dialog.open(InfoModalComponent, {
          data: {
            title: "Atención",
            description: "Se ha registrado exitosamente",
            btnTitle: "aceptar",
            icon: "info"
          }
        });
        this.dataManageHotel = INIT_HOTEL
        dialogRef.afterClosed().subscribe(result => {
          
        });
        
      })

    });
  }

  openDialogEditHotel(data:IHotel[]): void {
    const dialogRef = this.dialog.open(ManageHotelModalComponent, {
      data: {
        data,
        title: "Editar hotel",
        button: "Guardar"
      }
    });
    dialogRef.afterClosed().subscribe(result => {

      this.service.postHotel(result).subscribe( data => { 
        this.getHotel()
      })
    });
  }
}



// const ELEMENT_DATA: PeriodicElement[] = [
  
// ];

