import {
  environment
} from '../../../environments/environment';
import {
  Component,
  OnInit,
  ChangeDetectorRef
} from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import {
  FeatureCollection
} from 'geojson/index';

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
      device: 'iPhone',
      violationType: 'Unkown Location',
      timeOfOccurance: 'August 1st, 2020, 11:35am EST'
    },
    {
      device: 'Laptop',
      violationType: 'Out of Compliance',
      timeOfOccurance: 'June 28th, 2020, 11:30pm EST'
    }
  ];


  public devices: FeatureCollection = {
    type: "FeatureCollection",
    features: [{
      type: 'Feature',
      properties: {
        description: "Laptop",
        icon: 'marker'
      },
      geometry: {
        type: 'Point',
        coordinates: [
          -97.848339, 30.405442
        ]
      }
    },
    {
      type: 'Feature',
      properties: {
        description: 'iPhone',
        icon: 'marker'
      },
      geometry: {
        type: 'Point',
        coordinates: [-97.851928, 30.405377]
      }
    }
    ]
  };

  public geoFences = [{
    name: 'home',
    coordinates: [
      [-97.850580, 30.406246],
      [-97.850323, 30.406713],
      [-97.850127, 30.406595],
      [-97.850363, 30.406172]
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
      this.map.addSource('devices', {
        'type': 'geojson',
        'data': this.devices
      });
      this.map.addLayer({
        'id': 'poi-labels',
        'type': 'symbol',
        'source': 'devices',
        'layout': {
          'text-field': ['get', 'description'],
          'text-variable-anchor': ['top', 'bottom', 'left', 'right'],
          'text-radial-offset': 0.5,
          'text-justify': 'left',
          'icon-image': ['concat', ['get', 'icon'], '-15']
        }
      });
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