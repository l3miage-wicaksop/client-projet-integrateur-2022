import { ChoixPossible } from './../iterfaces';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-choix-possible',
  templateUrl: './choix-possible.component.html',
  styleUrls: ['./choix-possible.component.scss']
})
export class ChoixPossibleComponent implements OnInit {
  @Input() editing:boolean=false
  @Input() creating:boolean=false
  @Input()numChoixPossible:number=0
  @Output() sendingBack=new EventEmitter<ChoixPossible[]>()

  ChoixForm=this.formBuilder.group({
    choix:""
  })
  ChoixFormArr = this.formBuilder.group({
    choices: new FormArray([])
});
  currentChoices:ChoixPossible[]=[]
  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.initFormCreating()
  }



  initFormCreating(){
    this.fill.clear()
    for(let i=0;i<this.numChoixPossible;i++){
      this.fill.push(this.ChoixForm)
  }
}

  get fill() : FormArray {
    return this.ChoixFormArr.get("choices") as FormArray
  }

  saveEditing(){
    //ZAKONCHIT SAVE EDITING SDELAT EDIT DEFI CHEKNUT VSE ETO POSMOTER VISITI

    let tempChoixArr=this.ChoixFormArr.value
    tempChoixArr.choices.forEach((element: { choix: any; }) => {
      let choixTemp={choix:element.choix} as ChoixPossible
      this.currentChoices.push(choixTemp)
    });
    this.sendOutPut()
  }

  sendOutPut(){
     this.sendingBack.emit(this.currentChoices)
  }
}
