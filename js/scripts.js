// Global variables
var $window = $(window);
var $document = $(document);

var $wrapper = $('#wrapper');  // example div id="wrapper"

var $sidebar = $('#sidebar');  // example aside id="sidebar"

var $footer = $('#footer');    // example footer id="footer"

var $menu = $('#menu');        // example nav id="menu"

var List1 = [];
var List2 = [];
(function(){
	/* EJEMPLOS DE CAPTURA DE EVENTOS */
	/*$menu.find('li').on('click', menuAction);
	$('#specialItem').on('mouseenter', specialAction);*/

	$sidebar.on('mouseleave', toggleSidebar);
	$sidebar.on('mouseenter', toggleSidebar);

	// etc...
})();
function toggleSidebar(e){
	$el = $(e.currentTarget);
	$el.toggleClass('sidebar-hide');
}