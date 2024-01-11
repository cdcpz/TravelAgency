import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule, DateAdapter, NativeDateAdapter, MAT_DATE_FORMATS, MAT_NATIVE_DATE_FORMATS } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { IBookingReponse, IBookingRequest, IHotel, IRoom } from '../../../../shared/models/booking.model';
import { ILoginResponse } from '../../../landing/models/login.model';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { DB_FLAGS } from '../../../../shared/models/db.model';
import { LocalDbPersist } from '../../../../shared/services/db.service';
import { SignupModalComponent } from '../../../../shared/components/signup-modal/signup-modal.component';
import { IResponseModal, ISignup } from '../../../../shared/models/signup-modal';
import { ISelectOption } from '../../../../shared/models/response';
import * as Model from './manage-booking.model';
import { SignupService } from '../../../../shared/components/signup-modal/service/signup.service';
import { CardHotelComponent } from '../../../../shared/components/card/card-hotel/card-hotel.component';
import { RoomService } from '../../../../shared/services/room.service';
import { BookingService } from '../../../../shared/services/booking.service';
import { InfoModalComponent } from '../../../../shared/components/info-modal/info-modal.component';
import { IInfoModalRequest } from '../../../../shared/models/info-modal.model';
import { IFilterRoomRequest } from '../../../../shared/models/room.model';
import { PageTitleService } from '../../../../shared/services/page-title.service';

@Component({
  selector: 'app-manage-booking',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSlideToggleModule,
    CardHotelComponent
  ],
  providers: [
    { provide: DateAdapter, useClass: NativeDateAdapter },
    { provide: MAT_DATE_FORMATS, useValue: MAT_NATIVE_DATE_FORMATS },
  ],
  templateUrl: './manage-booking.component.html',
  styleUrl: './manage-booking.component.scss'
})
export class ManageBookingComponent {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  
  emergencyForm!: FormGroup
  filterRequestRooms!: FormGroup
  dataSource: MatTableDataSource<ISignup>
  credential: ILoginResponse
  displayedColumns: string[] = [
    'document',
    'name',
    'lastName',
    'gender',
    'phone',
    'action'
  ];
  data: any;
  rooms: IRoom[] = []
  selectionRoom: IRoom | null
  genders: ISelectOption[] = []
  id:string = ''
  enabled = false;

  constructor(
    private readonly _signup: SignupService,
    public dialog: MatDialog,
    private readonly router: Router,
    private formBuilder: FormBuilder,
    private readonly freeRoomsService: RoomService,
    private readonly _booking: BookingService,
    private rutaActiva: ActivatedRoute,private readonly _pageTitle: PageTitleService
  ) {
    this._pageTitle.setPageTitle({
      title: 'Gestión de reserva',
      backpath: '/traveler'
    })
    this.dataSource = new MatTableDataSource<ISignup>()
    this.credential = LocalDbPersist<ILoginResponse>().get(DB_FLAGS.CREDENTIAL) ?? { id: 'n/a' } as ILoginResponse
    this.selectionRoom = null;
    /*
    {
      hotel: {
        name: 'Hotel SAS.'
      } as IHotel,
      id: 'Hotel SAS.'
    } as IRoom
    */
  }


  ngOnInit(): void {
    this.id = this.rutaActiva.snapshot.params["booking"]
    this.builder()
    this._signup.getTypes().subscribe(option => {
      this.genders = option.data["genders"]
    })
    // if(!this.id) this.getRooms()
    // this.filterRooms()
    this.getBookingById()
    
  }

  getFlag() {
    return this.id ? true : false
  }

