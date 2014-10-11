// Rushy Panchal
// linked.dividers.js
// Licensed under GPL v2.0

function LinkedDividers(ids, settings) {
	// Constructs a navigation of divs using their ids or a valid jQuery selector
	if (!Array.isArray(ids)) {
		var divs = $(ids);
		}
	else {
		var divs = jQuery.map(ids, function (id) {return document.getElementById(id);});
		}
	var settings = settings ? settings: {};
	return {
		divs: divs,
		max: divs.length - 1,
		current: settings.start ? settings.start: 0,
		offset: settings.offset ? settings.offset: 0,
		onBottom: settings.onBottom ? settings.onBottom: function () {},
		onTop: settings.onTop ? settings.onTop: function () {},
		next: function () {
			// Navigates to the next div
			this.current = (this.current == this.max ? 0: this.current + 1);
			var new_div = this.divs[this.current];
			var scroll_position = $(document).scrollTop();
			if (scroll_position + $(window).height() ==  getDocumentHeight()) {
				this.current = this.max;
				$(this.divs[this.current]).smoothScroll({offset: this.offset});
				}
			else if ($(new_div).offset().top <= scroll_position) {
				this.next();
				}
			else {
				$(new_div).smoothScroll({offset: this.offset});
				}
			if (this.current == this.max) {
				this.onBottom();
				}
			},
		previous: function () {
			// Navigates to the previous div
			this.current = (this.current == 0 ? this.max: this.current - 1);
			var new_div = this.divs[this.current];
			var scroll_position = $(document).scrollTop();
			if (scroll_position == 0) {
				this.current = 0;
				$(this.divs[this.current]).smoothScroll({offset: this.offset});
				}
			else if ($(new_div).offset().top >= scroll_position) {
				this.previous();
				}
			else {
				$(new_div).smoothScroll({offset: this.offset});
				}
			if (this.current == 0) {
				this.onTop();
				}
			}
		};
	}

jQuery.fn.smoothScroll = function(options) {
	var options = jQuery.extend({offset: 0, duration: 900, easing: "swing"}, options);
	$('html, body').stop().animate({'scrollTop': this.offset().top + options.offset}, options.duration, options.easing);
	}

jQuery.fn.LinkedDividers = function (settings) {
	return LinkedDividers(this, settings);
	}
