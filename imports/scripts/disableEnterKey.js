//Empêcher la touche Enter de valider les formulaires

$(document).keypress(
    function(event){
     if (event.which == '13') {
        event.preventDefault();
      }
});