import { Component, OnInit } from '@angular/core';
import { UserServiceService } from '../services/user-service.service';
import { CityServiceService } from '../services/city-service.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import * as moment from 'moment';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  providers:[DatePipe]
})
export class HomeComponent implements OnInit {
  constructor(
    private userServ:UserServiceService, 
    private cityServ:CityServiceService, 
    public formBuilder: FormBuilder,
    private router: Router,
    private toastServ:ToastrService,
    private datePipe: DatePipe){}

  formRegister : FormGroup
  ciudad :Array<any> = [];
  usuario:any;
  isSending = false;
  moreYears= false; 

  messageSuccess = '';
  showWelcomeModal = false;

  validatorsErrors = { email: false, telefono: false};

  ngOnInit() {
    this.obtenerCiudad();
    this.formRegister = new FormGroup({
      nombre: new FormControl(null, [Validators.required]),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telefono: new FormControl(null, [Validators.required, Validators.minLength(10), Validators.maxLength(10)]),
      idPais: new FormControl(null, [Validators.required]),
      fecha: new FormControl(null, [Validators.required])
    });
  }
  obtenerCiudad(){
    this.cityServ.verCiudad().subscribe(res=>{
      this.ciudad = res;
      console.log(res);
    });
  }
  soloLetras(event: any) {
    const patron = /^[a-zA-Z" "]*$/;
    if (!patron.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^a-zA-Z]/g, '');
    }
  }
  tecladoNumerico(event: any) {
    const patron = /^[0-9+-]*$/;
    if (!patron.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9+-]/g, '')
      // invalid character, prevent input
    }
  }
  validarConfirmacion(){
    if (this.formRegister.valid) {
      this.registrarUsuario();
    } else {
      this.formRegister.markAllAsTouched();
      console.log("error");
    }
  }
  compareDates(){
    let dateSelected = moment(`${this.formRegister.get('fecha').value}`,'yyyy-MM-dd');
    let horacien = moment().add(100,'years').toDate();
    console.log(dateSelected);
    console.log(horacien);
    this.moreYears =  moment(dateSelected).isAfter(horacien);
    return this.moreYears;
  }
  registrarUsuario(){
    this.isSending = true; 
    this.formRegister.patchValue({
      fecha: this.datePipe.transform(this.formRegister.get('fecha').value, 'yyyy-MM-dd')
    });
    this.userServ.InsertarUsuario(this.formRegister.value).subscribe(res=>{
      this.usuario = res;
      console.log(res);
      this.messageSuccess = `Su registro ha sido enviado satisfactoriamente`;
      this.showWelcomeModal = true;
    },error=>{
      this.messageSuccess = `${error}`;
      this.toastServ.error('Error al ingresar', 'verifique la información');
    });
  }
  receiveModalEvent(event: boolean) {
    if (event) {
      this.showWelcomeModal = !this.showWelcomeModal;
      this.router.navigate(['/']);
    }
  }
  
}
