import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-regstration-frame',
  templateUrl: './regstration-frame.component.html',
  styleUrls: ['./regstration-frame.component.scss']
})
export class RegstrationFrameComponent implements OnInit {
  src:string="./registreFrame.html"
  constructor() { }

  ngOnInit(): void {
  }

}
