var height = document.getElementById('height');
var tents = document.getElementById('tents');
var sizeCell = document.getElementById('sizeCell');
var sizeCellDoc = document.getElementById("sizeCell");
var gameButtonDoc = document.getElementById("gameButton");

height.oninput = function () {
    tents.max = height.value * 2;
    document.getElementById("heightDoc").innerHTML = "Размер поля: " + height.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&tents=" + tents.value + "&size=" + sizeCellDoc.value;
}
tents.oninput = function () {
    document.getElementById("tentsDoc").innerHTML = "Колличество палаток: " + tents.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&tents=" + tents.value + "&size=" + sizeCellDoc.value;
}
sizeCell.oninput = function () {
    document.getElementById("sizeDoc").innerHTML = "Размер ячейки в px: " + sizeCellDoc.value;
    gameButtonDoc.href = "./game.html?height=" + height.value + "&tents=" + tents.value + "&size=" + sizeCellDoc.value;
}