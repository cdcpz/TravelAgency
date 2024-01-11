import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
// import { HotelService } from '../services/hotel.service';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { ManageRoomModalComponent } from './component/manage-room-modal/manage-room-modal.component';
import { RoomsService } from './services/rooms.service';
import { BookingService } from '../../../../shared/services/booking.service';
import { HotelService } from '../../../../shared/services/hotel.service';
import { IHotel, INIT_HOTEL } from '../hotel/hotel-modal';
import { InfoModalComponent } from '../../../../shared/components/info-modal/info-modal.component';
import { IManageRoomRequest, INITIAL_ROOM } from '../../../../shared/models/room.model';
import { ISelectOption } from '../../../../shared/models/response';
import { IRoom } from '../../../../shared/models/booking.model';
import { CurrencyPipe } from '@angular/common';
import { PageTitleService } from '../../../../shared/services/page-title.service';


@Component({
  selector: 'app-room',
  standalone: true,
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatSlideToggleModule,
    MatButtonModule,
    CurrencyPipe
  ],
  templateUrl: './room.component.html',
  styleUrl: './room.component.scss'
})
export class RoomComponent {
  displayedColumns: string[] = ['nameHotel', 'city', 'location', 'capacity', 'price', 'enabled', 'action'];
  dataSource = new MatTableDataSource<IRoom>();
  data: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  listHoteles!: IHotel[]
  listTypeRoom!: ISelectOption[]
  dataManageRoom: IManageRoomRequest = INITIAL_ROOM
  dataSourcePrimitive: IRoom[] = []

  constructor(
    public dialog: MatDialog,
    private readonly serviceHotel: HotelService,
    private readonly serviceRoom: RoomsService,
    private readonly _pageTitle: PageTitleService
  ) {
    this._pageTitle.setPageTitle({
      title: 'Gestión de habitaciones',
      backpath: '/layout'
    })
  }

  ngOnInit(): void {
    this.getHoteles()
    this.getRoomType()
    this.getRooms()
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getHoteles() {
    this.serviceHotel.getHotel({}).subscribe(resp => {
      this.listHoteles = resp.data
      // console.log(this.listHoteles)
    })
  }

  getRoomType() {
    this.serviceRoom.getRoomType().subscribe(resp => {
      this.listTypeRoom = resp.data["types"]
    })
  }

  getRooms() {
    this.serviceRoom.getRooms().subscribe(resp => {
      this.dataSourcePrimitive = [...resp.data]
      this.dataSource = new MatTableDataSource<IRoom>(resp.data);
    })

  }

  editRoom(id: string) {
    this.serviceRoom.getRoomById(id).subscribe(resp => {
      this.openDialogEditRoom(resp.data)
    })

  }

  enabled(element: IRoom){   
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
      this.serviceRoom.putEnabled(valor).subscribe(response => {
      })
    });
  }

  openDialogEditRoom(data: IRoom): void {
    const dialogRef = this.dialog.open(ManageRoomModalComponent, {
      data: {
        title: "Editar Habitacion",
        button: "Guardar",
        data: {
          ...data,
          hotelId: data.hotel.id
        },
        type: this.listTypeRoom,
        hotel: this.listHoteles
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.serviceRoom.postRoom(result).subscribe(data => {
        if (data.status != 200) return
        this.getRooms()
        const dialogRef = this.dialog.open(InfoModalComponent, {
          data: {
            title: "Atención",
            description: "Actualizacion exitosa",
            btnTitle: "aceptar",
            icon: "info"
          }
        });
        this.dataManageRoom = INITIAL_ROOM
        dialogRef.afterClosed().subscribe(result => {

        });

      })
    });
  }

  openDialogRegisterRoom(): void {
    let list = {
      data: this.dataManageRoom,
      type: this.listTypeRoom,
      hotel: this.listHoteles
    }
    const dialogRef = this.dialog.open(ManageRoomModalComponent, {
      data: list
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.dataManageRoom = result
        this.openDialogConfirmation()
        return
      }
      this.dataManageRoom = INITIAL_ROOM

    });
  }

  openDialogConfirmation() {
    const dialogRef = this.dialog.open(InfoModalComponent, {
      data: {
        title: "Atención",
        description: "¿Está seguro que desea guardar una nueva habitacion?",
        btnTitle: "Guardar",
        icon: "info"
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (!result) {
        this.openDialogRegisterRoom()
        return
      }
      this.serviceRoom.postRoom(this.dataManageRoom).subscribe(data => {
        if (data.status != 200) return
        this.getRooms()
        const dialogRef = this.dialog.open(InfoModalComponent, {
          data: {
            title: "Atención",
            description: "Se ha registrado exitosamente",
            btnTitle: "aceptar",
            icon: "info"
          }
        });
        this.dataManageRoom = INITIAL_ROOM
        dialogRef.afterClosed().subscribe(result => {

        });

      })

    });
  }
}