  builder() {
    this.filterRequestRooms = this.formBuilder.group({
      city: new FormControl({ value: '', disabled: this.getFlag() }, [Validators.required]),
      quantityPeople: new FormControl({ value: '', disabled: this.getFlag() }, [Validators.required]),
      start: new FormControl({ value: new Date, disabled: this.getFlag() }, [Validators.required]),
      end: new FormControl({ value: new Date, disabled: this.getFlag() }, [Validators.required])
    })
    this.emergencyForm = this.formBuilder.group({
      indicative: new FormControl({ value: null, disabled: this.getFlag() }, [Validators.required, Validators.min(1), Validators.maxLength(4)]),
      phone: new FormControl({ value: null, disabled: this.getFlag() }, [Validators.required]),
      name: new FormControl({ value: null, disabled: this.getFlag() }, [Validators.required])
    })
  }

  filterRooms(){
    this.freeRoomsService.getFreeRooms(this.filterRequestRooms.value).subscribe(resp => {
      this.rooms = resp.data
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getBookingById(){
    
    this._booking.getBookingById(this.id).subscribe( resp => {
      
      let mapped = resp.data.guests.map((item): ISignup => {
        return {
          ...item,
          document: item.document.value,
          documentType: item.document.type,
          password: '',
          name: item.contact.name,
          phone: item.contact.value,
          indicative: item.contact.indicative,
          birth: item.birth.toString(),
          
        }
      })
      this.emergencyForm.patchValue({
        ...resp.data.emergencyContact,
        phone: resp.data.emergencyContact.value
      })
      this.freeRoomsService.getRoomsById(resp.data.roomId).subscribe( response => {
        this.rooms = []
        this.rooms.push(response.data)
      })
      this.dataSource = new MatTableDataSource<ISignup>(mapped)  
      
    })
    

    // this.router.navigateByUrl(`/traveler/booking/${id}`)
  }

  manage() {
    if(!this.selectionRoom) return
    let request: IBookingRequest = {
      roomId: this.selectionRoom.id,
      credentialId: this.credential.id,
      ...this.filterRequestRooms.value,
      emergencyContact: {
        ...this.emergencyForm.value,
      },
      guests: this.dataSource.data
    }
    this._booking.post(request).subscribe(response => {
      let modalParams: IInfoModalRequest = {
        title: 'Atención',
        description: response.message,
        icon: "info",
        btnTitle: 'Aceptar'
      }
      const dialogRef = this.dialog.open(InfoModalComponent, {
        data: modalParams
      })
      dialogRef.afterClosed().subscribe((resp => {
        if(response.status != 200) this.router.navigateByUrl(`/traveler`)
        this.volver()
      }))
    })
  }
  volver(){
    this.router.navigateByUrl(`/traveler`)
  }

  getSelectedRoom(room: IRoom) {
    if(!this.selectionRoom) this.selectionRoom = {...room}
    else if(room.id == this.selectionRoom.id) this.selectionRoom = null
    else this.selectionRoom = {...room}
  }

  getRooms(filter?:IFilterRoomRequest) {
    this.freeRoomsService.getRooms(filter).subscribe(resp => {
      this.rooms = resp.data
      // console.log(this.rooms)
    })
    

  }

  getGender(genderId: number) {
    let gender = this.genders.find(gender => gender.id == genderId)
    return gender ? gender.name : 'N/A'
  }

  manageGuest(guest?: ISignup) {
    const dialogRef = this.dialog.open(SignupModalComponent, {
      data: Model.Utils.GetModalParamsGuest(guest)
    })
    dialogRef.afterClosed().subscribe(
      (value: IResponseModal<ISignup> | null) => {
        if (!value) return
        if (value.dispatcher != 'OK') return
        let index = this.dataSource.data.findIndex(row => row.document == value.content.document)
        if (value.mode == 'ADD' && index == -1) this.dataSource.data.push(value.content)
        else {
          this.dataSource.data.splice(index)
          this.dataSource.data.push(value.content)
        }
        this.dataSource._updateChangeSubscription()
      }
    )
  }

  remove(guest: ISignup) {
    let index = this.dataSource.data.findIndex(row => row.document == guest.document)
    this.dataSource.data.splice(index, 1)
    this.dataSource._updateChangeSubscription()
  }
}

