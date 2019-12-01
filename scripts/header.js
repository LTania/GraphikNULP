document.addEventListener("DOMContentLoaded",function(){
	
	function scroolToIndex(index) {
		return function(event) {
			event.stopPropagation();
			let goal = document.getElementById(index) ;
			setTimeout(() => goal.scrollIntoView({behavior: "smooth"}), 10);	
		};
	}
	
	document.getElementById("team-nav-btn").addEventListener("click", scroolToIndex("team"));	
	document.getElementById("affine-nav-btn").addEventListener("click", scroolToIndex("affin"));
	document.getElementById("colors-nav-btn").addEventListener("click", scroolToIndex("colors"));
	document.getElementById("fractals-nav-btn").addEventListener("click", scroolToIndex("fractals"));	
	document.getElementById("home-nav-btn").addEventListener("click", scroolToIndex("home"));
	document.getElementById("about-nav-btn").addEventListener("click", scroolToIndex("info"));
})