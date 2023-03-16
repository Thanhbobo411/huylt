var element = $('#content-table tbody');
var op = 0;
var listMap;
var checkLink = false;

$( document ).ready(function() {
    $('#content-table').hide();
    $('.page-content').hide();
    showCannonType();
    loadTableImage();
});

function chooseOption(option){
        var element = $('#content-table tbody');
        op = option;
        $(element).empty();
        $('#content-table').show();
        $.ajax({
            type: "GET",
            url: '/config/coordinate/' + option,
            success: function(response){
                if (response.status){
                    for (i = 0; i < response.list.length; i++){
                        var row = document.createElement("tr");
                        element.append(row);
                        for (j = 0; j < response.list[i].list.length; j++){
                            var cell = document.createElement("td");
                            $(cell).attr('class' ,'border-yellow')
                                   .attr('id', i + '' + j);
                            var table = document.createElement("table");
                            $(table).attr('class', 'sub-sub-class');
                            var tbody = document.createElement("tbody");
                            var td = document.createElement("td");
                            // tactic
                            var text1 = document.createElement("p");
                            $(text1).text(response.list[i].list[j].valueTactic)
                                    .attr('class' ,'tactic');
                            // interShip
                            var text2 = document.createElement("p");
                            $(text2).text(response.list[i].list[j].valueIntership)
                                   .attr('class' ,'interShip');
                            table.append(tbody);
                            cell.append(text1);
                            cell.append(text2);
                            cell.append(table);

                            for (k = 1; k <= 5; k++) {
                                var tr = document.createElement("tr");
                                tbody.append(tr);
                                for (l = 1; l <= 5; l++) {
                                    var td = document.createElement("td");
                                    if(option == 1){
                                        $(td).attr('id', response.list[i].list[j].valueTactic + '' + l + k);
                                        $(td).attr('title', response.list[i].list[j].valueTactic + ':' + l + k);
                                    } else if (option == 2){
                                        $(td).attr('id', response.list[i].list[j].valueIntership + '' + l + k);
                                        $(td).attr('title', response.list[i].list[j].valueIntership + ':' + l + k);
                                    }
                                    tr.append(td);
                                }
                            }
                            row.append(cell);
                        }
                    }
                    if (typeof value !== "undefined"){
                        if (value.settingFlagBattalions != null && value.settingFlagBattalions.length > 0){
                            $.each( value.settingFlagBattalions, function( index, result ) {
                                loadFlagBattalion(result);
                            });
                        }
                        if (value.flagBrigadeId != null){
                            loadFlagBrigade(value);
                        }
                        $.each( value.settingCannons, function( index, result ) {
                            loadSettingCannon(result);
                        });
                    }
                } else {
                    alert('Tọa độ bị trùng lặp. Vui lòng vào cấu hình hệ thống để sửa đổi.');
                }
            }
        });
    }

function chooseMap(mapId){
    $.ajax({
        type: "GET",
        url: '/image/' + mapId,
        success: function(response){
            $('#sub-table').css('background-image', 'url(' + response.url + ')')
                           .css('background-repeat', 'no-repeat')
                           .css('background-position', 'center')
                           .css('background-size','cover');
        }
    });
}

function showCannonType(){
    $.ajax({
        type: "GET",
        url: '/cannon/distance',
        success: function(response){
            var select = $('#select-cannon-type');
            $.each( response, function( index, value ) {
                var option = document.createElement("option");
                $(option).attr('value', value.id)
                        .text(value.name);
                $(select).append(option);
            });
        }
    });
}

$( "#delete" ).click(function() {
    var value = $("#toado").val();
    if (value && $("#" + value).length) {
        $("#" + value).empty();
    } else {
        alert('Mục tiêu không tồn tại, vui lòng nhập lại!');
    }
});

$("#add-new-plane").click(function(){
    var planeID = $("#plane-id").val();
    if (planeIds.indexOf(planeID) !== -1) {
        alert("ID đã tồn tại");
        return;
    }
    planeIds.push(planeID);

    $("#idPlane").val(planeID);
    var text = $( "select#cars option:checked").text();
    if (!$("#coordinates").is(":visible") && planeIds.length == 1) {
        $("#coordinates .plane-name").append("Bắt đầu nhập tọa độ cho máy bay " + text + " (ID: " + planeID +"):")
    }
    $("#coordinates").show();
});

