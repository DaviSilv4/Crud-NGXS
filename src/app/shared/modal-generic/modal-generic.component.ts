import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-modal-generic',
  templateUrl: './modal-generic.component.html',
  styleUrls: ['./modal-generic.component.scss']
})
export class ModalGenericComponent implements OnInit {

  @Input() toggle!: boolean;
  @Input() title!: string;

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public closeModal(): void {
    if(this.toggle === true) {
      this.toggle = false;
    }
    this.router.navigate(['/pages/list']);

  }

}
