var statusSessionFirst = true;
var loadDetail;
var record = 0;
var value;
var numberFirstByTime;
var checkClick = false;

$( document ).ready(function() {
    loadAllFlightDetail();
    loadTableImage();
    $('#end-process').hide();
    $('#flag-icon').hide();
});

function loadCoordinateByTime(){
    var pathname = window.location.pathname;
    var arr = pathname.split('/');
    var id = arr[arr.length - 1];
    var request = {
        thoiGian: $('#time').val(),
        statusFirst: statusSessionFirst,
        times: $('#times').val(),
        number: record
    };
    $.ajax({
        type: "GET",
        url: '/load/coordinate/' + id,
        data: request,
        success: function(response){
            numberFirstByTime = 0;
            var timeDelay = 0;
            if (response.statusEnd){
                clearInterval(loadDetail);
            } else {
                var list = response.list;
                record += list.length;
                if(list.length){
                    var recordNumber = list.length;
                    var timeLoad = Math.floor(10000/recordNumber);
                    var valueTime = 0;
                    $.each( list, function( key, value ) {
                        if (value.statusFirst) {
                            numberFirstByTime += 1;
                            if (numberFirstByTime > 1){
                                valueTime += timeLoad;
                                setTimeout( function(){ loadCoordinate(value); }, valueTime);
                            } else {
                                setTimeout( function(){ loadCoordinate(value); }, valueTime);
                            }
                            valueTime += 7000;
                        } else {
                            setTimeout( function(){ loadCoordinate(value); }, valueTime);
                            valueTime += timeLoad;
                        }
                    });
                }

                console.log(response);
                statusSessionFirst = false;
                $('#time').val(response.time);
                $('#times').val(response.sttTime);
            }
        }
    });
}

$("#button-review-process").click(function(){
    checkClick = true;
    $('#back-session').hide();
    $('#content-review-flight').show();
    $('#button-review-process').hide();
    $('#flight-coordinate').hide();
    $('#content-map').hide();
    $('#end-process').show();
    chooseOption(2);
    loadBackGroundTable();
    loadDetail = setInterval(function(){
        loadCoordinateByTime();
    }, 10000);
});

$("a").click(function (event) {
    if (checkClick) {
        var check = confirm("Bạn muốn thoát quá trình này?");
        if (check){
            return;
        } else {
            event.preventDefault();
        }
    }
});