$("#delete-plane").click(function(){
    var planeID = $("#plane-id").val();
    var index 	= planeIds.indexOf(planeID);
    if (index !== -1) {
        planeIds.splice(index, 1);
        $("#plane-id").val('');
    }
    $("#coordinates .plane-name").text("")
    $("#coordinates").hide();
});

$("#addItem").click(function(){
    var topSo = $('#topso').val();
    var toaDo = $('#toado').val();
    var thoiGian = $('#thoigian').val();

    if (topSo == ''){
        alert('Bạn chưa nhập tốp số.');
        return;
    } else if (topSo.length != 2){
        alert('Tốp số bao gồm 2 ký tự. Vui lòng nhập lại!');
        return;
    } else if (toaDo == '') {
        alert('Bạn chưa nhập tọa độ.');
        return;
    } else if (toaDo.length != 5){
        alert('Tọa độ phải là 5 chữ số. Vui lòng nhập lại!');
        return;
    } else if (thoiGian == ''){
        alert('Vui lòng nhập thời gian!');
        return;
    }
    else if (validateToado(toaDo)) {
        var request = {
            topSo: $('#topso').val(),
            toaDo: $('#toado').val(),
            soLuong: $('#soluong').val(),
            type: $('#kieuloai').val(),
            height: $('#caodo').val(),
            time: $('#thoigian').val(),
            flightId: $('#flightId').val(),
            option: op
        };

         $.ajax({
            type: "POST",
            url: '/save/coordinate',
            data: request,
            success: function(response){
                var svg = $('#svg');

                if(response.statusEnd){
                    $('#topso').val('');
                    $('#toado').val('');
                    $('#soluong').val('');
                    $('#kieuloai').val('');
                    $('#caodo').val('');
                    $('#thoigian').val('');
                    alert('Tốp bay đã mất tiêu, vui lòng nhập tốp bay khác.');
                    return;
                }
                var idTd = response.toaDo.substring(0,4);
                if (response.local == 1 || response.local == 2 || response.local == 3 || response.local == 4 || response.local == 5) {
                    var span = document.createElement("span");
                    var spanTime = document.createElement("span");
                    var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
                        circle.setAttribute('cx', response.x1 + 51);
                        circle.setAttribute('cy', response.y1 + 51);
                        circle.setAttribute('r', '3');
                        circle.setAttribute('stroke', response.color);
                        circle.setAttribute('style','fill: none; stroke-width:5');
                        circle.setAttribute('class', 'circle-' + response.topSo + ' blinking');

                    $("#" + idTd).append(span);

                    if(response.sttTime == 1){
                        $("#" + idTd).append(spanTime);
                        $(spanTime).attr('class' ,'span-time');
                        $(spanTime).text(response.time);
                    }

                    if(response.type == 'MT' || response.type == 'mt'){
                        var spanX = document.createElement("span");
                        var spanMT = document.createElement("span");
                        var icon = document.createElement("i");
                        $(icon).attr('class' ,'fa fa-times');
                        $(icon).attr('aria-hidden' ,'true');
                        $("#" + idTd).append(spanX);
                        $("#" + idTd).append(spanMT);
                        $(spanMT).attr('class' ,'mat-tieu');
                        $(spanX).attr('class' ,'icon-x');
                        $(spanMT).text('MT');
                        $(spanX).append(icon);
                    }

                    if(response.type == 'TMT' || response.type == 'tmt'){
                        var spanMT = document.createElement("span");
                        $("#" + idTd).append(spanMT);
                        $(spanMT).attr('class' ,'mat-tieu');
                        $(spanMT).text('TMT');
                    }

                    if (response.local == '1') {
                        $(spanTime).attr('style','top: -13px; left: -10px; font-weight:600;');
                        $(spanMT).attr('style','top: -13px;');
                        $(spanX).attr('style','top: -2px; left: 0px');
                    } else if (response.local == '2') {
                        $(spanTime).attr('style','top: -13px; font-weight:600;');
                        $(spanX).attr('style','top: -2px; left: 10px');
                    } else if (response.local == '3') {
                        $(spanTime).attr('style','top: -5px; font-weight:600;');
                        $(spanX).attr('style','top: 9px; left: 10px');
                    } else if (response.local == '4') {
                        $(spanTime).attr('style','top: -5px; left: -10px; font-weight:600;');
                        $(spanX).attr('style','top: 9px; left: 0px');
                    } else if (response.local == '5') {
                        $(spanTime).attr('style','top: -8px; left: -5px; font-weight:600;');
                        $(spanX).attr('style','top: 4px; left: 4px');
                    }

                    if (!response.statusFirst){
                        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                        newLine.setAttribute('class', 'plane-' + response.topSo);
                        newLine.setAttribute('x1', response.x1 + 51);
                        newLine.setAttribute('y1', response.y1 + 51);
                        newLine.setAttribute('x2', response.x2 + 51);
                        newLine.setAttribute('y2', response.y2 + 51);
                        newLine.setAttribute('style','stroke:' + response.color + '; stroke-width:1');

                        var newCircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
                            newCircle.setAttribute('cx', response.x2 + 51);
                            newCircle.setAttribute('cy', response.y2 + 51);
                            newCircle.setAttribute('r', '3');
                            newCircle.setAttribute('stroke', response.color);
                            newCircle.setAttribute('style','fill: none; stroke-width:5');

                        if(response.type != "MT"){
                            newCircle.setAttribute('class', 'circle-' + response.topSo + ' blinking');
                            $(svg).append(newCircle);
                        }
                        if (response.tmt){
                            newLine.setAttribute('stroke-dasharray', '5,5');
                        }

                        svg.append(newLine);
                    } else {
                        var div = document.createElement("div");
                        var hr = document.createElement("hr");
                        var right = 0;
                        var top = response.y1 + 27;
                        if(!response.height){
                            top -= 10;
                        }
                        var x1 = response.x1 + 24;
                        var y1 = response.y1 + 27;
                        var y2 = response.y1 + 51;
                        var x2 = response.x1 + 51;
                        var left = x1 - 30;

                        var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
                        newLine.setAttribute('class', 'plane-' + response.topSo);
                        newLine.setAttribute('x1', x1);
                        newLine.setAttribute('y1', y1);
                        newLine.setAttribute('x2', x2);
                        newLine.setAttribute('y2', y2);
                        $(newLine).attr('style','stroke:' + response.color + '; stroke-width:1');
                        svg.append(newLine);

                        $(hr).attr('class' ,'hr-style');
                        $(div).attr('class' ,'toa-do-ban-dau');
                        var span1 = document.createElement("span");
                        $(span1).text(response.topSo + ')');
                        $(span1).attr('style', 'color:' + response.color);
                        $(span1).attr('class' ,'top-so-ban-dau');
                        var span2 = document.createElement("span");
                        var numberToStr = "0";
                        if(response.number){
                            numberToStr = response.number.toString();
                        }
                         $(span2).attr('class' ,'toa-do-top');
                         $(span2).attr('style', 'color:' + response.color);
                         $(span2).text(numberToStr.padStart(2, "0") + ' ' + response.type);
                        var span3 = document.createElement("span");
                         $(span3).attr('class' ,'toa-do-bottom');
                         $(span3).text(response.height);

                        div.append(span1);
                        div.append(span2);
                        div.append(hr);
                        div.append(span3);

                        $(svg).append(circle);
                        $('#content-left').append(div);

                        $(div).attr('style', 'color:' + response.color + ';top:' + top + 'px; left:' + left + 'px');
                        $(hr).attr('style', 'border-top: 2px solid ' + response.color);
                    }

                    var length = $('.circle-' + response.topSo).length;
                    if(length == 2 && response.type != "MT"){
                        currentCircle = $('.circle-' + response.topSo)[length - 2];
                    } else {
                        currentCircle = $('.circle-' + response.topSo)[length - 1];
                    }
                    currentCircle.setAttribute('r', '3');
                    currentCircle.setAttribute('style','fill: none; stroke-width:3');
                    if (!response.statusFirst){
                        currentCircle.setAttribute('class', '');
                    }

                    $('#topso').val('');
                    $('#toado').val('');
                    $('#soluong').val('');
                    $('#kieuloai').val('');
                    $('#caodo').val('');
                    $('#thoigian').val('');
                }
            }
        });
    }
});

