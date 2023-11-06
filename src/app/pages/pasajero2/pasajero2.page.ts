import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { ServicioFirebaseService } from 'src/app/services/servicio-firebase.service';
import { Viaje } from 'src/app/interface/viaje';
import * as L from "leaflet";
import { Icon } from "leaflet";
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field'; 
@Component({
  selector: 'app-pasajero2',
  templateUrl: './pasajero2.page.html',
  styleUrls: ['./pasajero2.page.scss'],
})
export class Pasajero2Page implements OnInit {
  valor: number = 0;
  constructor(private router: Router,
              private toastCtrl: ToastController, 
              private servFire:ServicioFirebaseService) { }

  ngOnInit() {
    this.loadLeafletMap()
  }
  menu(){
    this.router.navigate(['/menu'])
  }
  cuenta(){
    this.router.navigate(['/cuenta'])
  }
  servicios(){
    this.router.navigate(['/servicios'])
  }
  conductor(){
    this.router.navigate(['/conductor'])
  }
  pasajero4(){
    this.router.navigate(['/pasajero4'])
  }
  grabarViaje() {
    const usuario = localStorage.getItem('username');
    
    if (usuario !== null) {
      this.servFire.obtenerIdViajeEnCurso(usuario).then((idViajeEnCurso) => {
        if (idViajeEnCurso) {
          this.mostrarAlerta("Alerta", "No puedes crear un nuevo viaje porque ya tienes uno en curso.");
        } else {
          this.servFire.buscarVehiculoPorChofer(usuario).then((vehiculo) => {
            if (vehiculo) {
              let mi_viaje: Viaje = {
                direccion_inicial: 'Calle Falsa 15',
                direccion_final: 'Calle Falsa 6',
                valor: this.valor,
                chofer_id: usuario,
                pasajero_id: '',
                estado: 1,
                patente: vehiculo.patente, 
              };
  
              this.servFire.grabarViaje(mi_viaje).then(() => {
                console.log("Viaje grabado");
              }).catch((e) => {
                console.log(e);
              }).finally(() => {
                this.router.navigate(['/viajeconductor']);
              });
            } else {
              this.mostrarAlerta("Alerta", "No tienes un vehículo registrado, no puedes crear un viaje.");
            }
          });
        }
      });
    } else {
      console.log('El valor de "username" en el localStorage es null.');
    }
  }
  async mostrarAlerta(titulo: string, mensaje: string) {
    const alert = await this.toastCtrl.create({
      header: titulo,
      message: mensaje,
      position: 'top',
      buttons: ['OK']
    });

    await alert.present();
  }
  


  leafletMap: any;

  zoom: number = 8;

  loadLeafletMap() {
    console.log('cargado');
    this.leafletMap = new L.Map('mapId');
    this.leafletMap.setView([-33.6107, -70.5746], 13);

    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(this.leafletMap);
    var redicon = L.icon({
      iconUrl: 'assets/img/png.png',
      iconSize: [35,30],
  });
    L.marker([-33.6107, -70.5746], {icon: redicon}).addTo(this.leafletMap)
      .bindPopup('Estas aquí.')
      .openPopup();
  }

}
