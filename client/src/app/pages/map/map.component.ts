import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { MapData } from '../../services';
import { NotificationsService } from 'angular2-notifications';
@Component({
  selector: 'my-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
   map: any;
   selectedMarkers = [];
   distance ='';
  constructor(private mapData: MapData, private notificationsService: NotificationsService) {
    // Do stuff
  }

  ngOnInit() {
    this.map = Leaflet
      .map("map")
      .setView([51.505, -0.09], 5);

    Leaflet.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png")
      .addTo(this.map);
    this.mapData.getMarkers()
    .then((data:any) => {
      for (let markerData of data.features) {
          let marker = new Leaflet.marker([markerData.geometry.coordinates[1],markerData.geometry.coordinates[0]], {title: markerData.properties.city})
          let tooltip = Leaflet.tooltip({permanent: true,interactive:true, direction:'bottom'});
           tooltip.setContent(markerData.properties.city);
           marker.bindTooltip(tooltip).openTooltip();
          marker.on("click", (event) => {
            if (this.selectedMarkers.length < 2) {
              this.selectedMarkers.push(event.target)
              console.log(this.selectedMarkers);
            }
            else {

            }
            
          })
          marker.addTo(this.map)
      }
      console.log(data);
    })
     
  }
  refresh() {
    this.selectedMarkers = [];
    this.distance = '';
  }
  checkDistance() {

    this.mapData.checkDistance(this.selectedMarkers[0].getLatLng(), this.selectedMarkers[1].getLatLng())
    .then(res => {
      this.distance = res.toString();
    },
    err => {
      this.notificationsService.error(
        'Упс',
        err,
        {
            showProgressBar: true,
            pauseOnHover: false,
            clickToClose: true
        }
    );
    })
  }
}
