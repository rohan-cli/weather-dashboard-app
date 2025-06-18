import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements OnInit {
  @Output() mapClicked = new EventEmitter<{ lat: number; lon: number }>();
  @Input() set coord(coords: any) {
    if (coords)
      this.initializeMap();
    this.zoomToCity(coords);
  }

  private map!: L.Map;

  ngOnInit(): void {
    this.initializeMap();
  }

  initializeMap(): void {
    this.map = L.map('map').setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.mapClicked.emit({ lat, lon: lng });
    });
  }

  zoomToCity(coords: { lat: number; lon: number }) {
    if (this.map) {
      this.map.flyTo([coords.lat, coords.lon], 10, {
        animate: true,
        duration: 1.5
      });
    }
  }
}
