import { PostService } from '../services/post.service';
import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ModalService } from '../services/modal.service';
import { Chami } from '../iterfaces';

@Component({
  selector: 'app-regstration-frame',
  templateUrl: './regstration-frame.component.html',
  styleUrls: ['./regstration-frame.component.scss']
})
export class RegstrationFrameComponent implements OnInit,AfterViewInit {

  bodyText: string | undefined;
  @Input() login :string|undefined
  @Input () indetificator:string|undefined

  checkoutForm = this.formBuilder.group({
    nom: '',
    prenom: '',
    ville: '',
    age :'',
    description:'',
    login:''
  });


  @Input() trigger:string | undefined;
  constructor(private post :PostService,private modalService: ModalService,private formBuilder: FormBuilder) { }

  ngOnInit() {
      this.bodyText = 'Thanks for your information';
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
    if(this.login){
      this.checkoutForm.patchValue({login:this.login})
      this.post.postingUsersPromise(this.checkoutForm.value as Chami).then(
        response=>{
          response?console.log("ok, we posted User in Db"):console.log("error ,post user doesnt have status 200")}
      )}
    this.checkoutForm.reset();
    if(this.indetificator)
      this.closeModal(this.indetificator)//this.trigger
  }

  ngAfterViewInit(){
    if(this.indetificator)
      this.openModal(this.indetificator)
  }
}
