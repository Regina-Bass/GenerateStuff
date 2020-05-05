const API_KEY =  '563492ad6f91700001000001e708769464ef42f9b6aa7ec6da0c1d7e';
var image = '';


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