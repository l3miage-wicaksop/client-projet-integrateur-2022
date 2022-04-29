import { PostService } from './../post.service';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { Chami } from '../iterfaces';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-regstration-frame',
  templateUrl: './regstration-frame.component.html',
  styleUrls: ['./regstration-frame.component.scss']
})
export class RegstrationFrameComponent implements OnInit,AfterViewInit {
  bodyText: string | undefined;
  @Input() login :string|undefined
  checkoutForm = this.formBuilder.group({
    name: '',
    surname: '',
    city: '',
    age :'',
    description:'',
    login:''
  });


  @Input() trigger:string | undefined;
  constructor(private post :PostService,private modalService: ModalService,private formBuilder: FormBuilder,) { }

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
    console.log("submit form")
    console.warn('Your order has been submitted', this.checkoutForm.value);
    if(this.login){
      this.checkoutForm.patchValue({login:this.login})
      console.log("chami a post ",this.checkoutForm.value)
      console.log("postingUsers do")
      this.post.postingUsers(this.checkoutForm.value as Chami)
      console.log("postingUsers posle")
    }
    this.checkoutForm.reset();
    this.closeModal("registreForm")//this.trigger
  }

  ngAfterViewInit(){
    this.openModal("registreForm")
  }
}
