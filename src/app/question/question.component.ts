import { Question } from './../iterfaces';
import { Component, Input, OnInit, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';




@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Input() question :Question|undefined
  @Output() correctAnswer =new EventEmitter<number>()
  @Output() incorrectAnswer =new EventEmitter<number>()


  usingIndice=false
  toppings: FormGroup|undefined;
  constructor(private fb: FormBuilder,private auth:AuthServiceService) {

   }

  ngOnInit(): void {
    this.initFormQuestion()
  }

  initFormQuestion(){ 
    this.question!.choixPossibles.forEach(reponse=>{
      this.toppings=this.fb.group({
        reponse:false
      })
    })
  }

  checkAnswer(){
    for (const field in this.toppings!.controls) { // 'field' is a string
      if (field===this.question?.solution && this.toppings!.controls[field].value)//reponse === solution
        {
          this.correctAnswer.emit(this.question.point)
        }
      else if(field==this.question?.solution){
        this.incorrectAnswer.emit(this.question.point/this.question.choixPossibles.length)
      }
    }
  }

  useIndice(){
    this.usingIndice=true
    //do - points in visites
    this.auth.UpdatePointOfUser(this.question!.indice.point,false)
  }

}
