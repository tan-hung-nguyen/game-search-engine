$('.video-and-image video').on('click', function() {
    let currentSrc = $(this).attr('src');
    $('#media-video').attr('src', currentSrc); 
    hideImage();
  });

$('.video-and-image img').on('click', function() {
    let currentSrc = $(this).attr('src');
    $('#media-image').attr('src', currentSrc);
    showImage();
  });

function hideImage(){
    $('#media-image').hide();
    $('#media-video').show();
}
function showImage(){
    $('#media-video')[0].pause();
    $('#media-video').hide();
    $('#media-image').show();
}
