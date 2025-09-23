let currentFallbackVideoIndex = 0;
let fallbackVideos = window.gameData.videos;
//handle video and image switching
$('.video-and-image video').on('click', function() {
    let currentSrc = $(this).attr('src');
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
        $("#preloaded-video").attr('src', currentSrc);
        $("#media-video")[0].pause();
          $("#media-video").fadeOut(500, () => {
            $("#preloaded-video").fadeIn(500);
          });
      }
    }
});

$('.video-and-image img').on('click', function() {
    let currentSrc = $(this).attr('src');

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

function hideImage(){
    $("#media-image").fadeOut(500, function() {
        $('#media-video').fadeIn(500);
    });
}
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


$('.slider-content').on('click', function() {
    $('.slider-content').removeClass('active');
    $(this).addClass('active');
});

// remove image element on error
$('img').on('error', function() {
  $(this).hide();
});

// Remove video element on error
$(".video-and-image video").on('error', function() {
  $(this).hide();
});

// Handle initial video load errors
$("#media-video").on('error', tryNextVideo);

function tryNextVideo(){
    if(currentFallbackVideoIndex < fallbackVideos.length){
        $("#media-video").attr("src", fallbackVideos[currentFallbackVideoIndex]);
        currentFallbackVideoIndex++;
    }
}

// add active class to first video element
$(document).ready(function() {
  setTimeout(() => {$('.slider-content').first().addClass('active')}, 500);
});