function validateToado(toaDo){
    var arr = toaDo.split("");
    if(arr.length > 5){
        alert('Tọa độ chỉ gồm 5 số.');
        return false;
    }
    if(parseInt(arr[2]) > 5 || parseInt(arr[3]) > 5 || parseInt(arr[4]) > 5 || parseInt(arr[2]) <= 0 || parseInt(arr[3]) <= 0 || parseInt(arr[4]) <= 0){
        alert('Tọa độ bạn nhập không chính xác.');
        return false;
    }
    return true;
}

$("#button-add-plant-process").click(function(){
    checkLink = true;
    var name = $('#plant-process-input').val();
    var chedo = $('#plant-process-input').val();
    if(name == ''){
        alert('Vui lòng nhập tên chu trình bay.');
    } else if($('#status-interShip').is(':checked') || $('#status-tactic').is(':checked')){
        var type = 0;
        if ($('#status-interShip').is(':checked')) {
            type = 2;
        } else if ($('#status-tactic').is(':checked')){
            type = 1;
        }
        $('.close').trigger('click');
        $.get( "/create/process", {plantName: name, type: type} )
            .done(function( data ) {
                $('#txt').show();
                $('#flight-name').text('Chu trình bay: ' + data.flightName);
                if (data.type == 1){
                    $('#status-flight').text('Chế độ bay: Tác chiến');
                } else if(data.type == 2){
                    $('#status-flight').text('Chế độ bay: Luyện tập');
                }
                $('#flightId').val(data.id);
                $('.page-content').show();
                $('#flight-table').hide();
                $('#create-process-flight').hide();
                $('#flag-icon').hide();
            });
    } else {
        alert('Vui lòng chọn chế độ.')
    }
});

