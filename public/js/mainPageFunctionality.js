// Change rating color based on percentage
$("#percentage").each(() => {
    let percentage = parseFloat($("#percentage").text());
    ratingColor(percentage);
})

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