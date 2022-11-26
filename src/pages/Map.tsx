import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';
    //styles
import '../styles/main.css';
import '../styles/pages/map.css';
import 'mapbox-gl/dist/mapbox-gl.css';
    //socket
import { io, Socket } from "socket.io-client";
    //endpoin
import userLocation from '../utils/utils';


const ENDPOINT = 'localhost:5000'


export default function MainMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnVsbHN0YWNrb2ZweXJleCIsImEiOiJjbGF0Zzc2M24wMGdlM29vMjZ0ODF3OTVrIn0.GlasOHW38A8XaAolVYvekA'
 
    const geojson = {
        'type': 'FeatureCollection',
        'features': [
            {
                'type': 'Feature',
                'geometry': {
                'type': 'Point',
                'coordinates': [-77.032, 38.913] as [number, number]
            },
                'properties': {
                    'id': 1,
                'title': 'place',
                'description': '<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>'
            }
            },
            {
                'type': 'Feature',
                'geometry': {
                'type': 'Point',
                'coordinates': [-122.414, 37.776] as [number, number]
                },
                    'properties': {
                        'id': 2,
                        'title': 'place',
                        'description': '<strong>Make it Mount Pleasant</strong><p>Make it Mount Pleasant is a handmade and vintage market and afternoon of live entertainment and kids activities. 12:00-6:00 p.m.</p>'
                }
            }
        ]
    }


    useEffect((): any => {
        let socket: Socket
        socket = io(ENDPOINT)

        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/fullstackofpyrex/clatkm4q1002z15mw3y4wd6oi',
            center: [21.0200, 52.2268],
            zoom: 13,
        })


            /* markers with popup */
        for (const feature of geojson.features) {
            const el = document.createElement('div')
            el.className = 'marker'

            new mapboxgl.Marker(el).setLngLat(
                feature.geometry.coordinates
            ).addTo(map)
        
            new mapboxgl.Marker(el)
                .setLngLat(feature.geometry.coordinates)
                .setPopup(
                    new mapboxgl.Popup({offset: 25})
                        .setHTML(
                            `
                                <h3>${feature.properties.title}</h3>
                                <p>${feature.properties.description}</p>   
                            `
                        )
                )
                .addTo(map)
        }

            /* zoom btns */
        map.addControl(new mapboxgl.NavigationControl({
            showZoom: true,
            showCompass: true
        }), 'bottom-right')
        map.addControl(new mapboxgl.FullscreenControl(), 'bottom-right')


            /* geolocation */
        map.addControl(
            new mapboxgl.GeolocateControl({
                positionOptions: {
                    enableHighAccuracy: true
                },
                trackUserLocation: true,
                showUserHeading: true
            }), 'bottom-right'
        )


            /* geotracker */
        setInterval(() => {
            if ("geolocation" in navigator) {
                console.log("track position enabled")
                navigator.geolocation.getCurrentPosition(position => {
                    console.log(position.coords.longitude, position.coords.latitude)

                    socket.emit(userLocation(), {longitude: position.coords.longitude, latitude: position.coords.latitude})
                })
            } else {
                console.log("track position DISABLED!!!")
            }
        }, 3000)
    })

 
    
    return (
        <>
            <div id="map"></div>
        </>
    )
}