$("#end-process-flight").click(function(){
    var check = confirm("Bạn có muốn kết thúc chu trình bay?");
    if(check){
        $.ajax({
            type: "POST",
            url: '/end/process/' + $('#flightId').val(),
            success: function(response){
                if(response){
                    $('.page-content').hide();
                    $('#create-process-flight').show();
                }
            }
        });
    } else {
        return;
    }
});

var topSo = $('#topso').val();
var toaDo = $('#toado').val();

$('#coordinates input').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 13) {
        $("#addItem").trigger( "click" );
    }
});

$("#addFlagIcon").click(function(){
    var flag = document.createElement("img");
    var span = document.createElement("span");
    var value = $('#coordinate-battalion').val().trim();
    var stringArr = value.split(" ");
    var distance1 = $('#distance-chuyen-cap').val();
    var distance2 = $('#distance-giao-nv').val();

    if (value == ''){
        alert('Bạn chưa nhập tọa độ (VD: d3 44555).');
        return;
    }
    if (distance1 == '' || distance2 == ''){
        alert('Bạn chưa nhập cự ly.');
        return;
    }
    if(stringArr.length == 2){
        var toaDo = stringArr[1];
        var soDaiDoi = stringArr[0];
        var capBac = soDaiDoi.substring(0,1);

        if (toaDo == '' || toaDo.length != 5){
            alert('Tọa độ bản nhập không đúng. Vui lòng nhập thêm tọa độ(bao gồm 5 ký tự).');
            return;
        }else if(capBac == 'D' || capBac == 'd'){
            var mocToaDo = toaDo.substring(4,5);
            var styleTop = 0;
            var styleLeft = 0;
            var idToaDo = toaDo.substring(0,4);
            if(mocToaDo == 1){
                flagTop = -35;
                flagLeft = -25;
                spanTop = -30;
                spanLeft = -11;
            } else if (mocToaDo == 2){
                flagTop = -35;
                flagLeft = -13;
                spanTop = -30;
                spanLeft = 1;
            } else if (mocToaDo == 3){
                flagTop = -24;
                flagLeft = -13;
                spanTop = -20;
                spanLeft = 0;
            } else if (mocToaDo == 4){
                flagTop = -24;
                flagLeft = -25;
                spanTop = -20;
                spanLeft = -11;
            } else if (mocToaDo == 5){
                flagTop = -30;
                flagLeft = -19;
                spanTop = -25;
                spanLeft = -5;
            } else {
                alert('Tọa độ nhập chưa đúng! Hãy nhập lại.');
                return;
            }
            $(span).attr('class' ,'so-dai-doi')
                    .attr('style', 'top: ' + spanTop + 'px; left: ' + spanLeft + 'px;');
            $(flag).attr('class' ,'icon-flag')
                    .attr('style', 'height: auto; width: 30px; top: ' + flagTop + 'px; left: ' + flagLeft + 'px;')
                    .attr('src' , '/css/image/battalion.png');
            if (validCoordinate(toaDo)){
                var request = {
                    flightProcessId: $('#flightId').val(),
                    toaDo : toaDo,
                    battalionName: soDaiDoi,
                    isShow: $('#is-show-distance').val(),
                    distance1: $('#distance-chuyen-cap').val(),
                    distance2: $('#distance-giao-nv').val()
                };
                $.ajax({
                    type: "POST",
                    data: request,
                    url: '/coordinate/battalion/' + $('#is-show-distance').val(),
                    success: function(response){
                        $(span).text(soDaiDoi);
                        if (response.show){
                            var svg = $('#svg');
                            var circle1 = document.createElementNS('http://www.w3.org/2000/svg','circle');
                            circle1.setAttribute('cx', response.x1 + 51);
                            circle1.setAttribute('cy', response.y1 + 51);
                            circle1.setAttribute('r', response.radiusTd1*12.5);
                            circle1.setAttribute('stroke', '#ff0000');
                            circle1.setAttribute('style','fill: none; stroke-width:1');

                            var circle2 = document.createElementNS('http://www.w3.org/2000/svg','circle');
                            circle2.setAttribute('cx', response.x1 + 51);
                            circle2.setAttribute('cy', response.y1 + 51);
                            circle2.setAttribute('r', response.radiusTd2*12.5);
                            circle2.setAttribute('stroke', '#ff0000');
                            circle2.setAttribute('style','fill: none; stroke-width:1');
                            svg.append(circle1);
                            svg.append(circle2);
                        }
                        $('#select-cannon-type').empty();
                        showCannonType();
                        $("#" + idToaDo).append(span);
                        $("#" + idToaDo).append(flag);

                        // setting default
                        $('#coordinate-battalion').val('');
                        $('#distance-chuyen-cap').val('');
                        $('#distance-giao-nv').val('');
                    }
                });
            }
        } else {
            alert('Cờ tiểu đoàn phải bắt đầu bằng "d" hoặc "D", vui lòng nhập lại!');
        }
    } else {
        alert('Tọa độ bạn nhập không đúng, vui lòng nhập lại!');
    }
});

