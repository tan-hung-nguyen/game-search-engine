/**
 * Iterate over each element with ID 'percentage' and change the rating color
 * based on its value.
 */
$(".percentage").each(function() {
     // Get the percentage value from the element's text
    let percentage = parseFloat($(this).text());
    ratingColor(percentage, $(this));
})

/**
 * Adds a color class to the .rating-score element based on the percentage value.
 * @param {number} percentage - The rating percentage to evaluate.
 */
function ratingColor(percentage, element){
    if(percentage >= 90){
        element.addClass("very-positive");
    }
    else if (percentage >= 80){
        element.addClass("positive");
    }
    else if (percentage >= 60){
        element.addClass("medium");
    }
    else{
        element.addClass("negative");
    }
}