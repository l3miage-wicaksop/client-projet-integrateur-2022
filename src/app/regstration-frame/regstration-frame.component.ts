import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../services/modal.service';

@Component({
  selector: 'app-regstration-frame',
  templateUrl: './regstration-frame.component.html',
  styleUrls: ['./regstration-frame.component.scss']
})
export class RegstrationFrameComponent implements OnInit,AfterViewInit {
  bodyText: string | undefined;

  checkoutForm = this.formBuilder.group({
    name: '',
    surname: '',
    city: '',
    age :'',
    description:''
  });


  @Input() trigger:string | undefined;
  constructor(private modalService: ModalService,private formBuilder: FormBuilder,) { }

  ngOnInit() {
      this.bodyText = 'This text can be updated in modal 1';
      console.log("registreFramess")
  }

  openModal(id: string) {
      this.modalService.open(id);
  }

  closeModal(id: string) {
      this.modalService.close(id);
  }

  onSubmit(): void {
    // Process checkout data here
    console.warn('Your order has been submitted', this.checkoutForm.value);
    this.checkoutForm.reset();
    if(this.trigger)
      this.closeModal(this.trigger)

  }
  ngAfterViewInit(){
    this.openModal("registreForm")
  }
}
