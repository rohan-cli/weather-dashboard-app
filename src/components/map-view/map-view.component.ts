import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  ViewChild,
  ElementRef
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as L from 'leaflet';

@Component({
  selector: 'app-map-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.scss']
})
export class MapViewComponent implements AfterViewInit {
  @ViewChild('mapContainer', { static: true }) mapContainer!: ElementRef;

  @Output() mapClicked = new EventEmitter<{ lat: number; lon: number }>();

  private map!: L.Map;

  private _coord: { lat: number; lon: number } | null = null;

  @Input() set coord(coords: { lat: number; lon: number } | null) {
    this._coord = coords;
    if (coords && this.map) {
      this.zoomToCity(coords);
    }
  }

  ngAfterViewInit(): void {
    this.initializeMap();
    if (this._coord) {
      this.zoomToCity(this._coord);
    }
  }

  initializeMap(): void {
    this.map = L.map(this.mapContainer.nativeElement).setView([0, 0], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(this.map);

    this.map.on('click', (e: L.LeafletMouseEvent) => {
      const { lat, lng } = e.latlng;
      this.mapClicked.emit({ lat, lon: lng });
    });
  }

  zoomToCity(coords: { lat: number; lon: number }) {
    this.map.flyTo([coords.lat, coords.lon], 10, {
      animate: true,
      duration: 1.5
    });
  }
}
