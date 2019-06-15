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
        this.cell.style.backgroundColor = "#"+this.pixelModel.color;
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
        this.inputType = "p"; // for "pixel"
        this.mouseDown=false;
        this.chosenColor = "FFFF00";
        this.pixelLengthX = pixelLengthX;
        this.pixelLengthY = pixelLengthY;
        this.board = new Array(pixelLengthY);
        for( let i = 0; i<this.pixelLengthY; i++){
            this.board[i] = new Array(this.pixelLengthX);
            for(let j = 0; j < this.pixelLengthX; j++){
                this.board[i][j] = new PixelModel(i, j, 'FFFFFF');
            }
        }
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
    getInputType(){
        return this.inputType;
    }
    performAction(x,y){
        // if(this.inputType == "p"){
        //     this.board[x][y].setColor(this.chosenColor);
        // }
        if(this.mouseDown){
            this.board[x][y].setColor(this.chosenColor);
        }
    }
    chooseColor(color){
        this.chosenColor=color;
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
                // this.pixelBoardView[i][j].getCell().addEventListener("click", ()=>{
                //     this.controller.cellClickHandle(i, j);
                //     this.print();
                // });
                this.pixelBoardView[i][j].getCell().addEventListener("mouseenter", ()=>{
                    this.controller.cellClickHandle(i, j);
                    this.print();
                });
                
            }
        }
        this.area = document.getElementById('pixel-board');
        document.getElementById('body').addEventListener("mousedown", ()=>{
            this.controller.mouseDownHandle();
            this.print();
        });
        document.getElementById('body').addEventListener("mouseup", ()=>{
            this.controller.mouseUpHandle();
            this.print();
        });
        var colorList=['101357', 'fea49f', 'fbaf08', '51d0de','bf4aa8','d9d9d9',
                '0f2862', '9e363a', '091f36', '4f5f76'];
        this.colorChooser = document.getElementById('color-chooser');
        for(let i = 0; i<colorList.length; i++){
            this.colorChooser.appendChild(this.createChooseColorButton(colorList[i]));
        }
        this.print();
    }
    createChooseColorButton(color){
        var colorButton = document.createElement('div');
        colorButton.style.backgroundColor = "#"+color;
        colorButton.classList.add('color-button');
        colorButton.addEventListener('click', ()=>this.pixelBoardModel.chooseColor(color));
        return colorButton;
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
    constructor(pixelBoardModel){
        this.pixelBoardModel = pixelBoardModel;
    }
    cellClickHandle(x,y){
        this.pixelBoardModel.performAction(x,y);
    }
    chooseColor(color){
        this.pixelBoardModel.changeColor(color);
    }
    mouseDownHandle(){
        this.pixelBoardModel.mouseDown = true;
    }
    mouseUpHandle(){
        this.pixelBoardModel.mouseDown = false;
    }
}
var pixelBoardModel = new PixelBoardModel(41,10);
var pixelBoardView = new PixelBoardView(pixelBoardModel, new Controller(pixelBoardModel));