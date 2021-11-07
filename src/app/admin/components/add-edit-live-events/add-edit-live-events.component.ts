import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '@app/shared/services/api.service';
import { CrudService } from '@app/shared/services/crud.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-edit-live-events',
  templateUrl: './add-edit-live-events.component.html',
  styleUrls: ['./add-edit-live-events.component.css']
})
export class AddEditLiveEventsComponent implements OnInit {

  urlPattern = new RegExp(/((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/)
  author = JSON.parse(localStorage.getItem("userData"))
  todayDate = new Date()
  endTime = new Date()
  defaultTime = new Date()
  bsConfig
  eventForm: FormGroup;
  event_id: any;
  firestoreKey = "events"
  eventData: any;
  isLoading = false
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private apiService: ApiService,
    private crudService: CrudService,
    private toastService: ToastrService
  ) {
    this.todayDate.setDate(this.todayDate.getDate() - 0);
    this.endTime.setHours(this.todayDate.getHours() + 1);
    this.bsConfig = Object.assign({}, { containerClass: "theme-dark-blue" });
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(data => {
      if (data && data.id) {
        this.event_id = data.id
        this.getEvent(this.event_id)
      }

    })
    this.createEventForm()
  }

  onValueChange(value){
    this.eventForm.patchValue({
      startTime: new Date(value),
      endTime:new Date(value)
    })
  }
  createEventForm() {
    this.eventForm = this.fb.group({

      title: ["", Validators.required],
      organizer: ["", Validators.required],
      startTime: [new Date(), Validators.required],
      date: [new Date(), Validators.required],
      endTime: [this.endTime, Validators.required],
      url: ["", [Validators.required, Validators.pattern(this.urlPattern)]],
      uuid:[this.author?.uuid]
    });
  }

  getEvent(event_id) {
    this.isLoading = true
    this.crudService.startLoader()

    this.crudService.getSingle(event_id, this.firestoreKey).then(data => {
      this.crudService.stopLoader()
      this.eventData = data.data()
      this.eventData.key = data.id
      this.isLoading = false
      this.setEventFormValues(this.eventData)
    }, e => {
      this.crudService.stopLoader()
      this.isLoading = false
      this.toastService.error("Error Fetching Event", "Error")
    })
  }

  setEventFormValues(eventData) {
    this.eventForm.patchValue({
      title: eventData?.title,
      url: eventData?.url,
      date: eventData?.date.toDate(),
      organizer: eventData.organizer,
      startTime: eventData?.startTime.toDate(),
      endTime: eventData?.endTime.toDate(),
      uuid:eventData?.uuid
    })
  }


  submitForm() {

    
    let eventObject = {
      title: this.eventForm.value.title,
      organizer: this.eventForm.value.organizer,
      date: this.eventForm.value.date,
      url: this.eventForm.value.url,
      startTime: this.eventForm.value.startTime,
      endTime: this.eventForm.value.endTime,
      uuid:this.eventForm.value.uuid
    }


    if (eventObject.startTime > eventObject.endTime) {
      this.toastService.warning("end Time should be greater than start date")
      return
    }

    if (this.event_id) {
      this.updateEvent(eventObject)
    }
    else {
      this.createEvent(eventObject)
    }
  }

  async createEvent(eventObject) {
    this.crudService.startLoader();
    this.crudService.create(eventObject, this.firestoreKey).then(result => {
      this.router.navigateByUrl("/admin/event-list")
    }, e => {
      this.crudService.stopLoader()
      this.toastService.error("Error Creating Event", "Error")
    })

  }


  updateEvent(eventObject) {
    this.crudService.startLoader()
    this.crudService.update(eventObject, this.firestoreKey, this.event_id).then(data => {
      this.router.navigateByUrl("/admin/event-list")
    }, e => {
      this.crudService.stopLoader()
      this.toastService.error("Error Updating Event", "Error")
    })
  }

  get f() {
    return this.eventForm.controls;
  }

  goBack() {
    this.router.navigateByUrl("/admin/event-list")
  }
}
