document.addEventListener("DOMContentLoaded",function(){
	
	function scrollHome() {
		let goal = document.getElementById('home') ;
		goal.scrollIntoView({block:"start"});
	}

	function scrollFractals() {
		let goal = document.getElementById('fractals') ;
		goal.scrollIntoView();
	}
	function scrollColors() {
		let goal = document.getElementById('colors') ;
		goal.scrollIntoView({block:"start"});
	}
	function scrollAffin() {
		let goal = document.getElementById('affin') ;
		goal.scrollIntoView({block:"start"});
	}
	function scrollAbout() {
		let goal = document.getElementById('info');
		goal.scrollIntoView({block:"start"});
	}
	function scrollTeam() {
		let goal = document.getElementById('team');
		goal.scrollIntoView({block:"start"});
	}
	
	document.getElementById("team-nav-btn").addEventListener("click",scrollTeam);	
	document.getElementById("affine-nav-btn").addEventListener("click",scrollAffin);
	document.getElementById("colors-nav-btn").addEventListener("click",scrollColors);
	document.getElementById("fractals-nav-btn").addEventListener("click",scrollFractals);	
	document.getElementById("home-nav-btn").addEventListener("click",scrollHome);
	document.getElementById("about-nav-btn").addEventListener("click",scrollAbout);
})