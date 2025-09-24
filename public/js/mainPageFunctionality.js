/**
 * Iterate over each element with ID 'percentage' and change the rating color
 * based on its value.
 */
$("#percentage").each(() => {
     // Get the percentage value from the element's text
    let percentage = parseFloat($("#percentage").text());
    ratingColor(percentage);
})

/**
 * Adds a color class to the .rating-score element based on the percentage value.
 * @param {number} percentage - The rating percentage to evaluate.
 */
function ratingColor(percentage){
    if(percentage >= 90){
        $(".rating-score").addClass("very-positive");
    }
    else if (percentage >= 80){
        $(".rating-score").addClass("positive");
    }
    else if (percentage >= 60){
        $(".rating-score").addClass("medium");
    }
    else{
        $(".rating-score").addClass("negative");
    }
}