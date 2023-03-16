const TIME_DELAY_NUMBER = 400;
const CAO_DO = 620;
const CHIEC_LOAI = 850;
const THOI_GIAN = 600;
const XH_TOP_SO = 920;

var divAudio = $('#play-read-coordinate');
var arr = [];

function addCoordinateFirst(value){
    var request = value.split("");
    var topSo1 = request[0];
    var topSo2 = request[1];
    var soLuong = request[2];
    var type = request[3] + request[4];
    var caodo1 = request[5];
    var caodo2 = request[6];
    var caodo3 = request[7];
    var thoigian1 = request[8];
    var thoigian2 = request[9];
    var thoigian3 = request[10];
    var thoigian4 = request[11];
    readByOneValue('XHTOPSO', 1);
    readByOneValue(topSo1, 2);
    readByOneValue(topSo2, 3);
    readByOneValue(soLuong, 4);
    readByOneValue(type, 5);
    readByOneValue('caodo', 6);
    readByOneValue(caodo1, 7);
    readByOneValue(caodo2, 8);
    readByOneValue(caodo3, 9);
    readByOneValue('thoigian', 10);
    readByOneValue(thoigian1, 11);
    readByOneValue(thoigian2, 12);
    readByOneValue(thoigian3, 13);
    readByOneValue(thoigian4, 14);

    readCoordinate();
}

function readCoordinate(){
    var timeDelay = 0;
    // 1
    setTimeout(function(){
        document.getElementById("audio-" + 1).play();
    }, timeDelay);
    timeDelay += arr[0].time;

    // 2
    setTimeout(function(){
        document.getElementById("audio-" + 2).play();
    }, timeDelay);
    timeDelay += arr[1].time;

    // 3
    setTimeout(function(){
        document.getElementById("audio-" + 3).play();
    }, timeDelay);
    timeDelay += arr[2].time;

    // 4
    setTimeout(function(){
        document.getElementById("audio-" + 4).play();
    }, timeDelay);
    timeDelay += arr[3].time;

    // 5
    setTimeout(function(){
        document.getElementById("audio-" + 5).play();
    }, timeDelay);
    timeDelay += arr[4].time;

    // 6
    setTimeout(function(){
        document.getElementById("audio-" + 6).play();
    }, timeDelay);
    timeDelay += arr[5].time;

    // 7
    setTimeout(function(){
        document.getElementById("audio-" + 7).play();
    }, timeDelay);
    timeDelay += arr[6].time;

    // 8
    setTimeout(function(){
        document.getElementById("audio-" + 8).play();
    }, timeDelay);
    timeDelay += arr[7].time;

    // 9
    setTimeout(function(){
        document.getElementById("audio-" + 9).play();
    }, timeDelay);
    timeDelay += arr[8].time;

    // 10
    setTimeout(function(){
        document.getElementById("audio-" + 10).play();
    }, timeDelay);
    timeDelay += arr[9].time;

    // 11
    setTimeout(function(){
      document.getElementById("audio-" + 11).play();
    }, timeDelay);
    timeDelay += arr[10].time;

    // 12
    setTimeout(function(){
      document.getElementById("audio-" + 12).play();
    }, timeDelay);
    timeDelay += arr[11].time;

    // 13
    setTimeout(function(){
      document.getElementById("audio-" + 13).play();
    }, timeDelay);
    timeDelay += arr[12].time;

    // 14
    setTimeout(function(){
      document.getElementById("audio-" + 14).play();
    }, timeDelay);
    timeDelay += arr[13].time;

    setTimeout(function(){
      divAudio.empty();
      arr = [];
    }, timeDelay);

}

function readByOneValue(key, id){
    var timeDelay = 0;

    if (key == 0) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/0.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 1) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/1.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 2) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/2.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 3) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/3.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 4) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/4.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 5) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/5.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 6) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/6.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 7) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/7.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 8) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/8.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 9) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/9.mp3">');
        timeDelay = TIME_DELAY_NUMBER;
    } else if (key == 22) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/chiecloainho.mp3">');
        timeDelay = CHIEC_LOAI;
    } else if (key == 55) {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/chiecloailon.mp3">');
        timeDelay = CHIEC_LOAI;
    } else if (key == 'XHTOPSO') {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/XHTOPSO.mp3">');
        timeDelay = XH_TOP_SO;
    } else if (key == 'caodo') {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/caodo.mp3">');
        timeDelay = CAO_DO;
    } else if (key == 'thoigian') {
        divAudio.append('<audio id="audio-' + id + '" src="/css/sound/thoigian.mp3">');
        timeDelay = THOI_GIAN;
    }

    var readObject = {
        time: timeDelay
    };

    arr.push(readObject);
}