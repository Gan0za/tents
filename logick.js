var height = 9; //Высота поля начиная от 0 включительно
var width = 9;
var game_status = 0; //Статус игры, 0 - ходить можно, 1 нельзя
let matrix_int = new Array();
let matrix_step = new Array();
let top_panel = new Array();
let left_panel = new Array();
var matrix_doc = document.getElementById('matrix');
var top_panel_doc = document.getElementById('top_panel');
var left_panel_doc = document.getElementById('left_panel');

start();

function display(){
	matrix_doc.innerHTML = "";
	for( var i = 0; i <= height; i++ ) {
		for( var j = 0; j <= width; j++ ) {
			if ( matrix_step[i][j] == '0' ) 
				matrix_doc.innerHTML += '<div class="cell" id="' + i + j + '"><img src="img/land.png" id="' + i + j + '"></div>';
			else if ( matrix_step[i][j] == '1' )
					matrix_doc.innerHTML += '<div class="cell" id="' + i + j + '"><img src="img/grass.png" id="' + i + j + '"></div>';		
			else if ( matrix_step[i][j] == '2' )
				matrix_doc.innerHTML += '<div class="cell" id="' + i + j + '"><img src="img/tent.png" id="' + i + j + '"></div>';
            else if ( matrix_step[i][j] == '*' )
				matrix_doc.innerHTML += '<div class="cell" id="' + i + j + '"><img src="img/tree.png" id="' + i + j + '"></div>';
		}
	}
    top_panel_doc.innerHTML = "";
    left_panel_doc.innerHTML = "";
    for( var i = 0; i <= height; i++ ) {
        top_panel_doc.innerHTML += '<div class="panel_cage" id="t' + i + '">' + top_panel[i] +'</div>';
        left_panel_doc.innerHTML += '<div class="panel_left_cage" id="l' + i + '">' + left_panel[i] + '</div>';
    }
}

function matrixInit() {
    for (var i = 0; i <= height; i++) {
        matrix_int.push([]);
        matrix_step.push([]);
        for (var j = 0; j <= width; j++) {
            matrix_int[i].push('0');
            matrix_step[i].push('0');
        }
    }
    for (var i = 0; i <= height; i++) {
        top_panel.push('0');
        left_panel.push('0');
    }
}

function generateTents() {
    var i = 0;
    do {
        var a = Math.floor(Math.random() * height);
        var b = Math.floor(Math.random() * width);
        if (matrix_int[a][b] != '2' && CheckingForLocationOfTents(a, b) == 0) {
            matrix_int[a][b] = '2';
            i++;
        }
    } while (i < (height+width) / 2 + 5)
}

function generateTrees() {
    for (var i = 0; i <= height; i++) {
        for (var j = 0; j <= width; j++) {
            if (matrix_int[i][j] == '2') {
                var flag = true;
                do {
                    try {
                        if (matrix_int[i-1][j] != '2' && matrix_int[i-1][j] != '*'){
                            if ((Math.floor(Math.random() * 4) + 1) == 4 ){
                                matrix_int[i-1][j] = '*';
                                matrix_step[i-1][j] = '*';
                                flag = false;
                                break;
                            }
                        }
                    } catch(e) {}
                    try {
                        if (matrix_int[i][j+1] != '2' && matrix_int[i][j+1] != '*'){
                            if ((Math.floor(Math.random() * 4) + 1) == 4 ){
                                matrix_int[i][j+1] = '*';
                                matrix_step[i][j+1] = '*';
                                flag = false;
                                break;
                            }
                        }
                    } catch(e) {}
                    try {
                        if (matrix_int[i][j-1] != '2' && matrix_int[i][j-1] != '*'){
                            if ((Math.floor(Math.random() * 4) + 1) == 4 ){
                                matrix_int[i][j-1] = '*';
                                matrix_step[i][j-1] = '*';
                                flag = false;
                                break;
                            }
                        }
                    } catch(e) {}
                    try {
                        if (matrix_int[i+1][j] != '2' && matrix_int[i+1][j] != '*'){
                            if ((Math.floor(Math.random() * 4) + 1) == 4 ){
                                matrix_int[i+1][j] = '*';
                                matrix_step[i+1][j] = '*';
                                flag = false;
                                break;
                            }
                        }
                    } catch(e) {}
                } while (flag)  
            }
        }
    }
}

function CheckingForLocationOfTents(i, j) {			
    flag = 0;
    try {
        if (matrix_int[i-1][j-1] == '2')
            flag = 1;
    } catch(e) {}
    try {
        if (matrix_int[i-1][j] == '2')
            flag = 1;
    } catch(e) {}
    try {
        if (matrix_int[i-1][j+1] == '2')
            flag = 1;
    } catch(e) {}
    try {
        if (matrix_int[i][j-1] == '2')
            flag = 1;
    } catch(e) {}
    try {
        if (matrix_int[i][j+1] == '2')
            flag = 1;
    } catch(e) {}
    try {
        if (matrix_int[i+1][j-1] == '2')
            flag = 1;
    } catch(e) {}
    try {
        if (matrix_int[i+1][j] == '2')
            flag = 1;
    } catch(e) {}
    try {
        if (matrix_int[i+1][j+1] == '2')
            flag = 1;
    } catch(e) {}
    return flag;
}

function autoFillingField() {
    var flag = false;
    for (var i = 0; i <= height; i++) {
        for (var j = 0; j <= width; j++) {
            try {
                if (matrix_int[i][j+1] == '*')
                    flag = true;
            } catch(e) {}
            try {
                if (matrix_int[i][j-1] == '*')
                    flag = true;
            } catch(e) {}
            try {
                if (matrix_int[i-1][j] == '*')
                    flag = true;
            } catch(e) {}
            try {
                if (matrix_int[i+1][j] == '*')
                    flag = true;
            } catch(e) {}
            if (flag == false && matrix_int[i][j] != '*')
                matrix_step[i][j] = '1';
            flag = false;
        }
    }
}

function fillingPanels() {
    sum_left = 0;
    sum_top = 0;
    for (var i = 0; i <= height; i++) {
        for (var j = 0; j <= width; j++) {
            if (matrix_int[i][j] == 2){
                sum_left++;
            }
            if (matrix_int[j][i] == 2){
                sum_top++;
            }
        }
        left_panel[i] = sum_left;
        top_panel[i] = sum_top;
        sum_left = 0;
        sum_top = 0;
    }
}

function checkingForWinnings() {
    var flag = true;
    for (var i = 0; i <= height; i++) {
        for (var j = 0; j <= width; j++) {
            if (matrix_int[i][j] == "2" && matrix_step[i][j] != "2")
                flag = false;
        }
    }
    return flag;
}

function displayBaner(str_baner){
	document.getElementById('baner').innerHTML = str_baner;
	document.getElementById('baner').style.visibility = "visible";
}

function start() {
    matrixInit();
    generateTents();
    generateTrees();
    fillingPanels();
    autoFillingField();
    display();
    console.log(matrix_int);
    console.log(matrix_step);
}

matrix_doc.onclick = function(event) {
    if (game_status == 0){
        var a = event.target.id;
        a.toString();
        if (matrix_step[a[0]][a[1]] == "0")
            matrix_step[a[0]][a[1]] = "1";
        else if (matrix_step[a[0]][a[1]] == "1")
            matrix_step[ a[0] ][ a[1] ] = "2";
        else if (matrix_step[a[0]][a[1]] == "2")
            matrix_step[ a[0] ][ a[1] ] = "0";

        if (checkingForWinnings()) {
            game_status = 1;
            displayBaner("Вы выграли!");
        }
        display();
    }
}