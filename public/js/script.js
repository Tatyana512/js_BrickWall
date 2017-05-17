
function clearWnd()
{
   try{
   document.getElementById('wallPlace').innerHTML = "";
   window.wallSettings = new Wall();
   Left1 = 0;
  _countBricks = 0;
  _countRows = 0;
   document.getElementById('countBricks').innerHTML = _countBricks;
   Top1 = 0;  
   }
   catch(exc){
     console.error(exc);
   }
}
window.onresize = function(event) {
    clearWnd();
};

 var Left1 = 0;
 var Top1 = 0;
 var _timer; 
 var _countBricks = 0;
 var _countRows = 0;
function BrickWall(){
    clearWnd();
    var gSettingsWall = new Wall();
    let _wallHeight = gSettingsWall.wallHeight;
    let _wallWidth =  gSettingsWall.wallWidth;  
    
    var _wallPlace = document.getElementById('wallPlace');
    var _xOffset = _wallPlace.offsetLeft;
    var _yOffset = _wallPlace.offsetTop;     
    var _brickSettings = getBrickSettings();

     Left1 =  Number(_xOffset);
     Top1 = Number(_yOffset);
    //_timer = setInterval(function(){       
     BuildWallItem(_wallPlace,_brickSettings, _brickSettings.x, _brickSettings.y, _xOffset, _yOffset, _wallWidth, _wallHeight);              
      //   }, 100);     
 
}


function Wall(){
   let _width = document.getElementById('xWall').value;
   let _height = document.getElementById('yWall').value;
   
   if(!_width){
     console.error('Проверьте данные формы. Не указана ширина стены!');
     this.wallWidth = '600';
     
   } else if(Number(_width) > 600 || Number(_width) < 0 ){
       this.wallWidth = '600';
       console.error('Проверьте данные формы. Данные указаны неверно для ширины формы!Ширина должна быть от 0 до 600.');
   }
   else{
      this.wallWidth = _width;
   }
   
   if(!_height){
     console.error('Проверьте данные формы. Не указана высота стены!');
     this.wallHeight = '400';
     
   } else if(Number(_height) > 400 || Number(_height) < 0 ){
       this.wallHeight = '400';
       console.error('Проверьте данные формы. Данные указаны неверно для высоты формы!Высота должна быть от 0 до 400.');
   }
   else{
      this.wallHeight = _height;
   }  
   
   }
   
   function Brick(){
    let _x = document.getElementById('xBrick').value
    let _y = document.getElementById('yBrick').value;
    let _color = document.getElementById('colorBrick');    
    let _selectedColor = _color.options[_color.selectedIndex].value;
    let _checkrandomColor =  document.getElementById('randomColorCheckBox').checked; 
    this.randomSelectedColor = _checkrandomColor;
    this.color = _selectedColor;
    if(!_x){
      console.error('Проверьте данные формы. Ширина кирпича указана неверно!');
      this.x = 10; 
      }else if(Number(_x) > 100 || Number(_x) <=0) {
         console.error('Проверьте данные формы. Ширина кирпича должны быть от 0 до 100!'); 
      }else{
         this.x = _x;
      }      
      
      if(!_y){
      console.error('Проверьте данные формы. Ширина кирпича указана неверно!');
      this.y = 10; 
      }else if(Number(_y) > 100 || Number(_y) <=0) {
         console.error('Проверьте данные формы. Ширина кирпича должны быть от 0 до 100!'); 
      }else{
         this.y = _y;
      }        
      
      
 }
 
 function getBrickSettings(){
     var _currentBrickSettings = new Brick();    
     return _currentBrickSettings;
 }
 

 function BuildWallItem(_wallPlace, _brickSettings, _offsetx,_offsety, _xOffset, _yOffset, limitx, limity ){  
  try{
    
      _countBricks++;
      let _partBricks = 1;
      document.getElementById('countBricks').innerHTML = _countBricks;
      _partBricks = 1;
      let flag = false;
      if( (Number(Left1) + Number(_brickSettings.x))>= (window.innerWidth - 20)) {  
                _countRows++;
                if(_countRows % 2 !== 0){
                    _partBricks = 0.5;  
                    Left1 = Number(_xOffset) + (Number(Number(_brickSettings.x) * _partBricks));           
                    }
                    else{
                    _partBricks = 1;
                    Left1 = Number(_xOffset);
                    }      
                if(Number(Top1) >= limity){                  
                    return;
                } else {
               Top1 = Number(Top1) + Number(_offsety);             
             }          
             flag = false;
        }      
         else {                 
               flag = true;                        
           }
            var div = document.createElement('div');
                div.className = 'brick';   
                if(_brickSettings.randomSelectedColor){         
                    div.style.backgroundColor = getRandomColor();
                }else{
                    div.style.backgroundColor = _brickSettings.color;
                }     
              div.style.left = Left1 + 'px';
              div.style.top = Top1 + 'px'; 
              div.style.position = 'absolute';
              div.style.width = (Number(_brickSettings.x * _partBricks))+ 'px';
              div.style.display = 'inline-block';   
              div.style.height = (Number(_brickSettings.y)) + 'px';      
              _wallPlace.appendChild(div);
              if(flag) Left1 = Number(Left1) + Number(_offsetx); 
              BuildWallItem(_wallPlace,
                 _brickSettings, _brickSettings.x,
                 _brickSettings.y, _xOffset,
                 _yOffset, limitx, limity);
      }
      catch(exc)
      {
      console.log(exc);
      }
}



function getRandomColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}