$("#addFlagBrigade").click(function(){
    var flag = document.createElement("img");
    var span = document.createElement("span");
    var toaDo = $('#brigade').val().trim();
    if(toaDo == '' || toaDo.length != 5){
        alert('Vui lòng nhập thêm tọa độ(bao gồm 5 ký tự, VD: 12345).');
        return;
    } else {
        var mocToaDo = toaDo.substring(4,5);
        var idToaDo = toaDo.substring(0,4);
        var styleTop = 0;
        var styleLeft = 0;
        if(mocToaDo == 1){
            flagTop = -45;
            flagLeft = -43;
        } else if (mocToaDo == 2){
            flagTop = -45;
            flagLeft = -30;
        } else if (mocToaDo == 3){
            flagTop = -35;
            flagLeft = -30;
        } else if (mocToaDo == 4){
            flagTop = -35;
            flagLeft = -43;
        } else if (mocToaDo == 5){
            flagTop = -40;
            flagLeft = -36;
        }

        $(flag).attr('class' ,'icon-flag')
             .attr('style', 'height :50px; width: 50px; top: ' + flagTop + 'px; left: ' + flagLeft + 'px;')
             .attr('src' , '/css/image/icon-brigade.png');
        if (validCoordinate(toaDo)){
            $.ajax({
                type: "POST",
                url: '/coordinate/brigade/' + toaDo + '/' + $('#flightId').val(),
                success: function(response){
                    if (response){
                        $('#flag-brigade').hide();
                        $('#tam-phao').show();
                        $("#" + idToaDo).append(flag);
                    }
                }
            });
        }
    }
});

