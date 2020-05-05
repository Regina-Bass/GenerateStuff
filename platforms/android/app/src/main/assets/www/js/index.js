const API_KEY =  '563492ad6f91700001000001e708769464ef42f9b6aa7ec6da0c1d7e';
var image = '';
var address = undefined;


/************************************************************************************************ */

function updateMap(address){

    var onSuccess = function(position){
        var div = document.getElementById("map_canvas");

        div.width = window.innerWidth - 20;
        div.height = window.innerHeight * 0.8 - 40;

        var map = plugin.google.maps.Map.getMap(div);
        map.setDiv(div);
        

        map.addEventListener(plugin.google.maps.event.MAP_READY, onMapReady, onError);  

        function onMapReady(){
            var currentLocation = new plugin.google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        }


    }

    var onError = function(error){
        alert('code: ' + error.code + '\n' + 'message:' + error.message + '\n');
    };

    navigator.geolocation.getCurrentPosition(onSuccess, onError);

}

var button1 = document.getElementById("button1");
button1.addEventListener("click", onBtnClicked, false);

function onBtnClicked(){
    alert("Map updated");
    updateMap();
}


$(document).ready(function () {
    $("#form").submit(function (event) {
        event.preventDefault()

        var search = $("input:text").val()

        imagesearch()

    })


    function imagesearch() {
        $.ajax({
            method: 'GET',
            beforeSend: function (xhr) {
                xhr.setRequestHeader ("Authorization", API_KEY);
            },
            url: "https://api.pexels.com/v1/search?query="+search.value+"&per_page=5&page=1",
            success: function (data){
                console.log(data)
                //alert(search.value)
                data.photos.forEach(photo => {
                    image= `
                        <img src="${photo.src.original}"/>

                        `
                    description = `
                        <p> Author: ${photo.photographer}  <span></span>  URL:${photo.photographer_url} <span></span>  Image ID:${photo.id}  </p>
                    `
                    $("#images").append(image)
                    $("#images").append(description)
                });
            },
            error: function(error){
                console.log(error);
        }
        });

    }


})

/**plugin.google.maps.environment.setEnv({
    'API_KEY_FOR_BROWSER_RELEASE': 'AIzaSyD-2jg33yU5owQ8LoyZ6d08d2-lX6e5kSE'
  });
   
  // Create a Google Maps native view under the map_canvas div.
  var map = plugin.google.maps.Map.getMap(div);


  document.addEventListener("deviceready", function() {
    var div = document.getElementById("map_canvas");

    // Create a Google Maps native view under the map_canvas div.
    var map = plugin.google.maps.Map.getMap(div);

  }**/


/*var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();*/