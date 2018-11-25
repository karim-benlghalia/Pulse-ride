
      // This is a code to get the current location it is not really accurate for Desktop since it uses
      // HTML-5 browser location based on network-enabled geolocation (IP location) to determin the location rather than using the GPS
      // Note: This example requires that you consent to location sharing when
      // prompted by your browser. If you see the error "The Geolocation service
      // failed.", it means you probably did not give permission for the browser to
      // locate you.

      //global variables
      var fixedDistance;
      var duration_value;
      var map1;  

      

      function initMap() {
        
       var map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -33.8688, lng: 151.2195},
          zoom: 13
        });
        var card = document.getElementById('pac-card');
        var inputL = document.getElementById('CurrentL');
        var inputD = document.getElementById('desinL');


        map.controls[google.maps.ControlPosition.TOP_RIGHT].push(card);
      
      // current location detector
        infoWindow = new google.maps.InfoWindow;
        var geocoder = new google.maps.Geocoder;

        // Try HTML5 geolocation.
        
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);

        //getting the marker on the map and getting the adreess on the input field

            geocoder.geocode({'location': pos}, function(results, status) {
                if (status === 'OK') {
                  if (results[0]) {
                    map.setZoom(15);
                    var marker = new google.maps.Marker({
                      position: pos,
                      map: map
                    });
                    infowindow.setContent(results[0].formatted_address);
                    infowindow.open(map, marker);
                    document.getElementById('CurrentL').value = results[0].formatted_address;
                  } else {
                    window.alert('No results found');
                  }
                } else {
                  window.alert('Geocoder failed due to: ' + status);
                }
              });
              // End of getting the Marker

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
       

        // end current location detector

        //**************** Autocomplete code ********************************************//


        var autocompleteL = new google.maps.places.Autocomplete(inputL);
        var autocompleteD = new google.maps.places.Autocomplete(inputD);

        // Bind the map's bounds (viewport) property to the autocomplete object,
        // so that the autocomplete requests use the current map bounds for the
        // bounds option in the request.
        autocompleteL.bindTo('bounds', map);

        // Set the data fields to return when the user selects a place.
        autocompleteL.setFields(
            ['address_components', 'geometry', 'icon', 'name']);
            autocompleteD.setFields(
                ['address_components', 'geometry', 'icon', 'name']);

        var infowindow = new google.maps.InfoWindow();
        var infowindowContent = document.getElementById('infowindow-content');
        infowindow.setContent(infowindowContent);
        var marker = new google.maps.Marker({
          map: map,
          anchorPoint: new google.maps.Point(0, -29)
        });

        autocompleteL.addListener('place_changed', function() {
          infowindow.close();
          marker.setVisible(false);
          var placeL = autocompleteL.getPlace();
          if (!placeL.geometry) {
            // User entered the name of a Place that was not suggested and
            // pressed the Enter key, or the Place Details request failed.
            window.alert("No details available for input: '" + placeL.name + "'");
            return;
          }

          // If the place has a geometry, then present it on a map.
          if (placeL.geometry.viewport) {
            map.fitBounds(placeL.geometry.viewport);
          } else {
            map.setCenter(placeL.geometry.location);
            map.setZoom(17);  // Why 17? Because it looks good.
          }
          marker.setPosition(placeL.geometry.location);
          marker.setVisible(true);

          var address = '';
          if (placeL.address_components) {
            address = [
              (placeL.address_components[0] && placeL.address_components[0].short_name || ''),
              (placeL.address_components[1] && placeL.address_components[1].short_name || ''),
              (placeL.address_components[2] && placeL.address_components[2].short_name || '')
            ].join(' ');
          }

          infowindowContent.children['place-icon'].src = placeL.icon;
          infowindowContent.children['place-name'].textContent = placeL.name;
          infowindowContent.children['place-address'].textContent = address;
          infowindow.open(map, marker);
        });
        autocompleteD.addListener('place_changed', function() {
            infowindow.close();
            marker.setVisible(false);
            var placeL = autocompleteD.getPlace();
            if (!placeL.geometry) {
              // User entered the name of a Place that was not suggested and
              // pressed the Enter key, or the Place Details request failed.
              window.alert("No details available for input: '" + placeL.name + "'");
              return;
            }
  
            // If the place has a geometry, then present it on a map.
            if (placeL.geometry.viewport) {
              map.fitBounds(placeL.geometry.viewport);
            } else {
              map.setCenter(placeL.geometry.location);
              map.setZoom(17);  // Why 17? Because it looks good.
            }
            marker.setPosition(placeL.geometry.location);
            marker.setVisible(true);
  
            var address = '';
            if (placeL.address_components) {
              address = [
                (placeL.address_components[0] && placeL.address_components[0].short_name || ''),
                (placeL.address_components[1] && placeL.address_components[1].short_name || ''),
                (placeL.address_components[2] && placeL.address_components[2].short_name || '')
              ].join(' ');
            }
  
            infowindowContent.children['place-icon'].src = placeL.icon;
            infowindowContent.children['place-name'].textContent = placeL.name;
            infowindowContent.children['place-address'].textContent = address;
            infowindow.open(map, marker);
          });

        }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

   //************************************************************************** */  

 // calculate distance
 function calculateDistance() {

    var origin= localStorage.adress1;
    var destination = localStorage.adress2;
    //var origin = document.getElementById("CurrentL").value;
   // var destination = document.getElementById("desinL").value;
    var service = new google.maps.DistanceMatrixService();
    service.getDistanceMatrix(
        {
            origins: [origin],
            destinations: [destination],
            travelMode: google.maps.TravelMode.DRIVING,
            unitSystem: google.maps.UnitSystem.IMPERIAL, // miles and feet.
            // unitSystem: google.maps.UnitSystem.metric, // kilometers and meters.
            avoidHighways: false,
            avoidTolls: false
        }, callback);
}
// get distance results
function callback(response, status) {
    var retValues= [];
    if (status != google.maps.DistanceMatrixStatus.OK) {
        $('#result').html(err);
    } else {
        var origin = response.originAddresses[0];
        var destination = response.destinationAddresses[0];
        var Showtxt ="Better get on a plane. There are no roads between "  + origin + " and " + destination;
        if (response.rows[0].elements[0].status === "ZERO_RESULTS") {
            document.getElementById('geometryL').innerHTML= Showtxt;

        } else {
            
            var distance = response.rows[0].elements[0].distance;
            var duration = response.rows[0].elements[0].duration;
            console.log(response.rows[0].elements[0].distance);
            var distance_in_kilo = distance.value / 1000; // the kilom
            var distance_in_mile = distance.value / 1609.34; // the mile
            var duration_text = duration.text;
            duration_value = duration.value; // in seconds
            var duration_minutes= (duration_value/60).toFixed(2);
           fixedDistance =distance_in_mile.toFixed(2);

           
            var geometryOutput2 = `
         <ul class="list-group">
        <li class="list-group-item"><strong>Distance in mile</strong>: ${fixedDistance}</li>
        <li class="list-group-item"><strong>Duration in second</strong>: ${duration_minutes}</li>
          </ul>
        `;

    // Output to app
         
        document.getElementById('geometryD').innerHTML = geometryOutput2;
       // localStorage.dist1=fixedDistance;

            
        }
        
    }
    

}
/*
function check(){

    alert(fixedDistance);
}*/
function openNav() {
  document.getElementById("mySidenav").style.width = "250px";
}

function closeNav() {
  document.getElementById("mySidenav").style.width = "0";
}