function loadCoordinate(value){
    var svg = $('#svg');
    var idTd = value.toaDo.substring(0,4);
    if (value.local == 1 || value.local == 2 || value.local == 3 || value.local == 4 || value.local == 5) {
        var spanTime = document.createElement("span");
        var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
            circle.setAttribute('cx', value.x1 + 51);
            circle.setAttribute('cy', value.y1 + 51);
            circle.setAttribute('r', '4');
            circle.setAttribute('stroke', value.color);
            circle.setAttribute('style','fill: none; stroke-width:8');
            circle.setAttribute('class', 'circle-' + value.topSo + ' blinking');

        $("#" + idTd).append(spanTime);

        if(value.sttTime == 1){
            $(spanTime).attr('class' ,'span-time');
            $(spanTime).text(value.time);
        }

        var spanMT = document.createElement("span");
        if(value.type == 'MT' || value.type == 'mt'){
            var spanX = document.createElement("span");
            var icon = document.createElement("i");
            $(icon).attr('class' ,'fa fa-times');
            $(icon).attr('aria-hidden' ,'true');
            $("#" + idTd).append(spanX);
            $("#" + idTd).append(spanMT);
            $(spanMT).attr('class' ,'mat-tieu');
            $(spanMT).attr('style' ,'top: -13px; color:' + value.color);
            $(spanX).attr('class' ,'icon-x');
            $(spanMT).text('MT');
            $(spanX).append(icon);
        }

        if(value.type == 'TMT' || value.type == 'tmt'){
            $("#" + idTd).append(spanMT);
            $(spanMT).attr('style' ,'top: -13px; color:' + value.color);
            $(spanMT).attr('class' ,'mat-tieu');
            $(spanMT).text('TMT');
        }

        if (value.local == '1') {
            $(spanTime).attr('style','top: -13px; left: -10px; font-weight:600;');
            $(spanX).attr('style','top: -2px; left: 0px; color:' + value.color);
        } else if (value.local == '2') {
            $(spanTime).attr('style','top: -13px; font-weight:600;');
            $(spanX).attr('style','top: -2px; left: 10px; color:' + value.color);
        } else if (value.local == '3') {
            $(spanTime).attr('style','top: -5px; font-weight:600;');
            $(spanX).attr('style','top: 9px; left: 10px; color:' + value.color);
        } else if (value.local == '4') {
            $(spanTime).attr('style','top: -5px; left: -10px; font-weight:600;');
            $(spanX).attr('style','top: 9px; left: 0px; color:' + value.color);
        } else if (value.local == '5') {
            $(spanTime).attr('style','top: -8px; left: -5px; font-weight:600;');
            $(spanX).attr('style','top: 4px; left: 4px; color:' + value.color);
        }

        if (!value.statusFirst){
            var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
            newLine.setAttribute('class', 'plane-' + value.topSo);
            newLine.setAttribute('x1', value.x1 + 51);
            newLine.setAttribute('y1', value.y1 + 51);
            newLine.setAttribute('x2', value.x2 + 51);
            newLine.setAttribute('y2', value.y2 + 51);
            newLine.setAttribute('style','stroke:' + value.color + '; stroke-width:1');

            var newCircle = document.createElementNS('http://www.w3.org/2000/svg','circle');
            newCircle.setAttribute('cx', value.x2 + 51);
            newCircle.setAttribute('cy', value.y2 + 51);
            newCircle.setAttribute('r', '4');
            newCircle.setAttribute('stroke', value.color);
            newCircle.setAttribute('style','fill: none; stroke-width:8');
            if (value.tmt){
                newLine.setAttribute('stroke-dasharray', '5,5');
            }

            if(value.type != "MT"){
                newCircle.setAttribute('class', 'circle-' + value.topSo + ' blinking');
                $(svg).append(newCircle);
            }

            svg.append(newLine);
        } else {
            var request = value.topSo + value.number + value.type + value.height + value.time;
            if (request.length == 12){
                addCoordinateFirst(request);
            }
            var div = document.createElement("div");
            var hr = document.createElement("hr");
            var right = 0;
            var top = value.y1 + 27;
            if(!value.height){
                top -= 10;
            }
            var x1 = value.x1 + 24;
            var y1 = value.y1 + 27;
            var y2 = value.y1 + 51;
            var x2 = value.x1 + 51;
            var left = x1 - 30;

            var newLine = document.createElementNS('http://www.w3.org/2000/svg','line');
            newLine.setAttribute('class', 'plane-' + value.topSo);
            newLine.setAttribute('x1', x1);
            newLine.setAttribute('y1', y1);
            newLine.setAttribute('x2', x2);
            newLine.setAttribute('y2', y2);
            $(newLine).attr('style','stroke:' + value.color + '; stroke-width:1');

            svg.append(newLine);

            $(hr).attr('class' ,'hr-style');
            $(div).attr('class' ,'toa-do-ban-dau');
            var span1 = document.createElement("span");
            $(span1).text(value.topSo + ')');
            $(span1).attr('style', 'color:' + value.color);
            $(span1).attr('class' ,'top-so-ban-dau');
            var span2 = document.createElement("span");
             $(span2).attr('class' ,'toa-do-top');
             $(span2).attr('style', 'color:' + value.color);
             $(span2).text(value.number.toString().padStart(2, "0") + ' ' + value.type);
            var span3 = document.createElement("span");
             $(span3).attr('class' ,'toa-do-bottom');
             $(span3).text(value.height);

            div.append(span1);
            div.append(span2);
            div.append(hr);
            div.append(span3);

            $(svg).append(circle);
            $('#content-left').append(div);

            $(div).attr('style', 'color:' + value.color + ';top:' + top + 'px; left:' + left + 'px');
            $(hr).attr('style', 'border-top: 2px solid ' + value.color);
        }

        var length = $('.circle-' + value.topSo).length;
        if(length == 2 && value.type != "MT"){
            currentCircle = $('.circle-' + value.topSo)[length - 2];
        } else {
            currentCircle = $('.circle-' + value.topSo)[length - 1];
        }

        if (!value.statusFirst){
            currentCircle.setAttribute('class', '');
            currentCircle.setAttribute('r', '1');
            currentCircle.setAttribute('style','fill: none; stroke-width:3');
        }

        $('#topso').val('');
        $('#toado').val('');
        $('#soluong').val('');
        $('#kieuloai').val('');
        $('#caodo').val('');
        $('#thoigian').val('');
    }
}

function loadAllFlightDetail(){
    var pathname = window.location.pathname;
    var arr = pathname.split('/');
    var id = arr[arr.length - 1];

    $.ajax({
        type: "GET",
        url: '/flight/' + id,
        success: function(response){
            value = response;
            $('#button-review-process').hide();
            $('#flight-coordinate').hide();
            $('#import-data').show();
            $('#flight-id').val(id);
            $('#detail-flight-table tbody').empty();
            $('#flight-name').empty();
            $('#flight-name').text(response.nameFlight);
            if (response.statusBattalion){
                if (response.coordinateList.length > 0){
                    $('#button-review-process').show();
                    $('#flight-coordinate').show();
                    $('#import-data').hide();
                    $.each( response.coordinateList, function( index, result ) {
                        loadTableCoordinate(index, result);
                    });
                    var table = $('#detail-flight-table').DataTable();
                    configTableFlightDetail();
                }
            } else {
                $('#flightId').val(id);
                $('#coordinates').show();
                $('#content-review-flight').show();
                $('#flight-coordinate').hide();
                $('#import-data').hide();
                chooseOption(2);
            }
        }
    });
}

