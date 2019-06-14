class PixelView{
    contructor(pixelModel){
        // hardcoded width and height of div
        this.pixelWidth = 10;
        this.pixelHeight = 10;
        this.cell = document.createElement("div");
        this.cell.classList.add("pixel");
        this.cell.style.width = this.pixelWidth+"px";
        this.cell.style.height = this.pixelHeight+"px";
        this.cell.style.top = this.pixelWidth*pixelModel.x + "px";
        this.cell.style.left = this.pixelHeight*pixelModel.y + "px";
        this.cell.style.backgroundColor = pixelModel.color;
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
        this.width = pixelLengthX;
        this.height = pixelLengthY;
        this.board = new Array(pixelLengthY);
        for( let i = 0; i<pixelLengthY; i++){
            this.board[i] = new Array(pixelLengthX);
            for(let j = 0; j < pixelLengthX; j++){
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
        return this.board[x,y];
    }
}
class PixelBoardView{
    contructor(pixelBoardModel, controller){
        this.pixelBoardModel = pixelBoardModel;
        this.controller = controller;
        let pixelLengthY = this.pixelBoardModel.getPixelLengthY();
        let pixelLengthX = this.pixelBoardModel.getPixelLengthX();
        this.pixelBoardView = new Array(pixelLengthY);
        for(let i = 0; i<pixelLengthY; i++){
            this.pixelBoardView[i] = new Array(pixelLengthX);
            for(let j = 0; j<pixelLengthX; j++){
                this.pixelBoardView[i][j] = new PixelView(this.pixelBoardModel.getPixelModel(i,j));
            }
        }
        this.area = document.getElementById('pixel-board');
    }
    print(){
        area.innerHTML = '';
        for(let i = 0; i < this.height; i++){
            for(let j = 0; j < this.width; j++){
                this.area.appendChild(this.board[i][j].getCell());
            }
        }
    }
}


var pixelBoard = new PixelBoard(10,10);
pixelBoard.print();
