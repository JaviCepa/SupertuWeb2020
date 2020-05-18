$(document).ready(function(){
	'use strict';

	$("#testimonial-slider").owlCarousel({
		paginationSpeed: 500,
		singleItem:true,
		autoPlay: 5000,
	});


	$("#clients-logo").owlCarousel({
		autoPlay: 3000,
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
	});

	$("#works-logo").owlCarousel({
		autoPlay: 3000,
		items : 5,
		itemsDesktop : [1199,5],
		itemsDesktopSmall : [979,5],
	});

	// google map
		var map;
		function initMap() {
		  map = new google.maps.Map(document.getElementById('map'), {
		    center: {lat: -34.397, lng: 150.644},
		    zoom: 8
		  });
		}


	// Counter

	$('.counter').counterUp({
        delay: 10,
        time: 1000
		});
		

	// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - Navigation

	// Global vars
	var navTarget = $('body').attr('data-page-url');
	var docTitle = document.title;
	var History = window.History;
	var lastUrl = document.URL.substr(0, document.URL.length-1);
	var newUrl;

	// State change event
	History.Adapter.bind(window,'statechange',function(){
		var state = History.getState();
		
		newUrl = state.url;

		if(lastUrl != newUrl) {
			lastUrl = newUrl;

			// Loading state
			$('body').addClass('loading');

			// Load the page
			$('.page-loader').load( state.hash + ' .page__content', function() {


				// Scroll to top
				$( 'body, html' ).animate({
					scrollTop: 0
				}, 300);

				// Find transition time
				var transitionTime = 50;

				// After current content fades out
				setTimeout( function() {

					// Remove old content
					$('.page .page__content').remove();

					// Append new content
					$('.page-loader .page__content').appendTo('.page');

					// Set page URL
					$('body').attr('data-page-url', window.location.pathname);

					// Update navTarget
					navTarget = $('body').attr('data-page-url');

					// Set page title
					docTitle = $('.page__content').attr('data-page-title');
					document.title = docTitle;

				}, transitionTime);


				$("#testimonial-slider").owlCarousel({
					paginationSpeed : 500,      
					singleItem:true,
					autoPlay: 3000,
				});
			
			
				$("#clients-logo").owlCarousel({
					autoPlay: 3000,
					items : 5,
					itemsDesktop : [1199,5],
					itemsDesktopSmall : [979,5],
				});
			
				$("#works-logo").owlCarousel({
					autoPlay: 3000,
					items : 5,
					itemsDesktop : [1199,5],
					itemsDesktopSmall : [979,5],
				});
				
			});
		}
	});


	// On clicking a link

	if ( $('body').hasClass('ajax-loading') ) {

		$(document).on('click', 'a', function (event){

			// Don't follow link
			event.preventDefault();

			// Get the link target
			var thisTarget = $(this).attr('href');

			// If we don't want to use ajax, or the link is an anchor/mailto/tel
			if ( $(this).hasClass('js-no-ajax') || /^#/.test(thisTarget) || thisTarget.indexOf("mailto:") >= 0 || thisTarget.indexOf("tel:") >= 0 ) {

				// Use the given link
				window.location = thisTarget;
			}

			// If link is handled by some JS action – e.g. fluidbox
			else if ( $(this).is('.gallery__item__link') ) {
				
				// Let JS handle it
			}

			// If link is external
			else if ( thisTarget.indexOf('http') >= 0 ) {

				// Go to the external link
				window.open(thisTarget, '_blank');

			}

			// If link is internal
			else {

				// Change navTarget
				navTarget = thisTarget;
				
				// Switch the URL via History
				History.pushState(null, docTitle, thisTarget);
			}

		});

	}

	window.intercomSettings = {
		app_id: "rpz4991l"
	};

	// We pre-filled your app ID in the widget URL: 'https://widget.intercom.io/widget/rpz4991l'
	(function(){var w=window;var ic=w.Intercom;if(typeof ic==="function"){ic('reattach_activator');ic('update',w.intercomSettings);}else{var d=document;var i=function(){i.c(arguments);};i.q=[];i.c=function(args){i.q.push(args);};w.Intercom=i;var l=function(){var s=d.createElement('script');s.type='text/javascript';s.async=true;s.src='https://widget.intercom.io/widget/rpz4991l';var x=d.getElementsByTagName('script')[0];x.parentNode.insertBefore(s,x);};if(w.attachEvent){w.attachEvent('onload',l);}else{w.addEventListener('load',l,false);}}})();

	// Recoger el menu de navegación en mobile al navegar o clickar fuera

	$(document).on("click", function(){
		var navButton = $('button.navbar-toggle');

		if(!navButton.hasClass("collapsed"))
		$('.navbar-toggle').click();
	});
});