function loadBackGroundTable(){
    if(value.urlImage != null){
        $('#sub-table').css('background-image', 'url(' + value.urlImage + ')')
                       .css('background-repeat', 'no-repeat')
                       .css('background-position', 'center')
                       .css('background-size','cover');
    }
}

function loadFlagBattalion(response){
    //Flag
    var styleTop = 0;
    var styleLeft = 0;
    var mocToaDo = response.toaDo.substring(4,5);
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
        }

    var flag = document.createElement("img");
    var span = document.createElement("span");

    $(span).attr('class' ,'so-dai-doi')
            .attr('style', 'top: ' + spanTop + 'px; left: ' + spanLeft + 'px;')
            .text(response.battalionName);
    $(flag).attr('class' ,'icon-flag')
            .attr('style', 'height: auto; width: 30px; top: ' + flagTop + 'px; left: ' + flagLeft + 'px;')
            .attr('src' , '/css/image/battalion.png');

    var idToaDo = response.toaDo.substring(0,4);
    $("#" + idToaDo).append(span);
    $("#" + idToaDo).append(flag);

    //draw circle
    if (response.show){
        var svg = $('#svg');

        var circle1 = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle1.setAttribute('cx', response.coordinateX + 51);
        circle1.setAttribute('cy', response.coordinateY + 51);
        circle1.setAttribute('r', value.radiusTd1*12.5);
        circle1.setAttribute('stroke', '#ff0000');
        circle1.setAttribute('style','fill: none; stroke-width:1');

        var circle2 = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle2.setAttribute('cx', response.coordinateX + 51);
        circle2.setAttribute('cy', response.coordinateY + 51);
        circle2.setAttribute('r', value.radiusTd2*12.5);
        circle2.setAttribute('stroke', '#ff0000');
        circle2.setAttribute('style','fill: none; stroke-width:1');
        svg.append(circle1);
        svg.append(circle2);
    }
}

function loadFlagBrigade(response){
    var flag = document.createElement("img");
    var span = document.createElement("span");
    var toaDo = response.toaDoBrigade;
    if(toaDo == '' || toaDo.length != 5){
        alert('Vui lòng nhập thêm tọa độ(bao gồm 5 ký tự).');
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
        if($("#" + idToaDo).length){
            $("#" + idToaDo).append(flag);
        }
    }
}

function loadSettingCannon(response){
    //cannon
    var img = document.createElement("img");
    var span = document.createElement("span");
    var src = '/css/image/cannon.png';
    var idToaDo = response.toaDo.substring(0, 4);

    $(img).attr('class' ,'icon-cannon')
            .attr('height' ,'40')
            .attr('width' ,'40')
            .attr('src' , src);

    $(span).attr('id' ,'cap-bac-phao-' + response.toaDo);
    $(span).attr('class' ,'cap-bac-phao');

    var r = response.radius * 12.5;
    $('#toa-do-phao').val('');

    var svg = $('#svg');
    $("#" + idToaDo).append(span);
    $("#" + idToaDo).append(img);
    var circle = document.createElementNS('http://www.w3.org/2000/svg','circle');
    circle.setAttribute('id', 'cannon-id-' + idToaDo);
    circle.setAttribute('cx', response.coordinateX + 51);
    circle.setAttribute('cy', response.coordinateY + 51);
    circle.setAttribute('class', 'class-cannon');
    circle.setAttribute('r', r);
    circle.setAttribute('stroke', 'rgba(88, 82, 82, 0.96)');
    circle.setAttribute('style','fill: none; stroke-width:1');
    circle.setAttribute('stroke-dasharray', '5,5');
    svg.append(circle);
    $('#cap-bac-phao-' + response.toaDo).text(response.nameCannon);
}

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

$("#exitAddCannon").click(function(){
    location.reload();
});

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

$("#end-process").click(function(){
    var check = confirm("Bạn muốn kết thúc chu trình bay?");
    if(check){
        location.reload();
    }
});

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
        url: '/check/battalion/' + $('#flight-id').val(),
        success: function(response){
            if (response){
                $.ajax({
                    type: "GET",
                    url: '/check/brigade/' + $('#flight-id').val(),
                    success: function(response){
                        $('#flag-icon').hide();
                        if (response){
                            $('#tam-phao').show();
                            $('#flag-brigade').hide();
                        } else {
                            $('#flag-brigade').show();
                        }
                    }
                });
                $('#flag-icon').hide();
                $('#flag-brigade').show();
            } else {
                alert('Bạn chưa cấu hình sở chỉ huy tiểu đoàn');
            }
        }
    });
});

$("#back-session").click(function(){
    window.location.href = '/api/interShip';
});


