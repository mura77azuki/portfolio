let Wls = {
	LED: {
		MatrixLed: class MatrixLed{
			//need assignment
			row;
			col;
			dotSize;
			gap;
			margin;
			//self calculation Parameter
			radius;
			interval;
			width;
			height;
			//DrawDataBuffer
			buffer;
			//DrawTargetCanvas
			base;
			light;
			/**
			 * 
			 * @param {number} row 
			 * @param {number} col 
			 * @param {number} dotSize 
			 * @param {number} gap 
			 * @param {number} margin 
			 */
			constructor(row=8, col=8, dotSize=20, gap=4, margin=10){
				this.row = row;
				this.col = col;
				this.dotSize = dotSize;
				this.gap = gap;
				this.margin = margin;
				this.calculationParam();
				this.initializeBuffer();
			}
			calculationParam(){
				this.radius = this.dotSize / 2;
				this.interval = this.dotSize + this.gap;
				this.width = (this.col * this.dotSize) + ((this.col - 1) * this.gap) + (this.margin * 2);
				this.height = (this.row * this.dotSize) + ((this.row - 1) * this.gap) + (this.margin * 2);
			}
			initializeBuffer(){
				this.buffer = new Array();
				for(let i = 0; i < this.row; i++){
					this.buffer.push(new Array(this.col).fill(0));
				}
			}
			reCalc(){
				this.calculationParam();
				this.fixSize();
			}
			setupCanvas(baseId, lightId){
				this.base = Wls.Canvas.getCanvasHandleById(baseId);
				this.light = Wls.Canvas.getCanvasHandleById(lightId);
				this.fixSize();
			}
			fixSize(){
				Wls.Canvas.fixCanvasSize(this.base.canvas, this);
				Wls.Canvas.fixCanvasSize(this.light.canvas, this);
				Wls.Canvas.fixCanvasParentSize(this.base.canvas);
				Wls.Draw.drawBackgroundImage(this.base.context, this);
			}
			refresh(){
				Wls.Draw.refreshLight(this.light.context, this, this.buffer);
			}
			changeScale(dotSize){
				this.dotSize = dotSize;
				this.reCalc();
				this.refresh();
			}
			changeSize(row, col, dotSize){
				this.row = row;
				this.col = col;
				this.dotSize = dotSize;
				this.reCalc();
				this.initializeBuffer()
			}
		}
	},
	Draw: {
		/**
		 * Clear Canvas Task
		 * @param {object} context canvas context("2d")
		 */
		clearCanvas(context){
			context.clearRect(0, 0, context.canvas.width, context.canvas.height);
		},
		/**
		 * 塗りつぶしの円を描画対象のコンテキストで描画します。
		 * @param {CanvasRenderingContext2D} context 描画対象のコンテキスト
		 * @param {number} x 描く円のX軸中心座標
		 * @param {number} y 描く円のY軸中心座標
		 * @param {number} radius 描く円の半径
		 */
		fillCircle(context, x, y, radius){
			context.beginPath();
			context.arc(x, y, radius, 0, Math.PI * 2);
			context.fill();
		},
		/**
		 * draw background image for matrix_led layer
		 */
		drawBackgroundImage(context, led){
			this.clearCanvas(context);
			//Draw background
			context.fillStyle = Wls.Color.base_color;
			context.fillRect(0,0,led.width,led.height);
			//Draw off Led
			context.fillStyle = Wls.Color.off_color;
			let offset_x = led.margin + led.radius;
			let offset_y = led.margin + led.radius;
			for(let i = 0; i < led.col; i++){
				for(let j = 0; j < led.row; j++){
					this.fillCircle(context, offset_x, offset_y, led.radius);
					offset_y += led.interval;
				}
				offset_y = led.margin + led.radius;
				offset_x += led.interval;
			}
		},
		/**
		 * refresh Light layer and new data draw.
		 */
		refreshLight(context, led, data){
			this.clearCanvas(context);
			this.drawLight(context, led, data);
		},
		drawLight(context, led, data){
			//calc offset
			let offset_x = led.margin + led.radius;
			let offset_y = led.margin + led.radius;
			//Settings
			context.globalCompositeOperation = 'screen';
			//draw
			for(let i = 0; i < led.col; i++){
				for(let j = 0; j < led.row; j++){
					if(data[j][i]){
						this.drawDot(context, offset_x, offset_y, led);
					}
					offset_y += led.interval;
				}
				offset_y = led.margin + led.radius;
				offset_x += led.interval;
			}
		},
		/**
		 * draw one Light to offset position;
		 * @param {number} offset_x 
		 * @param {number} offset_y 
		 */
		drawDot(context, offset_x, offset_y, led){
			context.fillStyle = Wls.Color.Light.Color;
			this.fillCircle(context, offset_x, offset_y, led.radius);
			let gradient = context.createRadialGradient(offset_x, offset_y, 0, offset_x, offset_y, led.dotSize*Wls.Color.Light.Brightness);
			gradient.addColorStop(0, Wls.Color.Light.Color);
			//gradient.addColorStop(0.6, 'rgba(230, 140, 0, 0.2)');
			//gradient.addColorStop(1, 'rgba(255, 170, 0, 0)');
			gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0)');
			//gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
			context.fillStyle = gradient;
			
			this.fillCircle(context, offset_x, offset_y, led.dotSize*Wls.Color.Light.Brightness);
		},
		/**
		 * draw Cursor at row/col position.
		 * for editor use.
		 * @param {*} row 
		 * @param {*} col 
		 */
		drawCursor(context, support){
			let current = support.getGrid();
			this.clearCanvas(context);
			context.strokeStyle = Wls.Color.cursor_color;
			context.lineWidth = 2;
			if(current.col < 0 || current.row < 0){
				return;
			}
			let start_X = support.offset + (current.col * support.div_size);
			let start_Y = support.offset + (current.row * support.div_size);
			context.strokeRect(start_X, start_Y, support.div_size, support.div_size);
		}
	},
	Color: {
		off_color: 'rgb(73, 73, 72)',
		base_color: 'rgb(47, 47, 47)',
		cursor_color: 'rgb(255, 255, 255)',
		led_orange: '#ffaa00',
		led_red: '#ff0000',
		led_green: '#54ff10',
		Light: {
			Color: '#ffaa00',
			Brightness: 2,
		}
	},
	Event: {},
	Canvas: {
		/**
		 * 
		 * @param {*} id 
		 * @returns 
		 */
		getCanvasHandleById(id){
			let canvas = document.getElementById(id);
			return {
				canvas: canvas,
				context: canvas.getContext("2d")
			}
		},
		fixCanvasSize(canvas, led){
			canvas.height = led.height;
			canvas.width = led.width;
		},
		fixCanvasParentSize(canvas){
			canvas.parentElement.style.width = canvas.width+'px';
			canvas.parentElement.style.height = canvas.height+'px';
		}
	},
}