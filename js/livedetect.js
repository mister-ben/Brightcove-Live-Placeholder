(function() {

  /*	Shows a placeholder image over a video player until a live video is available.
		The player will repeatedly attempt to retrive the master playlist URL until successful. Then the overlay
		is removed. Note the video does not play at this point because mobile browsers do not allow playback to
		be initiated by the API before playback has begun.
		Assumptions:
			* Server hosting the master playlist has CORS enabled (Brightcove's Akamai CDN should have this)
			* The Brightcove video has a length of -1. This is used to determine if it's a live video. The
			 Brightcove Live module creates videos with length set to -1.
			* The master playlist is unique and has never existed before - Akamai do not delete the master playlists,
			 so if the same stream name is re-used, the master playlist is available before streaming starts. The
			 Brightcove Live module creates unique URLs.
	*/


  var _player = brightcove.api.getExperience();
  var videoPlayer = _player.getModule(brightcove.api.modules.APIModules.VIDEO_PLAYER);

  var overlay = videoPlayer.overlay();
  $(overlay).css({
    backgroundSize: "100%",
    backgroundImage: "url('http://upload.wikimedia.org/wikipedia/commons/4/4d/Veneto_Testcard.jpg')",
    width: $(window).width(),
    height: $(window).height(),
    display: "none"
  });

  var init = function() {
    videoPlayer.getCurrentVideo(function(v) {
      if (v && v.defaultURL && v.defaultURL.indexOf('m3u8') > 1 && v.length && v.length == -1) {
        console.log(v);
        $(overlay).show();
        getURL(v.defaultURL);
      } else {
        $(overlay).hide();
      }
    });
  }

  var getURL = function(url) {
    $.ajax({
      type: "GET",
      url: url,
      success: function(data) {
        console.log("success");
        $(overlay).fadeOut();
      },
      error: function() {
        console.log("error");
        setTimeout(function() {
          getURL(url);
        }, 10000)
      }
    });
  }

  videoPlayer.addEventListener(brightcove.api.events.MediaEvent.CHANGE, init);
  init();
})();