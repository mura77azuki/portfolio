class ImgViewer{
	list = [];
	container = undefined;
	img = undefined;
	btn_prev = undefined;
	btn_next = undefined;
	position_bar = undefined;
	index = 0;
	/**
	 * 画像を1枚ずつ表示できるビューを追加します。
	 * @param {string} id 画像ビューを追加する対象のidを指定します。
	 * @param {string[]} imglist 表示したい画像のソース(url等)を配列に格納して指定します。
	 */
	constructor(id, imglist){
		this.list = imglist;
		this.container = document.getElementById(id);
		this.container.classList.add('img_viewer');
		
		this.content = document.createElement('div');
		this.content.classList.add('viewer_body');

		this.btn_prev = document.createElement('div');
		this.btn_prev.classList.add('btn_prev');
		this.btn_prev.appendChild(document.createElement('span'));
		this.btn_prev.addEventListener('click', ()=>{this.prev()});

		this.img = document.createElement('img');
		this.setImg();

		this.btn_next = document.createElement('div');
		this.btn_next.classList.add('btn_next');
		this.btn_next.appendChild(document.createElement('span'));
		this.btn_next.addEventListener('click', ()=>{this.next()});

		this.content.appendChild(this.btn_prev);
		this.content.appendChild(this.img);
		this.content.appendChild(this.btn_next);

		this.position_bar = document.createElement('div');
		this.position_bar.classList.add('position');
		for(let i = 0; i < this.list.length; i++){
			this.position_bar.appendChild(document.createElement('span'));
		}
		this.setPos();

		this.container.appendChild(this.content);
		this.container.appendChild(this.position_bar);
	}
	next(){
		this.setPos();
		this.index++;
		if(this.index > this.list.length - 1){
			this.index = 0;
		}
		this.setImg();
		this.setPos();
	}
	prev(){
		this.setPos();
		this.index--;
		if(this.index < 0){
			this.index = this.list.length - 1;
		}
		this.setImg();
		this.setPos();
	}
	setImg(){
		this.img.src = this.list[this.index];
	}
	setPos(){
		this.position_bar.childNodes[this.index].classList.toggle('active');
	}
}

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
	img_view1 = new ImgViewer('imgView1',[
		'./img/work01/01.jpg',
		'./img/work01/02.jpg',
		'./img/work01/03.jpg',
	]);
	img_view2 = new ImgViewer('imgView2',[
		'./img/work02/01.jpg',
		'./img/work02/02.jpg',
		'./img/work02/03.jpg',
	]);

	img_view4 = new ImgViewer('imgView4',[
		'./img/work04/01.png',
		'./img/work04/02.png',
		'./img/work04/03.png',
		'./img/work04/04.png',
	]);
	/*
	img_view5 = new ImgViewer('imgView5',[
		'./img/work05/01.png',
	]);
	*/
	img_view6 = new ImgViewer('imgView6',[
		'./img/work06/01.png',
		'./img/work06/02.png',
		'./img/work06/03.png',
	]);
	img_view7 = new ImgViewer('imgView7',[
		'./img/work07/01.png',
		'./img/work07/02.png',
	]);
	img_view8 = new ImgViewer('imgView8',[
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