reporterSelect = function (select, input) {
	console.log('fonction appelée => reporterSelect');
    let selection = document.getElementById(select).value;
    document.getElementById(input).value = selection;
},

editCheck = function (field, original, edit) {
	if (original == edit) {
	    $(field).css({'background-color' : 'white'});
	}
	else if (original !== edit) {
	    $(field).css({'background-color' : '#F8C471'});
	}
},

/*editResetCheck = function () {
	$('#aqw').('click', function() {
		$('#azerty').css({'background-color' : 'red'});
	console.log('aaa');
}
	})*/
	
$(document).on('click', '.table-donnees .dropdown-menu', function (e) {
  e.stopPropagation();
});

