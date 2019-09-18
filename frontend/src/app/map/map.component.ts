import { Component, OnInit } from '@angular/core';
import * as Utils from '../shared/Utils';
import { MapService } from './map.service';

declare let L: any;
// SRP: Show the map
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private mapService: MapService) { }

  ngOnInit() {
    this.mapService.getMapData().subscribe(data => {
      const partners = Utils.PARTNERS;
      const map = L.map('map', {
        minZoom: 1,
        maxZoom: 10,
        zoomControl: false                // set to false !
      }).setView([34, 0], 2);   // sets the reusable home position

      L.Control.zoomHome = L.Control.extend({
        options: {
          position: 'topleft',
          zoomInText: '<span style="font-size:1.65em">+</span>',
          zoomInTitle: 'Zoom in',
          zoomOutText: '<span style="font-size:1.65em">-</span>',
          zoomOutTitle: 'Zoom out',
          zoomHomeText: '<span class="glyphicon glyphicon-home"></span>',
          zoomHomeTitle: 'Zoom home'
        },

        onAdd: function (mapR: any) {
          const controlName = 'gin-control-zoom';
          const container = L.DomUtil.create('div', controlName + ' leaflet-bar');
          const options = this.options;

          this._zoomInButton = this._createButton(options.zoomInText, options.zoomInTitle,
            controlName + '-in', container, this._zoomIn);
          this._zoomHomeButton = this._createButton(options.zoomHomeText, options.zoomHomeTitle,
            controlName + '-home', container, this._zoomHome);
          this._zoomOutButton = this._createButton(options.zoomOutText, options.zoomOutTitle,
            controlName + '-out', container, this._zoomOut);

          this._updateDisabled();
          mapR.on('zoomend zoomlevelschange', this._updateDisabled, this);
          return container;
        },

        onRemove: function (mapR: any) {
          mapR.off('zoomend zoomlevelschange', this._updateDisabled, this);
        },

        _zoomIn: function (e: any) {
          this._map.zoomIn(e.shiftKey ? 3 : 1);
        },

        _zoomOut: function (e: any) {
          this._map.zoomOut(e.shiftKey ? 3 : 1);
        },

        _zoomHome: function (e: any) {
          const lat = 34;
          const lng = 0;
          const zoom = 2;
          map.setView([lat, lng], zoom);
        },

        _createButton: function (html: any, title: any, className: any, container: any, fn: any) {
          const link = L.DomUtil.create('a', className, container);
          link.innerHTML = html;
          link.href = '#';
          link.title = title;

          L.DomEvent.on(link, 'mousedown dblclick', L.DomEvent.stopPropagation)
            .on(link, 'click', L.DomEvent.stop)
            .on(link, 'click', fn, this)
            .on(link, 'click', this._refocusOnMap, this);
          return link;
        },

        _updateDisabled: function () {
          const mapR = this._map,
            className = 'leaflet-disabled';

          L.DomUtil.removeClass(this._zoomInButton, className);
          L.DomUtil.removeClass(this._zoomOutButton, className);

          if (mapR._zoom === mapR.getMinZoom()) {
            L.DomUtil.addClass(this._zoomOutButton, className);
          }
          if (mapR._zoom === mapR.getMaxZoom()) {
            L.DomUtil.addClass(this._zoomInButton, className);
          }
        }
      });
      const zoomHome = new L.Control.zoomHome();
      zoomHome.addTo(map);

      // Add GeoJson World MAP points
      L.geoJson(Utils.WORLD_DATA2, {
        style: style,
        onEachFeature: onEachFeature
      }).addTo(map);

      function style(feature: any) {
        return {
          weight: 2,
          opacity: 1,
          color: 'rgb(230,230,230)',
          dashArray: '',
          fillOpacity: 0.7,
          fillColor: getColor(feature)
        };
      }

      // Color partners in blue and others in gray
      function getColor(feature: any) {
        return partners.includes(feature.properties.name) ? 'blue' : 'gray';
      }

      function highlightFeature(e: any) {
        if (!partners.includes(e.target.feature.properties.name)) { return; }
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          color: '#666',
          dashArray: '',
          fillOpacity: 0.7,
          fillColor: 'dodgerblue'
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
      }

      function onEachFeature(feature: any, layer: any) {
        layer.on({
          mouseover: highlightFeature,
          mouseout: resetHighlight,
          click: zoomToFeature
        });
        if (!partners.includes(feature.properties.name)) { return; }
        const getCountry = data.PARTNERS.find(val => val.name === feature.properties.name);
        if (getCountry === undefined) { return; }

        if (getCountry.data.length === 1) {
          const icon_url = 'https://www.countryflags.io/' + getCountry.data[0].flagcode + '/flat/32.png';
          const logo_url = '../../assets/images/partnerslogo/' + 'default64' + '.png';

          const singlePopup =
            '<div style="width:300px;">'
            + '<img src="' + icon_url + '"/><span style="margin-left:10px; margin-top:5px; font-size:1.5em;">'
            + feature.properties.name + '</span>'
            + '</div><br>'
            + '<div>'
            + '<img style="width:50px; float:left; margin-right:10px;" src="' + logo_url + '"/>'
            + '<div style="font-size:1.5em;">' + getCountry.data[0].info + '</div>'
            + '<div style="font-size:1.5em;"><a target="_blank" href=' + getCountry.data[0].link + '>'
            + getCountry.data[0].link + '</a></div>'
            + '</div>';
          layer.bindPopup(singlePopup);
        } else {
          const icon_url = 'https://www.countryflags.io/' + getCountry.data[0].flagcode + '/flat/32.png';
          const logo_url = '../../assets/images/partnerslogo/' + 'default64' + '.png';
          const logo2_url = '../../assets/images/partnerslogo/' + 'default64' + '.png';

          const doublePopup =
            '<div style="width:300px;">'
            + '<img src="' + icon_url + '"/><span style="margin-left:10px; margin-top:5px; font-size:1.5em;">'
            + feature.properties.name + '</span>'
            + '</div><br>'
            + '<div>'
            + '<img style="width:50px; float:left; margin-right:10px;" src="' + logo_url + '"/>'
            + '<div style="font-size:1.5em;">' + getCountry.data[0].info + '</div>'
            + '<div style="font-size:1.5em;"><a target="_blank" href=' + getCountry.data[0].link + '>'
            + getCountry.data[0].link + '</a></div>'
            + '</div>'
            + '<br>'
            + '<div>'
            + '<img style="width:50px; float:left; margin-right:10px;" src="' + logo2_url + '"/>'
            + '<div style="font-size:1.5em;">' + getCountry.data[1].info + '</div>'
            + '<div style="font-size:1.5em;"><a target="_blank" href=' + getCountry.data[1].link + '>'
            + getCountry.data[1].link + '</a></div>'
          layer.bindPopup(doublePopup);
        }
      }

      function resetHighlight(e: any) {
        //geojson.resetStyle(e.target);
        const layer = e.target;
        layer.setStyle({
          weight: 2,
          opacity: 1,
          color: 'rgb(230,230,230)',
          dashArray: '',
          fillOpacity: 0.7,
          fillColor: getColor(layer.feature)
        });

        if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
          layer.bringToFront();
        }
      }

      function zoomToFeature(e: any) {
        console.log('zoomed to ', e.target.feature.properties.name);

        // selectedCountry = e.target.feature.properties.name;
        // globalSelectedCountry = selectedCountry;
        // updateData(selectedCountry, timeInterval);
        // openModal("modal1", selectedCountry);
      }
    }, error => console.log('error:', error));
  }
}
