$(".leaflet-popup-close-button").attr("href", "#")
let myIcon = L.icon({
    iconUrl: '/assets/images/icon-location.svg',
    iconSize: [45, 52],
    iconAnchor: [22, 52],
    popupAnchor: [0, -52],
});
let mymap = L.map('mapid')
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
    // attribution: ' <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoicGhhbnRvbW96IiwiYSI6ImNraGp0M2F3eTE0eHEydG8xN2FzbjV1eDQifQ.Np9rILbmNHfMt6429oH0UA'
}).addTo(mymap);

let api_key = "at_G2NGz4xuh0bX6DhHqwYu0MB4CBKrV";
if($("#inp").val() === ""){
    $(function () {
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {apiKey: api_key, ipAddress: ""},
            success: function(data) {
                $("#ipaddress").text(data.ip);
                $("#location").text(data.location.city + ", " + data.location.region+ ", "+ data.location.country + " " + data.location.postalCode);
                $("#timezone").text("utc " + data.location.timezone);
                $("#isp").text(data.isp);
                console.log(data);
                let lat = data.location.lat;
                let lng = data.location.lng;
                mymap.setView([lat, lng], 13);
                
                var marker = L.marker([lat, lng], {icon: myIcon}).addTo(mymap);
                L.circle([lat, lng], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 1000
                }).addTo(mymap);
                marker.bindPopup("<b>" + data.isp +"</b>.").openPopup();

                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(mymap);
                }

                mymap.on('click', onMapClick);
            }
        });
    });
}
$("#go").click(()=>{
    let ipDom = $("#inp").val();
    if(ipDom.includes(".net") || ipDom.includes(".cn") || ipDom.includes(".com")){
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {apiKey: api_key, domain: ipDom },
            success: function(data) {
                $("#ipaddress").text(data.ip);
                $("#location").text(data.location.region + ", " + data.location.city);
                $("#timezone").text("utc " + data.location.timezone);
                $("#isp").text(data.isp);
                let lat = data.location.lat;
                let lng = data.location.lng;
                mymap.setView([lat, lng], 13);
                    
                var marker = L.marker([lat, lng], {icon: myIcon}).addTo(mymap);
                L.circle([lat, lng], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 1000
                }).addTo(mymap);
                marker.bindPopup("<b>" + data.isp +"</b>.").openPopup();
    
                var popup = L.popup();
    
                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(mymap);
                }
    
                mymap.on('click', onMapClick);
            
            }
        });
    }else{
        $.ajax({
            url: "https://geo.ipify.org/api/v1",
            data: {apiKey: api_key, ipAddress: ipDom },
            success: function(data) {
                // $("#map").append("<pre>"+ JSON.stringify(data,"",2)+"</pre>");
                $("#ipaddress").text(data.ip);
                $("#location").text(data.location.region + ", " + data.location.city);
                $("#timezone").text("utc " + data.location.timezone);
                $("#isp").text(data.isp);
                let lat = data.location.lat;
                let lng = data.location.lng;
                mymap.setView([lat, lng], 13);
                    
                var marker = L.marker([lat, lng], {icon: myIcon}).addTo(mymap);
                L.circle([lat, lng], {
                    color: 'red',
                    fillColor: '#f03',
                    fillOpacity: 0.5,
                    radius: 1000
                }).addTo(mymap);
                marker.bindPopup("<b>" + data.isp +"</b>.").openPopup();

                var popup = L.popup();

                function onMapClick(e) {
                    popup
                        .setLatLng(e.latlng)
                        .setContent("You clicked the map at " + e.latlng.toString())
                        .openOn(mymap);
                }

                mymap.on('click', onMapClick);
            
            }
        });
    }
});