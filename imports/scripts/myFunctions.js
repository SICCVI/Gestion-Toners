
reporterSelect = function (select, input) {
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
	
$(document).on('click', '.table-donnees .dropdown-menu', function (e) {
  e.stopPropagation();
});

$(document).on('click', '.sidebar-nav .dropdown-menu', function (e) {
  e.stopPropagation();
});

getGrandParentDataId = function (element) {
	var parent = element.parentNode.parentNode.getAttribute('data-id');
	element.setAttribute('data-id' , parent);
},

getParentDataId = function (element) {
	var parent = elementparentNode.getAttribute('data-id');
	element.setAttribute('data-id' , parent);
},

scrollto = function (module) {
    $('html, body').animate({'scrollTop':   $(module).offset().top }, 1000);
}