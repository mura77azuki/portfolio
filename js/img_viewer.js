class ImgViewer{
	list = [];
	img_num = 0;
	container = undefined;
	img_box = undefined;
	img = undefined;
	loading = undefined;
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
		this.img_num = this.list.length;
		//ビューを追加する要素を取得
		this.container = document.getElementById(id);
		this.container.classList.add('img_viewer');
		if(this.img_num < 1){
			this.container.innerText = 'No Image';
			return;
		}
		//ビューの中身を作るdiv要素を生成
		this.content = document.createElement('div');
		this.content.classList.add('viewer_body');
		//画像を入れておくdiv要素を生成
		this.img_box = document.createElement('div');
		this.img_box.classList.add('img_box');
		//ローディングアニメーション表示用のdiv要素を生成
		this.loading = document.createElement('div');
		this.loading.classList.add('loading');
		//img要素を生成して画像をセット
		this.img = document.createElement('img');
		this.img.addEventListener('load', ()=>{this.loadImg();});
		this.img.addEventListener('error', ()=>{this.errorImg();});
		this.setImg();

		this.img_box.appendChild(this.img);
		this.img_box.appendChild(this.loading);


		//画像が1枚だけの時はimg要素だけ追加して終了
		if(this.img_num == 1){
			this.content.appendChild(this.img_box);
			this.container.appendChild(this.content);
			return;
		}
		//prevボタンを生成&クリックイベント追加
		this.btn_prev = document.createElement('div');
		this.btn_prev.classList.add('btn_prev');
		this.btn_prev.appendChild(document.createElement('span'));
		this.btn_prev.addEventListener('click', ()=>{this.prev();});
		//nextボタンを生成&クリックイベント追加
		this.btn_next = document.createElement('div');
		this.btn_next.classList.add('btn_next');
		this.btn_next.appendChild(document.createElement('span'));
		this.btn_next.addEventListener('click', ()=>{this.next();});
		//要素をdivに追加
		this.content.appendChild(this.btn_prev);
		this.content.appendChild(this.img_box);
		this.content.appendChild(this.btn_next);
		//何枚目か表示する丸の部分を作る
		this.position_bar = document.createElement('div');
		this.position_bar.classList.add('position');
		for(let i = 0; i < this.img_num; i++){
			this.position_bar.appendChild(document.createElement('span'));
		}
		this.setPos();
		//指定された要素に生成した中身を追加
		this.container.appendChild(this.content);
		this.container.appendChild(this.position_bar);
	}
	/**
	 * 次の画像を表示する
	 */
	next(){
		this.setPos();
		this.index++;
		if(this.index > this.img_num - 1){
			this.index = 0;
		}
		this.setImg();
		this.setPos();
	}
	/**
	 * 前の画像を表示する
	 */
	prev(){
		this.setPos();
		this.index--;
		if(this.index < 0){
			this.index = this.img_num - 1;
		}
		this.setImg();
		this.setPos();
	}
	/**
	 * [index]番目の画像をセットする
	 */
	setImg(){
		this.loading.classList.add('active');
		this.img.src = this.list[this.index];
	}
	/**
	 * [index]番目の丸のクラスリストで'active'をトグルする。
	 */
	setPos(){
		this.position_bar.childNodes[this.index].classList.toggle('active');
	}
	loadImg(){
		this.loading.classList.remove('active');
	}
	errorImg(){
		this.loading.classList.remove('active');
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
	img_view5 = new ImgViewer('imgView5',[
		'./img/work05/01.png',
	]);
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