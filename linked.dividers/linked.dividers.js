// Rushy Panchal
// linked.dividers.js
// Licensed under GPL v2.0

function LinkedDividers(ids, settings) {
	// Constructs a navigation of divs using their ids or a valid jQuery selector
	if (!Array.isArray(ids)) {
		divs= $(ids);
		}
	else {
		divs = jQuery.map(ids, function (id) {return document.getElementById(id);});
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
				scrollToAnchor(this.divs[this.current], this.offset);
				}
			else if ($(new_div).offset().top <= scroll_position) {
				this.next();
				}
			else {
				scrollToAnchor(new_div, this.offset);
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
				scrollToAnchor(this.divs[this.current], this.offset);
				}
			else if ($(new_div).offset().top >= scroll_position) {
				this.previous();
				}
			else {
				scrollToAnchor(new_div, this.offset);
				}
			if (this.current == 0) {
				this.onTop();
				}
			}
		};
	}

function scrollToAnchor(div, offset) {
	// Scrolls to an anchor
	var offset = offset ? offset: 0;
	var target = $(div);
	$('html, body').stop().animate({
		'scrollTop': target.offset().top + offset}, 900, 'swing');
	}

jQuery.fn.LinkedDividers = LinkedDividers;
