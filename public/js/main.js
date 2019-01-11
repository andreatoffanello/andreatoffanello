//FORM

function loadform() {

	$('#jobform').submit(function(e){
	    e.preventDefault();
	    $.ajax({
	        url:'https://hive-engine.herokuapp.com/serendpt/jobs_email.json',
	        type:'post',
	        data:$('#jobform').serialize(),
	        success:function(){
	          $('#jobform').addClass('nodisplay');
	        }
	    });
	});
}


$(document).ready(function() {



//
	loadform();

//BARBA//

	Barba.Pjax.start();

//LOADER FADEOUT//	
	
	setTimeout(function() {

		$(".loader-container").fadeOut(1500, "swing");

		$(".main_img").removeClass("hidden");
	
	}, 2000);


// BARBA TRANSITION
	var FadeTransition = Barba.BaseTransition.extend({
	  start: function() {
	    /**
	     * This function is automatically called as soon the Transition starts
	     * this.newContainerLoading is a Promise for the loading of the new container
	     * (Barba.js also comes with an handy Promise polyfill!)
	     */

	    // As soon the loading is finished and the old page is faded out, let's fade the new page
	    Promise
	      .all([this.newContainerLoading, this.fadeOut()])
	      .then(this.fadeIn.bind(this));
	  },

	  fadeOut: function() {
	    /**
	     * this.oldContainer is the HTMLElement of the old Container
	     */

	    return $(this.oldContainer).animate({ opacity: 0 }).promise();
	  
	  },

	  fadeIn: function() {

	  	$(window).scrollTop(0); // scroll to top here
	    /**
	     * this.newContainer is the HTMLElement of the new Container
	     * At this stage newContainer is on the DOM (inside our #barba-container and with visibility: hidden)
	     * Please note, newContainer is available just after newContainerLoading is resolved!
	     */

	    var _this = this;
	    var $el = $(this.newContainer);
	    //console.log("container: ", this);

	    $(this.oldContainer).hide();

	    $el.css({
	      visibility : 'visible',
	      opacity : 0
	    });


	    $el.animate({ opacity: 1 }, 400, function() {
	      /**
	       * Do not forget to call .done() as soon your transition is finished!
	       * .done() will automatically remove from the DOM the old Container
	       */

	      _this.done(
	      	function() {
		     	if (_this.newContainer.baseURI.indexOf("/contatti/") != -1) {
					maploading()
				}

				loadform();

			}()

	      );
	    });
	  }
	});

	/**
	 * Next step, you have to tell Barba to use the new Transition
	 */

	Barba.Pjax.getTransition = function() {
	  /**
	   * Here you can use your own logic!
	   * For example you can use different Transition based on the current page or link...
	   */

	  return FadeTransition;
	};


// Hide Header on on scroll down

	var prevScrollpos = window.pageYOffset;
	
	window.onscroll = function() {
	
	  var currentScrollPos = window.pageYOffset;
	
	  if (prevScrollpos > currentScrollPos) {
	  
	  	$("nav").css("top", "0");
	  
	  } else {
	  
	    $("nav").css("top", "-60px");
	  
	  }
	  
	  prevScrollpos = currentScrollPos;


	  // Hide Header on on scroll down

	  var scroll = $(window).scrollTop();
	
	  if (scroll > 15) {
	    $("nav").addClass("scrolled");
	  }

	  else {
	  	$("nav").removeClass("scrolled");
	  }
	
	}

	$( ".menu_toggle" ).click(function() {
	  $( this ).toggleClass( "open" );
	  $( ".menu_mobile" ).toggleClass( "open" );
	  $("body").toggleClass( "menu_open" );

	});

	$( ".menu_mobile a, .nav-logo a" ).click(function() {
	  $( ".menu_toggle" ).removeClass( "open" );
	  $( ".menu_mobile" ).removeClass( "open" );
	  $( "body" ).removeClass( "menu_open" );
	});	
});


















