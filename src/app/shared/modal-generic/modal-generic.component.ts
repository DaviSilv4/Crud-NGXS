import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss']
})
export class ModalGenericComponent implements OnInit {

  @Input() toggle!: boolean;

  constructor() { }

  ngOnInit() {
  }

  public closeModal(): void {
    if(this.toggle === true) {
      this.toggle = false;
    }
    console.log(this.toggle);
  }

}
