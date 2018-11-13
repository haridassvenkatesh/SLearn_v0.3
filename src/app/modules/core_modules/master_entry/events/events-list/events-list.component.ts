import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { EventsService } from '../events.service';
import { ToastsManager } from 'ng2-toastr';
import { Ng4LoadingSpinnerService } from 'ng4-loading-spinner';
import { Router } from '../../../../../../../node_modules/@angular/router';

@Component({
  selector: 'app-events-list',
  templateUrl: './events-list.component.html',
  styleUrls: ['./events-list.component.scss']
})
export class EventsListComponent implements OnInit {

  data: any = [];
  constructor(private router: Router,private spinnerService: Ng4LoadingSpinnerService, private toastr: ToastsManager, vcr: ViewContainerRef, private eventsService: EventsService) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.fetchEvents();
  }

  // Fetching the Events
  fetchEvents() {
    this.spinnerService.show();
    this.eventsService.fetchEvents()
    .subscribe(response => {
      if (response.length < 1) {
        this.toastr.info('Data Not Found!', 'Info!');
      } else {
        this.data = response;
        console.log ('date',this.data);
      }
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.toastr.error('An Error Occured!', 'Error!');
      this.spinnerService.hide();
    })
  }

  // For Updating the Events
  update(id) {

  }

  // For Deleting the Events
  delete(id) {
    this.spinnerService.show();
    this.eventsService.deleteEvent(id)
    .subscribe(response => {
      this.toastr.success('Event Deleted Successfully!', 'Success!');
      this.fetchEvents();
      this.spinnerService.hide();
    }, error => {
      console.log(error);
      this.toastr.error('Event Deleted Failed!', 'Error!');
      this.spinnerService.hide();
    })
  }

  gotoAddPage(addRouterLink) {
    this.router.navigate([addRouterLink]);
  }

}
