// Ensure the DOM is fully loaded before executing scripts
$(document).ready(function() {

  $(document).on("error", ".icon-platform", function() {
    $(this).hide();
  });
// Index for fallback videos in case the main video fails to load
let currentFallbackVideoIndex = 0;

// Array of fallback video URLs from the game data
let fallbackVideos = window.gameData.videos;

/**
 * Index for fallback images in case all videos fail to load
 */
let currentFallbackImageIndex = 0;
let fallbackImages = window.gameData.screenshots;


if(fallbackVideos.length === 0 && fallbackImages.length === 0){
    $("#media-error").removeClass("hidden")
    $("#media-image").hide();
    $("#media-video").hide();
} else if (fallbackVideos.length === 0 && fallbackImages.length > 0){
    $("#media-video").hide();
    $("#media-image").attr("src", fallbackImages[0]);
    setActiveSliderBySrc(fallbackImages[0]);
    $("#media-image").show();
} else {
    $("#media-video").attr("src", fallbackVideos[0]);
    setActiveSliderBySrc(fallbackVideos[0]);
    $("#media-video").show();
}
/**
 * Handle video switching by adding click event listeners to the video thumbnails.
 * - When a video thumbnail is clicked, switch the main video source and update the active slider.
 * - Handles transitions between image and video, and between two video elements.
 */
$('.video-and-image video').on('click', function() {
    let currentSrc = $(this).attr('src');
    setActiveSliderBySrc(currentSrc);
    if($("#media-image").is(':visible'))
    {
      $("#media-video").attr('src', currentSrc);
      $("#preloaded-video").attr('src', " ");
      hideImage();
    }
    else{
      // Fade out the video, change the source, and fade it back in
      if($("#preloaded-video").is(':visible')){
          $("#media-video").attr('src', currentSrc);
          $("#preloaded-video")[0].pause();
          $("#preloaded-video").fadeOut(500, () => {
            $("#media-video").fadeIn(500);    
          });
      } else{
        // Fade out the video, change the source, and fade it back in
        $("#preloaded-video").attr('src', currentSrc);
        $("#media-video")[0].pause();
          $("#media-video").fadeOut(500, () => {
            $("#preloaded-video").fadeIn(500);
          });
      }
    }
});

/**
 * Handle image switching by adding click event listeners to image thumbnails.
 * - When an image thumbnail is clicked, switch the main image source and update the active slider.
 * - Handles transitions between video and image, and between two images.
 */
$('.video-and-image img').on('click', function() {
    let currentSrc = $(this).attr('src');
    setActiveSliderBySrc(currentSrc);
    if($("#media-video").is(':visible') || $("#preloaded-video").is(':visible')){
      showImage();
      $("#media-image").attr('src', currentSrc);
    } else{
      // Fade out the image, change the source, and fade it back in
      $("#media-image").fadeOut(500, () => {
          $("#media-image").attr('src', currentSrc);
          $("#media-image").fadeIn(500);
      });
    }
  });

  /**
 * Hide the main image and fade in the main video.
 */
function hideImage(){
    $("#media-image").fadeOut(500, function() {
        $('#media-video').fadeIn(500);
    });
}

/**
 * Show the main image and fade out any visible video.
 */
function showImage(){
    if($("#preloaded-video").is(':visible'))
    {
        $("#preloaded-video")[0].pause();
        $("#preloaded-video").fadeOut(500, function() {
            $('#media-image').fadeIn(500);
        });
    } else {
      $('#media-video')[0].pause();
      $("#media-video").fadeOut(500, function() {
          $('#media-image').fadeIn(500);
      });
  }
}

/**
 * Remove platform icon image element if it fails to load.
 */
$('.platform-icon').on('error', function() {
  $(this).hide();
});

/**
 * Remove video element if it fails to load.
 */
$(".video-and-image video").on('error', function() {
  $(this).hide();
});


/**
 * Handle initial video load errors by trying fallback videos.
 * If the current video fails to load, try the next one in the fallback list.
 */
$("#media-video").on('error', tryNextVideo);


/**
 * Try the next fallback video source if the current one fails to load.
 * Also updates the active slider indicator.
 */
function tryNextVideo(){
    if(currentFallbackVideoIndex < fallbackVideos.length){
        let nextSrc = fallbackVideos[currentFallbackVideoIndex];
        $("#media-video").attr("src", "");
        $("#media-video").attr("src", fallbackVideos[currentFallbackVideoIndex]);
        setActiveSliderBySrc(nextSrc);
        currentFallbackVideoIndex++;
    } else {
    // All fallback videos have been tried, hide the video element and show the image
        $("#media-video").hide();
        // Try to show the first screenshot image if available
        tryNextImage();
}
}

// If all fallback videos have been tried, switch to the first screenshot image
$("#media-image").on('error', tryNextImage);

/**
 * Try the next fallback image source if the current one fails to load.
 * Also updates the active slider indicator.
 */
function tryNextImage(){
 if(currentFallbackImageIndex < fallbackImages.length){
        let nextImageSrc = fallbackImages[currentFallbackImageIndex];
        $("#media-image").attr("src", "");
        $("#media-image").attr("src", nextImageSrc);
        setActiveSliderBySrc(nextImageSrc);
        currentFallbackImageIndex++;
        $("#media-image").show();
    } else {
      $("#media-error").removeClass("hidden")
        $("#media-image").hide();
        $("#media-video").hide();
    }
  }

/**
 * Set the .active class on the slider thumbnail that matches the given src.
 * @param {string} src - The source URL to match.
 */
function setActiveSliderBySrc(src) {
  $('.slider-content').removeClass('active');
  $('.slider-content').filter(function() {
    return $(this).attr('src') === src;
  }).addClass('active');
}
});