$("#addCannon").click(function(){
    var img = document.createElement("img");
    var span = document.createElement("span");
    var value = $('#toa-do-phao').val().trim();
    var stringArr = value.split(" ");
    var capBac = stringArr[0];
    var toaDo = stringArr[1];
    if(stringArr.length != 2 || value == ''){
        alert('Tọa độ bạn nhập không đúng, vui lòng nhập lại! (VD: C1 12345)');
        return;
    } else if(toaDo == '' || toaDo.length != 5){
        alert('Vui lòng nhập tọa độ tâm pháo(bao gồm 5 ký tự).');
        return;
    } else {
        var src = '/css/image/cannon.png';
        var type = $('#select-cannon-type').val();
        var idToaDo = toaDo.substring(0, 4);

        $(img).attr('class' ,'icon-cannon')
                .attr('height' ,'40')
                .attr('width' ,'40')
                .attr('src' , src);

        $(span).attr('id' ,'cap-bac-phao-' + toaDo);
        $(span).attr('class' ,'cap-bac-phao');
        validCoordinate(toaDo)
        if(validCoordinate(toaDo)){
            $.ajax({
                type: "POST",
                url: '/cannon/' + toaDo + '/' + $('#flightId').val()  + '/' + type + '/' + capBac,
                success: function(response){
                    var r = response.radius * 12.5;
                    $('#toa-do-phao').val('');

                    var svg = $('#svg');
                    $("#" + idToaDo).append(span);
                    $("#" + idToaDo).append(img);
                    var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
                    circle.setAttribute('id', 'cannon-id-' + idToaDo);
                    circle.setAttribute('cx', response.x1 + 51);
                    circle.setAttribute('cy', response.y1 + 51);
                    circle.setAttribute('r', r);
                    circle.setAttribute('class', 'class-cannon');
                    svg.append(circle);
                    $('#cap-bac-phao-' + toaDo).text(capBac);
                }
            });
        }
    }
});

$("#exitAddCannon").click(function(){
    $('#tam-phao').hide();
    $('#coordinates').show();
});

function flightDetails(flightId){
    var redirectUrl = '/api/interShip/detail';
    $.ajax({
        type: "GET",
        url: redirectUrl,
        success: function(response){
            window.location.href = redirectUrl;
        }
    });
}

function loadTableImage(){
    $.ajax({
        type: "GET",
        url: '/images',
        success: function(response){
            var contentMap = $('.maps-show');
            $.each( response, function( index, value ) {
                var name = value.name;
                var url = value.url;
                var id = value.id;
                var div = document.createElement("div");
                $(div).attr('class', 'radio');
                var img = document.createElement("img");
                var label = document.createElement("label");
                var input = document.createElement("input");
                $(label).attr('style', 'padding: 0 10;');
                $(label).attr('vertical-align', 'middle;');
                $(label).append(input);
                $(input).attr('type', 'radio');
                $(input).attr('style', 'width: 20px; height: 20px;');
                $(input).attr('name', 'map');
                $(input).attr('onclick', 'chooseMap('+ value.id +')');
                $(input).attr('value', value.id);
                $(img).attr('src', url);
                $(div).append(img);
                $(div).append(label);
                $(contentMap).append(div);
            });
        }
    });
}

function validCoordinate(coordinate){
    var arr = coordinate.split('');
    var idCheck = arr[0] + arr[1];
    if (!$("#" + idCheck).length){
        alert('Tọa độ không tồn tại.');
        return false;
    } else {
        if(parseInt(arr[2]) > 5 || parseInt(arr[3]) > 5 || parseInt(arr[4]) > 5){
            alert('Tọa độ bạn nhập không đúng.');
            return false;
        }
    }
    return true;
}

$("#end-create-battalion").click(function(){
    $.ajax({
        type: "GET",
        url: '/check/battalion/' + $('#flightId').val(),
        success: function(response){
            if (response){
                $('#flag-icon').hide();
                $('#flag-brigade').show();
            } else {
                alert('Bạn chưa cấu hình sở chỉ huy tiểu đoàn');
            }
        }
    });
});

$('#plant-process-input').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 13) {
        $("#button-add-plant-process").trigger( "click" );
    }
});

$('#addMaps').click(function() {
   var mapsId = $('input[name="map"]:checked').val();
    if (typeof mapsId !== "undefined"){
        $.ajax({
            type: "GET",
            url: '/config/maps/' + mapsId + '/' + $('#flightId').val(),
            success: function(response){
               if (response){
                   $('#flag-icon').show();
                   $('#content-map').hide();
               }
            }
        });
    }
});

$("a").click(function (event) {
    if (checkLink) {
        var check = confirm("Bạn muốn thoát quá trình này?");
        if (check){
            return;
        } else {
            event.preventDefault();
        }
    }
});