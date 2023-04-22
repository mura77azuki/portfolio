function toggleMenu(){
	document.getElementById('menu').classList.toggle('active');
}
function closeMenu(){
	document.getElementById('menu').classList.remove('active');
}
function menuCtrl(e){
	if(e.target.id == 'menu_btn'){
		toggleMenu();
	}
	else{
		closeMenu();
	}
}

window.addEventListener('load',()=>{
	img_view1 = new App.ImgViewer('imgView1',[
		'./img/work01/01.jpg',
		'./img/work01/02.jpg',
		'./img/work01/03.jpg',
	]);
	img_view2 = new App.ImgViewer('imgView2',[
		'./img/work02/01.jpg',
		'./img/work02/02.jpg',
		'./img/work02/03.jpg',
	]);
	img_view4 = new App.ImgViewer('imgView4',[
		'./img/work04/01.png',
		'./img/work04/02.png',
		'./img/work04/03.png',
		'./img/work04/04.png',
	]);
	img_view5 = new App.ImgViewer('imgView5',[
		'./img/work05/01.png',
	]);
	img_view6 = new App.ImgViewer('imgView6',[
		'./img/work06/01.png',
		'./img/work06/02.png',
		'./img/work06/03.png',
	]);
	img_view7 = new App.ImgViewer('imgView7',[
		'./img/work07/01.png',
		'./img/work07/02.png',
	]);
	img_view8 = new App.ImgViewer('imgView8',[
		'./img/work08/01.png',
		'./img/work08/02.png',
		'./img/work08/03.png',
	]);

	document.addEventListener('click', menuCtrl);
});

window.addEventListener('scroll',()=>{
	let header_menu = document.getElementsByClassName('header_menu');
	let markers = document.getElementsByClassName('marker');
	let current_marker = -1;
	for (const marker of markers) {
		if(marker.getBoundingClientRect().y >= 5){
			break;
		}
		current_marker++;
	}

	for(let i = 0; i < header_menu.length; i++){
		if(i == current_marker){
			header_menu[i].classList.add('active');
		}
		else{
			header_menu[i].classList.remove('active');
		}
	}
});