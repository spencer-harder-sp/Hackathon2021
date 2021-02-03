import {
  environment
} from '../../../environments/environment';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';

@Component({
  selector: 'app-map-dashboard',
  templateUrl: './map-dashboard.component.html',
  styleUrls: ['./map-dashboard.component.scss']
})
export class MapDashboardComponent implements OnInit {

  // Cognito Identity Pool ID
  public identityPoolId = "us-east-1:54f2ba88-9390-498d-aaa5-0d97fb7ca3bd";
  // Amazon Location Service Map name
  public mapName = "ExampleMap";

  public violationList = [
    {
      device: 'Johns Laptop',
      violationType: 'Out of parity',
      timeOfOccurance: '11:30pm'
    }
  ];

  public geoFences = [
    {
      name: 'home',
      coordinates: [
        [-97.888112, 30.381129],
        [ -97.887901,30.381014],
        [-97.888051, 30.380822],
        [-97.888247, 30.380928]
      ]
    },
    {
      name: 'slpthq',
      coordinates: [
        [
          -97.84908771514893,
          30.405905471946284
        ],
        [
          -97.84953832626343,
          30.405484450068865
        ],
        [
          -97.84768223762512,
          30.40454061420837
        ],
        [
          -97.84758567810059,
          30.404771947371163
        ],
        [
          -97.8472638130188,
          30.405456690320833
        ],
        [
          -97.8483098745346,
          30.40591935175748
        ],
        [
          -97.84908771514893,
          30.405905471946284
        ]
      ]
    }
  ];

  public style = 'mapbox://styles/mapbox/streets-v11';
  public lat = 30.40518185139301;
  public lng = -97.84834776128115;
  public map: mapboxgl.Map;

  constructor() {
    (mapboxgl as any).accessToken = environment.mapbox.accessToken;
  }

  ngOnInit(): void {
    this.map = new mapboxgl.Map({
      container: 'map',
      style: this.style,
      zoom: 15,
      center: [this.lng, this.lat]
    });

    // Add map controls
    this.map.addControl(new mapboxgl.NavigationControl());

    this.map.on('load', () => {
      this.loadGeofences();
    });
  }

  public loadGeofences() {
    this.geoFences.forEach((fence: any) => {
      console.log(fence)
      this.map.addSource(fence.name, {
        'type': 'geojson',
        'data': {
          'properties': {
            "message": "Hello World!"
          },
          'type': 'Feature',
          'geometry': {
            'type': 'Polygon',
            'coordinates': [
              fence.coordinates
            ]
          }
        }
      });

      this.map.addLayer({
        'id': fence.name,
        'type': 'fill',
        'source': fence.name,
        'layout': {},
        'paint': {
          'fill-color': '#088',
          'fill-opacity': 0.5
        }
      });
    });
  }
}