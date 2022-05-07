import { Indication } from './../iterfaces';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-indication',
  templateUrl: './indication.component.html',
  styleUrls: ['./indication.component.scss']
})
export class IndicationComponent implements OnInit {
  @Input() indication:Indication | undefined
  constructor() { }

  ngOnInit(): void {
  }

}
