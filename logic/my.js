$(function() {
  var map;

  L.mapbox.accessToken = config.apikey;
  var map = L.mapbox.map('map', config.mapboxUser, {
    zoomControl: false,
    center: [22.287, 114.173],
    zoom: 14,
    minZoom: 12
  });
      
// listeners //
  $('#info_btn').click(showInfo);
  $('#info').click(hideInfo);
  $('#umbrella_btn').click(showUmbrella);
  $('#umbrella').click(hideUmbrella);
  $('#warning').click(hideWarning);
  $('#flyMongKok').click({destination: "MongKok"}, fly);
  $('#flyCausewayBay').click({destination: "CausewayBay"}, fly);
  $('#flyAdmiralty').click({destination: "Admiralty"}, fly);
  $('form label i').click(checkSelection);
  $('#vote_btn').click({destination: "Hong Kong"}, fly);
  $('#vote_btn').click(vote);


  $('.untouched').focus(function() {
    $(this).val('');
    $(this).removeClass('untouched');
    $(this).unbind();
  });

  function fly(e) {
    var _latlng, _zoom;
    switch (e.data.destination) {
      case "MongKok":
        _latlng = [22.319, 114.169];
        _zoom = 18;
        // map.style.addClass('night');
        break;
      case "Admiralty":
        _latlng = [22.281, 114.165];
        _zoom = 17;
        // map.style.addClass('night');
        break;
      case "CausewayBay":
        _latlng = [22.28, 114.184];
        _zoom = 18;
        // map.style.addClass('night');
        break;
      default:
        _latlng = [22.287, 114.173];
        _zoom = 12;
        // map.style.removeClass('night');
        break;
    }
    map.panTo(_latlng);
    $('button').removeClass('active');
    $(this).addClass('active');
    // map.setZoom(_zoom, {animate: true});

    // map.setZoomAround( _latlng, _zoom, {animate: true});
    // if (map.style.classes.night) {
    //   map.style.removeClass('night');
    // } else {
    //   map.style.addClass('night');
    // }
  }

  function showInfo() {
    $('#info').fadeIn();
  }
  function hideInfo() {
    $('#info').fadeOut();
  }

  function showUmbrella() {
    $('#umbrella').fadeIn();
  }
  function hideUmbrella() {
    $('#umbrella').fadeOut();
  }
  function hideWarning() {
    $('#warning').fadeOut();
    $('.active').removeClass('active');
  }
  function checkSelection() {
    setTimeout(function() {
      var voteMK = $('input[name=radioMK]:checked').val(),
          voteCWB = $('input[name=radioCWB]:checked').val(),
          voteADM = $('input[name=radioADM]:checked').val();
      console.log(voteMK);
      console.log(voteCWB);
      console.log(voteADM);
      if (voteMK && voteCWB && voteADM) {
        console.log('remove hide.');
        $("#confirm").removeClass('hide');
      }
    }, 500);
  }
  function vote(e) {
    e.preventDefault();
    var errorMsg = 'Error Message',
        voteMK = $('input[name=radioMK]:checked').val(),
        voteCWB = $('input[name=radioCWB]:checked').val(),
        voteADM = $('input[name=radioADM]:checked').val(),
        infoPhone = $('input[name=phone]').val(),
        infoHKID = $('input[name=hkid]').val(),
        result;
    if (voteMK && voteCWB && voteADM && infoPhone && infoPhone!="23456789" && infoHKID && infoHKID!="A123456(Z)" ) {

      ///// still need type checking here /////
      // phone no. must be 8 digit numbers
      // hk id number can do regex matching
      
      result = {
        "voteMK" : voteMK,
        "voteCWB" : voteCWB,
        "voteADM" : voteADM,
        "infoPhone" : infoPhone,
        "infoHKID" : infoHKID
      }
      console.log(result);
      $("#verification").fadeIn();
        $(window).trigger('resize');

      ///// hook up with polling backend /////
      // phone no. must be 8 digit numbers
      // hk id number can do regex matching

    } else {
      errorMsg = '';
      if (!voteMK) {errorMsg += "You need to vote for MongKok <br/>"};
      if (!voteCWB) {errorMsg += "You need to vote for Causeway Bay <br/>"};
      if (!voteADM) {errorMsg += "You need to vote for Admiralty <br/>"};
      if (!infoPhone || infoPhone=="23456789") {errorMsg += "You need to provide a HK mobile no. <br/>"};
      if (!infoHKID || infoHKID=="A123456(Z)") {errorMsg += "You need to provide a valid HKID no. <br/>"};
      fireWarning(errorMsg);
    }
  }
  function fireWarning(msg) {
    $('#errorMsg').html(msg);
    $('#warning').fadeIn();
  }
});