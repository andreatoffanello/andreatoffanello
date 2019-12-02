$(document).ready(function() {

	// CURSOR

function cursor() {

	document.body.style.cursor = 'none';
	/* why we do this here and not in css?
	 * If the user dosn't have javascript onboard he
	 * don't see any cursor by default and that's shit
	 */

	var cursor = document.createElement( 'div' );
	cursor.classList.add( 'cursor' );
	document.body.appendChild( cursor );

	var follow = document.createElement( 'div' );
	follow.classList.add( 'follow' );
	document.body.appendChild( follow );

	function move( obj, event ) {
	    obj.style = '';
	    obj.style.top = event.clientY + 'px';
	    obj.style.left = event.clientX + 'px';
	}

	if ( cursor ) {
	    window.addEventListener( 'mousemove', function( event ) {

	        // legend ;)
	        var e = event;
	        var t = e.target;
	        var f = follow;
	        var c = cursor;

	        // rambazamba
	        if ( (t == $('.link')) || (t == $('p a')) ) {
	            // c.style.backgroundColor = 'transparent';

	            // f.style.top = t.offsetTop + 'px';
	            // f.style.left = t.offsetLeft + 'px';
	            // f.style.width = t.clientWidth + 'px';
	            // f.style.height = t.clientHeight + 'px';

	            // if ( t.classList.contains( 'button--round' ) )
	            //     f.style.borderRadius = '50%';

	            var aEl = $(t)

				var offset = $(aEl).offset();
				var width = $(aEl).width();
				var height = $(aEl).height();

				var centerX = offset.left + width / 2;
				var centerY = offset.top + height / 2;

	            $( f, c ).css({
	            	'top' : centerY,
	            	'left' : centerX
	            });


	            $( f, c ).addClass( 'on_hover' );

	        }


	        //if ( t.tagName == 'A' )


	        else {
	            move( c, e );
	            move( f, e );
	            //$(f).removeClass( 'on_hover' );
	        }
	    });
	}

	$('a, .next, .prev').mouseenter( function() {
		$( '.follow').addClass( 'on_hover' );
		$( '.cursor').addClass( 'on_hover' );

	});

	$('a, .next, .prev').mouseleave( function() {
		$( '.cursor').removeClass( 'on_hover' );
		$( '.follow').removeClass( 'on_hover' );
	});

	$(document).on('mousemove', function(e){
	    $(cursor).css({
	        left:  e.pageX,
	        top:   e.pageY - $('body').scrollTop()
	    });
	});

};

cursor();

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

				// inserire qui funzione

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

});
