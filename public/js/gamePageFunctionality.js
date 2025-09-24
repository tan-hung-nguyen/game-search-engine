// Index for fallback videos in case the main video fails to load
let currentFallbackVideoIndex = 0;

// Array of fallback video URLs from the game data
let fallbackVideos = window.gameData.videos;

let offers = window.gameData.offers[0];
/**
 * Check if there are any discounts and then apply discount style.
 * - Adds a strikethrough to the initial price if there's a discount.
 * - Appends the discounted price and discount percent badge.
 */
if(offers.price.discount_percent > 0){
    $("#initial-price").addClass("crossed");
    $(".price-value").append(`<span class="discounted-price">$${offers.price.value}</span>`);
    $(".price-value-container").append(`<span class="discount-percent">-${offers.price.discount_percent}%</span>`);
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
        $("#media-video").attr("src", fallbackVideos[currentFallbackVideoIndex]);
        setActiveSliderBySrc(nextSrc);
        currentFallbackVideoIndex++;
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
