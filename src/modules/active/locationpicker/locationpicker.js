// locationpicker functions

var selectLocation = {
  coords: {
    latitude: null,
    longitude: null
  }
};

function setGMap() {
  $('#myLocationPicker').locationpicker({
    location: {
      latitude: myDefaultLocation.coords.latitude,
      longitude: myDefaultLocation.coords.longitude
    },
    radius: 1,
    zoom: 16,
    onchanged: function(currentLocation, radius, isMarkerDropped) {
      var mapContext = $(this).locationpicker('map');
      selectLocation.coords.latitude = currentLocation.latitude;
      selectLocation.coords.longitude = currentLocation.longitude;
    },
    inputBinding: {
      latitudeInput: $('#us3-lat'),
      longitudeInput: $('#us3-lon'),
      locationNameInput: $('#us3-address')
    },
    enableAutocomplete: true
  });
  $('#myLocationPickerModal').on('shown.bs.modal', function() {
    $('#myLocationPicker').locationpicker('autosize');
  });
}

function getLocation() {
  kai.getLocation(function(position) {
    if (position.coords) {
      myDefaultLocation.coords = position.coords;
    }
  });
}
