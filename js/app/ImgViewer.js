let App = {
	ImgViewer: class ImgViewer{
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
			//画像がない場合は終了
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
			//img_boxに追加する。
			this.img_box.appendChild(this.img);
			this.img_box.appendChild(this.loading);
			//画像が1枚だけの時はimg要素だけ追加して終了
			if(this.img_num == 1){
				this.img_box.classList.add('single');
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
		/**
		 * 画像が読み込めたときの処理
		 */
		loadImg(){
			this.loading.classList.remove('active');
		}
		/**
		 * 画像が読み込めなかったときの処理
		 */
		errorImg(){
			this.loading.classList.remove('active');
		}
	}
}