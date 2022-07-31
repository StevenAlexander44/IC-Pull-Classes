javascript:var deactivate;
(function () {
	'use strict';
	if (deactivate) {
		deactivate()
	} else {
		function applyStyles(elem, obj) {
			for (var prop in obj) elem.style[prop] = obj[prop]
		}
		var wrapper = document.createElement("div"),
			frame = document.createElement("iframe"),
			dest = prompt('11 characters = youtube embed\n"http" = link\ntext = google search'),
			defaultW = 690,
			defaultH = 600,
			ask = true;
		if (dest.includes('http')) {
			dest = dest
		} else if (dest.length == 11) {
			dest = 'https://www.youtube.com/embed/' + dest + '?autoplay=true';
			defaultW = 640, defaultH = 360
		} else if (dest.length == 0) {
			dest = 'https://www.google.com/?igu=1';
			ask = false
		} else {
			dest = 'https://www.google.com/search?q=' + dest + '&igu=1'
		}
		frame.src = dest;
		if (ask) {
		var frameW = prompt('Width? (pixels)', defaultW),
			frameH = prompt('Height?', defaultH);
		} else {
		var frameW = defaultW,
		frameH = defaultH;
		}
		frame.width = frameW;
		frame.height = frameH;
		applyStyles(frame, {
			position: 'absolute',
			border: 'none'
		});
		applyStyles(wrapper, {
			position: 'fixed',
			zIndex: 2147483647,
			display: 'block',
			bottom: '10px',
			right: '10px',
			width: frameW + 'px',
			height: frameH + 'px',
			overflow: 'hidden',
			transition: 'opacity 0.1s',
			transform: 'scale(1)'
		});
		wrapper.appendChild(frame);
		document.body.parentNode.appendChild(wrapper);
		function enter() {
			wrapper.style.opacity = '1'
		}
		function leave() {
			wrapper.style.opacity = '0';
			frame.blur()
		}
		wrapper.addEventListener('mouseenter', enter, false);
		wrapper.addEventListener('mouseleave', leave, false);
		deactivate = () => {
			wrapper.removeEventListener('mouseenter', enter, false);
			wrapper.removeEventListener('mouseleave', leave, false);
			wrapper.parentNode.removeChild(wrapper);
			frame = null;
			wrapper = null;
			deactivate = undefined
		}
	}
}());
