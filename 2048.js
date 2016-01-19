function myFunction() {
    console.log('myFUnction was called');
    var board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
    var score = 0;
    var highScore = 0;
    var str;
    
    var mapClass = {
        '0' : 'zero',
        '2' : 'two',
        '4' : 'four',
        '8': 'eight',
        '16' : 'sixteen',
        '32' : 'thirtytwo',
        '64' : 'sixtyfour',
        '128' : 'onetwentyeight',
        '256' : 'twofiftysix',
        '512' : 'fiveonetwo',
        '1024' : 'onezerotwofour',
        '2048' : 'twozerofoureight'
    };
    
    var mapTile = {
        '00' : 'first',
        '01' : 'second',
        '02' : 'third',
        '03' : 'fourth',
        '10' : 'fifth',
        '11' : 'sixth',
        '12' : 'seventh',
        '13' : 'eighth',
        '20' : 'ninth',
        '21' : 'tenth',
        '22' : 'eleventh',
        '23' : 'twelfth',
        '30' : 'thirteenth',
        '31' : 'fourteenth',
        '32' : 'fifteenth',
        '33' : 'sixteenth'
    };
    function displayBoard() {
        for(var i = 0 ; i < 4 ; i++) {
            for(var j = 0 ; j < 4 ; j ++) {
                var tempi= i;
                var tempj = j;
                var firstChar = tempi.toString();
                var secondChar = tempj.toString();
                var tileKey = firstChar.concat(secondChar);
                var tile = document.getElementById(mapTile[tileKey]);
                var tempBoard = board[i][j];
                var number = tempBoard.toString();
                if(tileKey == "03" || tileKey == "13" || tileKey == "23"){
                    var toInsertAtt = "tile right "+mapClass[number];
                    tile.setAttribute("class",toInsertAtt);
                } else if(tileKey == "30" || tileKey == "31" || tileKey == "32") {
                    var toInsertAtt = "tile bottom "+mapClass[number];
                    tile.setAttribute("class",toInsertAtt);
                }else if(tileKey == "33"){
                    var toInsertAtt = "tile right bottom "+mapClass[number];
                    tile.setAttribute("class",toInsertAtt);
                } else {
                    var toInsertAtt = "tile "+mapClass[number];
                    tile.setAttribute("class",toInsertAtt);
                }
                
            }
        }
        
        if(highScore < score){
            localStorage.high = score;
        }
        highScore = localStorage.high;
        var scoreTile = document.getElementById('scoreTile');
        scoreTile.innerHTML=score;
        var highScoreTile = document.getElementById('highScoreTile');
        highScoreTile.innerHTML=highScore;
        
    }
        
    function getRandomTile(){
        var array = [];
        for(var i = 0 ; i < 4 ; i++){
            for(var j = 0 ; j < 4 ; j++){
                if(board[i][j] == 0){
                    var first = i.toString();
                    var second = j.toString();
                    var toBeAdded = first+second;
                    array.push(toBeAdded);
                }
            }    
        }
        if(array.length == 0){
            var endObj ={
                'x' : -1,
                'y' : -1
            };
            
            return endObj;
        } else {
            var randomNo = Math.floor(Math.random() * array.length) + 0;
            var obj = {
            'x' : array[randomNo].charAt(0) ,
            'y' : array[randomNo].charAt(1)
          };
        return obj;    
        }
        
    }
    function init() {
        board = [[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]];
        var randomTile = getRandomTile();
        var i = randomTile.x;
        var j = randomTile.y;
        board[i][j] = Math.random() > 0.8 ? 4 : 2 ;
        randomTile = getRandomTile();
        var i2 = randomTile.x;
        var j2 = randomTile.y;
        board[i2][j2] = Math.random() > 0.8 ? 4 : 2 ;
        str = JSON.stringify(board);
        localStorage.previousState= str;
        localStorage.score=0;
        localStorage.highScore=highScore;
        var element = document.getElementById('gameOver');
        element.style.display = 'none';
        var element2 = document.getElementById('win');
        element2.style.display = 'none';
        window.addEventListener('keydown',move);
        var newGame = document.getElementById('newGame');
        var undo = document.getElementById('undo');
        newGame.addEventListener('click',init);
        undo.addEventListener('click',onUndo);
        score = 0;
        displayBoard();
        
    }
    
    function moveLeft() {
        str = JSON.stringify(board);
        localStorage.previousState= str;
        localStorage.score=score;
        localStorage.highScore=highScore;
        if(areMovesAvailable()){
        console.log('MOVELEFT was called');
        var added ;
        for(var i = 0 ; i < 4 ; i++){
            added = 0;
            for(var j = 1 ; j < 4 ; j++){
                if(board[i][j-1] == board[i][j] && board[i][j-1]!=0){
                    if(added == 0){
                        board[i][j-1] = 2*board[i][j-1];
                        board[i][j]=0;
                        score = score+board[i][j-1];
                        added = 1;
                    } else { continue ;}
                } else if(board[i][j-1] != board[i][j] && board[i][j-1]!=0) {
                    continue;
                } else if (board[i][j-1]==0 && board[i][j]!=0) {
                        var temp =j-1;
                        while(temp > 0 && board[i][temp] == 0){
                            temp--;
                        }
                        if(temp==0 && board[i][temp] == 0){
                            board[i][temp] = board[i][j];
                            board[i][j]=0;
                        }else {
                            board[i][temp+1]=board[i][j];
                            board[i][j]=0;
                            if((board[i][temp+1]==board[i][temp]) && added==0){
                                board[i][temp] = 2*board[i][temp];
                                board[i][temp+1] =0;
                                score = score + board[i][temp];
                                added=1;
                            }
                        }
                    } else {continue;}
                } 
            }
        
        var randomTile = getRandomTile();
        var i = randomTile.x;
        var j = randomTile.y;
        if(i != -1) board[i][j] = Math.random() > 0.8 ? 4 : 2 ;
        displayBoard();
        }else {
             window.removeEventListener('keydown',move);
             console.log('GAME OVER');
            onGameOver();
        }
    }
        
    function moveRight() {
        str = JSON.stringify(board);
        localStorage.previousState= str;
        localStorage.score=score;
        localStorage.highScore=highScore;
        if(areMovesAvailable()){
        console.log('MOVERIGHT was called');
        var added ;
        for(var i = 0 ; i < 4 ; i++){
            added = 0;
            for(var j = 2 ; j >= 0 ; j--){
                if(board[i][j+1] == board[i][j] && board[i][j+1]!=0){
                    if(added == 0){
                        board[i][j+1] = 2*board[i][j+1];
                        board[i][j]=0;
                        score = score+board[i][j+1];
                        added = 1;
                    } else { continue ;}
                } else if(board[i][j+1] != board[i][j] && board[i][j+1]!=0) {
                    continue;
                } else if (board[i][j+1]==0 && board[i][j]!=0) {
                        var temp =j+1;
                        while(temp < 3 && board[i][temp] == 0){
                            temp++;
                        }
                        if(temp==3 && board[i][temp] == 0){
                            board[i][temp] = board[i][j];
                            board[i][j]=0;
                        }else {
                            board[i][temp-1]=board[i][j];
                            board[i][j]=0;
                            if((board[i][temp-1]==board[i][temp]) && added==0){
                                board[i][temp] = 2*board[i][temp];
                                board[i][temp-1] =0;
                                score = score + board[i][temp];
                                added=1;
                            }
                        }
                    } else {continue;}
                } 
            }
        var randomTile = getRandomTile();
        var i = randomTile.x;
        var j = randomTile.y;
        if(i != -1) board[i][j] = Math.random() > 0.8 ? 4 : 2 ;
        displayBoard();
        } else {
             window.removeEventListener('keydown',move);
             console.log('GAME OVER');
            onGameOver();
        }
    }
    function moveUp() {
        str = JSON.stringify(board);
        localStorage.previousState= str;
        localStorage.score=score;
        localStorage.highScore=highScore;
        if(areMovesAvailable()){
        console.log('MOVEUP was called');
        var added ;
        for(var i = 0 ; i < 4 ; i++){
            added = 0;
            for(var j = 1 ; j < 4 ; j++){
                if(board[j-1][i] == board[j][i] && board[j-1][i]!=0){
                    if(added == 0){
                        board[j-1][i] = 2*board[j-1][i];
                        board[j][i]=0;
                        score = score+board[j-1][i];
                        added = 1;
                    } else { continue ;}
                } else if(board[j-1][i] != board[j][i] && board[j-1][i]!=0) {
                    continue;
                } else if (board[j-1][i]==0 && board[j][i]!=0) {
                        var temp =j-1;
                        while(temp > 0 && board[temp][i] == 0){
                            temp--;
                        }
                        if(temp==0 && board[temp][i] == 0){
                            board[temp][i] = board[j][i];
                            board[j][i]=0;
                        }else {
                            board[temp+1][i]=board[j][i];
                            board[j][i]=0;
                            if((board[temp+1][i]==board[temp][i]) && added==0){
                                board[temp][i] = 2*board[temp][i];
                                board[temp+1][i] =0;
                                score = score + board[temp][i];
                                added=1;
                            }
                        }
                    } else {continue;}
                } 
            }
        var randomTile = getRandomTile();
        var i = randomTile.x;
        var j = randomTile.y;
        if(i != -1) board[i][j] = Math.random() > 0.8 ? 4 : 2 ;
        displayBoard();
       }else {
            window.removeEventListener('keydown',move);
            console.log('GAME OVER');
           onGameOver();
        }
    }
    function moveDown() {
        str = JSON.stringify(board);
        localStorage.previousState= str;
        localStorage.score=score;
        localStorage.highScore=highScore;
        if(areMovesAvailable()){
        console.log('MOVEDOWN was called');
        var added ;
        for(var i = 0 ; i < 4 ; i++){
            added = 0;
            for(var j = 2 ; j >= 0 ; j--){
                if(board[j+1][i] == board[j][i] && board[j+1][i]!=0){
                    if(added == 0){
                        board[j+1][i] = 2*board[j+1][i];
                        board[j][i]=0;
                        score = score+board[j+1][i];
                        added = 1;
                    } else { continue ;}
                } else if(board[j+1][i] != board[j][i] && board[j+1][i]!=0) {
                    continue;
                } else if (board[j+1][i]==0 && board[j][i]!=0) {
                        var temp =j+1;
                        while(temp < 3 && board[temp][i] == 0){
                            temp++;
                        }
                        if(temp==3 && board[temp][i] == 0){
                            board[temp][i] = board[j][i];
                            board[j][i]=0;
                        }else {
                            board[temp-1][i]=board[j][i];
                            board[j][i]=0;
                            if((board[temp-1][i]==board[temp][i]) && added==0){
                                board[temp][i] = 2*board[temp][i];
                                board[temp-1][i] =0;
                                score = score + board[temp][i];
                                added=1;
                            }
                        }
                    } else {continue;}
                } 
            }
        var randomTile = getRandomTile();
        var i = randomTile.x;
        var j = randomTile.y;
        if(i != -1) board[i][j] = Math.random() > 0.8 ? 4 : 2 ;
        displayBoard();
        } else {
             window.removeEventListener('keydown',move);
             console.log('GAME OVER');
            onGameOver();
        }
        
    }
    
    function areMovesAvailable(){
        var checkTile = getRandomTile();
        if(checkTile.x == -1){
            for(var i = 0 ; i < 4 ; i++){
                for(var j = 0 ; j < 4 ; j++){
                    if((i==0 && j==0)) {if((board[0][1] == board[0][0]) || (board[1][0] == board[0][0])) return true;}
                    else if((i==0 && j==3)) {if((board[0][2] == board[0][3]) || (board[1][3] == board[0][3])) return true;}
                    else if((i==3 && j==0)) {if((board[2][0] == board[3][0]) || (board[3][1] == board[3][0])) return true;}
                    else if((i==3 && j==3)) {if((board[3][2] == board[3][3]) || (board[2][3] == board[3][3])) return true;}
                    else if((i==0 && j==1) || (i==0 && j==2)) {
                        if((board[i][j-1]==board[i][j]) || (board[i][j+1]==board[i][j]) || (board[i+1][j]==board[i][j])) return true;}
                    else if((i==3 && j==1) || (i==3 && j==2)){
                        if((board[i][j-1]==board[i][j]) || (board[i][j+1]==board[i][j]) || (board[i-1][j]==board[i][j])) return true;}
                    else if((i==1 && j==0) || (i==2 && j==0)) {
                        if((board[i+1][j]==board[i][j]) || (board[i-1][j]==board[i][j]) || (board[i][j+1]==board[i][j])) return true;}
                    else if((i==1 && j==3) || (i==2 && j==3)) {
                        if((board[i+1][j]==board[i][j]) || (board[i-1][j]==board[i][j]) || (board[i][j-1]==board[i][j])) return true;}
                    else {
                        if((board[i][j+1]==board[i][j]) || (board[i][j-1]==board[i][j]) || (board[i+1][j]==board[i][j])|| 
                           (board[i-1][j]==board[i][j])) return true;
                    }

                }
            }
            return false;
        }
        else return true;
    }
    
    function onUndo(){
        console.log('Undo CLicked');
        board = JSON.parse(localStorage.previousState);
        score = JSON.parse(localStorage.score);
        highScore=localStorage.highScore;
        displayBoard();
        
    }
    function onGameOver(){
        window.removeEventListener('keydown',move);
        var ele = document.getElementById('gameOver');
        ele.style.display = 'block' ;
        var tryAgainButton = document.getElementById('tryAgain');
        tryAgainButton.addEventListener('click',init);
    }
    function on2048(){
        window.removeEventListener('keydown',move);
        var elem = document.getElementById('win');
        elem.style.display = 'block' ;
        var afterWinTryAgainButton = document.getElementById('afterWinTryAgain');
        afterWinTryAgainButton.addEventListener('click',init);
    }
    function is2048(){
        for(var i = 0 ; i < 4 ; i++){
            for(var j = 0; j < 4 ; j++){
                if(board[i][j]==2048) return true;
            }
        }
        return false;
    }
    function move(e){
        
        if(is2048()){
            on2048();
        }else {
            switch(e.keyCode){
                case 37 : moveLeft() ; break;
                case 38 : moveUp() ; break;
                case 39 : moveRight() ; break;
                case 40 : moveDown() ; break;
                
            }
        }
        return;
    }
    
    
   
    init();
    //play();
}