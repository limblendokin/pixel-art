class PixelView{
    constructor(pixelModel){
        // hardcoded width and height of div
        this.pixelWidth = 25;
        this.pixelHeight = 25;
        this.pixelModel = pixelModel;
        this.cell = document.createElement("div");
        this.cell.classList.add("pixel");
        this.cell.style.width = this.pixelWidth+"px";
        this.cell.style.height = this.pixelHeight+"px";
        this.cell.style.top = (this.pixelWidth+2)*pixelModel.x + "px";
        this.cell.style.left = (this.pixelHeight+2)*pixelModel.y + "px";
        this.cell.style.backgroundColor = "#"+pixelModel.color;
    }
    getCell(){
        return this.cell;
    }
}

class PixelModel{
    constructor(x, y, hexValue){
        this.color = hexValue;
        this.x = x;
        this.y = y;
    }
    setColor(hexValue){
        this.color = hexValue;
    }
}
class PixelBoardModel{
    constructor(pixelLengthX, pixelLengthY){
        this.pixelLengthX = pixelLengthX;
        this.pixelLengthY = pixelLengthY;
        this.board = new Array(pixelLengthY);
        for( let i = 0; i<this.pixelLengthY; i++){
            this.board[i] = new Array(this.pixelLengthX);
            for(let j = 0; j < this.pixelLengthX; j++){
                this.board[i][j] = new PixelModel(i, j, 555555);
            }
        }
    }
    changeColor(x,y, hexValue){
        board[x][y].setColor(hexValue);
    }
    getPixelLengthY(){
        return this.pixelLengthY;
    }
    getPixelLengthX(){
        return this.pixelLengthX;
    }
    getPixelModel(x,y){
        return this.board[x][y];
    }
}
class PixelBoardView{
    constructor(pixelBoardModel, controller){
        this.pixelBoardModel = pixelBoardModel;
        this.controller = controller;
        let pixelLengthY = this.pixelBoardModel.getPixelLengthY();
        let pixelLengthX = this.pixelBoardModel.getPixelLengthX();
        this.pixelBoardView = new Array(pixelLengthY);
        for(let i = 0; i<pixelLengthY; i++){
            this.pixelBoardView[i] = new Array(pixelLengthX);
            for(let j = 0; j<pixelLengthX; j++){
                this.pixelBoardView[i][j] = new PixelView(this.pixelBoardModel.getPixelModel(i,j));
                this.pixelBoardView[i][j].getCell().addEventListener("click", ()=>console.log("click"));
            }
        }
        this.area = document.getElementById('pixel-board');
        this.print();
    }
    print(){
        this.area.innerHTML = '';
        for(let i = 0; i < this.pixelBoardView.length; i++){
            for(let j = 0; j < this.pixelBoardView[i].length; j++){
                this.area.appendChild(this.pixelBoardView[i][j].getCell());
            }
        }
    }
}
class Controller{
    
}

var pixelBoardView = new PixelBoardView(new PixelBoardModel(10,10), new Controller());