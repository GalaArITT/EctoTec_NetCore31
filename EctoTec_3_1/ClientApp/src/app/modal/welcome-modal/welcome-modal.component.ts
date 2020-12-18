import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-welcome-modal',
  templateUrl: './welcome-modal.component.html',
  styleUrls: ['./welcome-modal.component.css']
})
export class WelcomeModalComponent implements OnInit {

  closeModal = true;
  @Output() modalEvent = new EventEmitter<boolean>();
  @Input() title: string;
  @Input() message: string;
  constructor() { }

  ngOnInit() {
  }
  closeModalFunction() {
    this.modalEvent.emit(this.closeModal);
  }

}
