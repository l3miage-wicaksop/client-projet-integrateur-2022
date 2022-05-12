import { Question, ChoixPossible } from './../iterfaces';
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

  answers:boolean[]=[]
  usingIndice=false

  constructor(private fb: FormBuilder,private auth:AuthServiceService) {

   }

  ngOnInit(): void {
    this.initFormQuestion()
  }

  initFormQuestion(){
    this.question!.choixPossibles.forEach(reponse=>{
      this.answers.push(false)
    })
  }

  checkAnswer(){
    console.log()
    if (this.question!.choixPossibles[this.getAnswer()].choix===this.question?.solution)//reponse === solution
      {
        this.correctAnswer.emit(this.question?.point)
      }
    else {
        this.incorrectAnswer.emit(this.question!.point/this.question!.choixPossibles.length)
    }
  }


  useIndice(){
    this.usingIndice=true
    //do - points in visites
    this.auth.UpdatePointOfUser(this.question!.indice.point,false)
  }

  getAnswer(){
    let i=0
    while(i<this.answers.length){
      if(this.answers[i]==true)
        return i
      i++
    }
    return -1
  }
  setAnswer(index:number){
    console.log("seting answer on this index ",index)
    this.answers[index]?this.answers[index]=false:this.answers[index]=true
  }
}
