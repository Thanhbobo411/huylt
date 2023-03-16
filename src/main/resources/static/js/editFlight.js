var flightId;
var value;

$( document ).ready(function() {
    init();
});

function init(){
    loadAllFlightDetail();
    $('#select-cannon-type').empty();
    showCannonType();
    loadTableImage();
}

function loadAllFlightDetail(){
    var pathname = window.location.pathname;
    var arr = pathname.split('/');
    var id = arr[arr.length - 1];
    flightId = id;
    $.ajax({
        type: "GET",
        url: '/flight/' + id,
        success: function(response){
            loadTableConfigCoordinate(response);
            value = response;
            loadBackGroundTable();
            $('#flight-name').empty();
            $('#flight-name').text(response.nameFlight);
            $('#flight-coordinate').show();
            chooseOption(2);
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

function chooseOption(option){
    var element = $('#content-table tbody');
    op = option;
    $(element).empty();
    $.ajax({
        type: "GET",
        url: '/config/coordinate/' + option,
        success: function(response){
            if (response.status){
                for (i = 0; i < response.list.length; i++){
                    var row = document.createElement("tr");
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
                    element.append(row);
                }
                if (typeof value !== "undefined"){
                    $('.class-battalion').remove();
                    if (value.settingFlagBattalions.length > 0){
                        $.each( value.settingFlagBattalions, function( index, result ) {
                            loadFlagBattalion(result);
                        });
                    }
                    if (value.flagBrigadeId != null){
                        loadFlagBrigade(value);
                    }
                    $('.class-cannon').remove();
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
    $('#id-flag-battalion-edit').val(response.flagBattalionId);
    var idToaDo = response.toaDo.substring(0,4);
    var flag = document.createElement("img");
    var span = document.createElement("span");

    $(span).attr('class' ,'so-dai-doi')
            .attr('style', 'font-weight: 600; top: ' + spanTop + 'px; left: ' + spanLeft + 'px;')
            .text(response.battalionName);
    $(flag).attr('class' ,'icon-flag')
            .attr('style', 'height: auto; width: 30px; top: ' + flagTop + 'px; left: ' + flagLeft + 'px;')
            .attr('src' , '/css/image/battalion.png');

    $("#" + idToaDo).append(span);
    $("#" + idToaDo).append(flag);

    //draw circle
    if (response.show){
        var svg = $('#svg');

        var circle1 = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle1.setAttribute('id', 'flag-circle1-' + response.id);
        circle1.setAttribute('class', 'class-battalion');
        circle1.setAttribute('cx', response.coordinateX + 51);
        circle1.setAttribute('cy', response.coordinateY + 51);
        circle1.setAttribute('r', response.distance1*12.5);
        circle1.setAttribute('stroke', '#ff0000');
        circle1.setAttribute('style','fill: none; stroke-width:1');

        var circle2 = document.createElementNS('http://www.w3.org/2000/svg','circle');
        circle2.setAttribute('id', 'flag-circle2-' + response.id);
        circle2.setAttribute('class', 'class-battalion');
        circle2.setAttribute('cx', response.coordinateX + 51);
        circle2.setAttribute('cy', response.coordinateY + 51);
        circle2.setAttribute('r', response.distance2*12.5);
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
        $('#id-flag-brigade-edit').val(response.flagBrigadeId);
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
    var cannonName = response.nameCannon;
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
    circle.setAttribute('id', 'cannon-id-' + response.id);
    circle.setAttribute('class', 'class-cannon');
    circle.setAttribute('cx', response.coordinateX + 51);
    circle.setAttribute('cy', response.coordinateY + 51);
    circle.setAttribute('r', r);
    svg.append(circle);
    $('#cap-bac-phao-' + response.toaDo).text(response.nameCannon);
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

$("#saveCannonCoordinates").click(function(){
    var value = $('#coordinate-cannon').val().trim();
    var stringArr = value.split(" ");
    var capBac = stringArr[0];
    var toaDo = stringArr[1];
    var cannonId = $('#id-cannon-edit').val();

    if(stringArr.length != 2){
        alert('Tọa độ bạn nhập không đúng, vui lòng nhập lại!');
        return;
    } else if (value == '') {
        alert('Bạn chưa nhập tọa độ pháo.');
        return;
    } else if(toaDo == '' || toaDo.length != 5){
        alert('Vui lòng nhập tọa độ tâm pháo(bao gồm 5 ký tự).');
        return;
    } else {
        var capDaiDoi = capBac.substring(0,1);
        if (capDaiDoi == 'c' || capDaiDoi == 'C'){
            var type = $('#select-cannon-type').val();
            if(validCoordinate(toaDo)){
                $.ajax({
                    type: "POST",
                    url: '/edit/cannon/' + toaDo + '/' + cannonId  + '/' + type + '/' + capBac,
                    success: function(response){
                        $('#popup-edit-cannon').modal('toggle');
                        init();
                    }
                });
            }
        } else {
            alert('Tọa độ trận địa pháo phải bắt đầu bằng "C" hoặc "c", vui lòng nhập lại!')
        }
    }
});

$("#saveFlagCoordinates").click(function(){
    var value = $('#coordinate-battalion').val().trim();
    var stringArr = value.split(" ");
    var battalionId = $('#id-flag-battalion-edit').val();
    var isShowDistance = $('#is-show-distance').val();
    var distance1 = $('#distance-chuyen-cap').val();
    var distance2 = $('#distance-giao-nv').val();
    if (value == ''){
        alert('Bạn chưa nhập tọa độ (VD: d3 44555)')
    } else if (distance1 == '' || distance2 == ''){
        alert('Bạn chưa nhập cự ly (Đơn vị cự ly km)');
    } else if(stringArr.length == 2){
        var toaDo = stringArr[1];
        var tenTieuDoan = stringArr[0];
        var capBac = tenTieuDoan.substring(0,1);

        if(toaDo != '' && toaDo.length == 5){
            if(capBac == 'D' || capBac == 'd'){
                if (validCoordinate(toaDo)){
                    var request = {
                        id: battalionId,
                        toaDo : toaDo,
                        battalionName: tenTieuDoan,
                        isShow: isShowDistance,
                        distance1: $('#distance-chuyen-cap').val(),
                        distance2: $('#distance-giao-nv').val()
                    };
                    $.ajax({
                        type: "POST",
                        data: request,
                        url: '/edit/battalion/' + isShowDistance,
                        success: function(response){
                            $('#popup-edit-battalion').modal('toggle');
                            init();
                            $('#flag-circle1-' + battalionId).remove();
                            $('#flag-circle2-' + battalionId).remove();
                        }
                    });
                }
            } else {
                alert('Cờ tiểu đoàn phải bắt đầu bằng "d" hoặc "D", vui lòng nhập lại!');
            }
        } else {
            alert('Vui lòng nhập thêm tọa độ(bao gồm 5 ký tự).');
        }
    } else {
        alert('Tọa độ bạn nhập không đúng, vui lòng nhập lại!');
    }
});

$("#saveFlagBrigade").click(function(){
    var toaDo = $('#coordinate-brigade').val().trim();
    var brigadeId = $('#id-flag-brigade-edit').val();
    if(toaDo == '' || toaDo.length != 5){
        alert('Tọa độ bạn nhập chưa đúng(tạo độ bao gồm 5 ký tự, VD: 12345).');
        return;
    } else {
        if (validCoordinate(toaDo)){
            $.ajax({
                type: "POST",
                url: '/edit/coordinate/brigade/' + toaDo + '/' + brigadeId,
                success: function(response){
                    if (response){
                        $('#popup-edit-brigade').modal('toggle');
                        init();
                    }
                }
            });
        }
    }
});

$("#buttonExitFlight").click(function(){
    window.location.href = '/api/flights';
});

function loadTableConfigCoordinate(response){
    var tableConfig = $('#table-config-coordinate tbody');
    tableConfig.empty();

    // add flag brigade
    var tr1 = document.createElement("tr");
    var tdNameBrigade = document.createElement("td");
    $(tdNameBrigade).append('Sở chỉ huy lữ đoàn');
    var coordinateBrigade = document.createElement("td");
    $(coordinateBrigade).append(response.toaDoBrigade);
    var distance1Brigade = document.createElement("td");
    $(distance1Brigade).append(' ');
    var distance2Brigade = document.createElement("td");
    $(distance2Brigade).append(' ');
    var distance3Brigade = document.createElement("td");
    $(distance3Brigade).append(' ');
    var tdButtonBrigade = document.createElement("td");
    if (response.flagBrigadeId != null){
        $('#addFlagBrigade').hide();
        $('#saveFlagBrigade').show();
        var buttonEditBrigade = document.createElement("button");
        $(buttonEditBrigade).attr('type', 'button')
                     .attr('class', 'btn btn-primary')
                     .attr('data-toggle', 'modal')
                     .attr('data-backdrop', 'static')
                     .attr('data-keyboard', 'false')
                     .attr('data-target', '#popup-edit-brigade')
                     .text('Sửa')
                     .attr('onclick', 'showBrigade(' + response.flagBrigadeId + ',\'' + response.toaDoBrigade + '\')');
        var buttonDeleteBrigade = document.createElement("button");
        $(buttonDeleteBrigade).attr('type', 'button')
                     .attr('class', 'btn btn-danger ml-2')
                     .attr('onclick', 'deleteBrigade(' + response.flagBrigadeId + ')')
                     .text('Xóa');
        $(tdButtonBrigade).append(buttonEditBrigade);
        $(tdButtonBrigade).append(buttonDeleteBrigade);
    } else {
        $('#addFlagBrigade').show();
        $('#saveFlagBrigade').hide();
        var buttonAddBrigade = document.createElement("button");
        $(buttonAddBrigade).attr('type', 'button')
                     .attr('class', 'btn btn-primary')
                     .attr('data-toggle', 'modal')
                     .attr('data-backdrop', 'static')
                     .attr('data-keyboard', 'false')
                     .attr('data-target', '#popup-edit-brigade')
                     .attr('onclick', 'showAddBrigade()')
                     .text('Thêm');
        $(tdButtonBrigade).append(buttonAddBrigade);
    }

    $(tr1).append(tdNameBrigade);
    $(tr1).append(coordinateBrigade);
    $(tr1).append(distance1Brigade);
    $(tr1).append(distance2Brigade);
    $(tr1).append(distance3Brigade);
    $(tr1).append(tdButtonBrigade);
    $(tableConfig).append(tr1);

    // add flag battalion
    $.each( response.settingFlagBattalions, function( index, value ) {
        var radius1;
        var radius2;
        var tr2 = document.createElement("tr");
        var tdNameBattalion = document.createElement("td");
        $(tdNameBattalion).append('Sở chi huy tiểu đoàn ' + value.battalionName);
        var coordinateBattalion = document.createElement("td");
        $(coordinateBattalion).append(value.toaDo);
        var distance1Battalion = document.createElement("td");
        $(distance1Battalion).append(value.distance1 + ' km');
        var distance2Battalion = document.createElement("td");
        $(distance2Battalion).append(value.distance2 + ' km');
        var distance3Battalion = document.createElement("td");
        $(distance3Battalion).append(' ');
        var tdButtonBattalion = document.createElement("td");
        var buttonEditBattalion = document.createElement("button");
        $(buttonEditBattalion).attr('type', 'button')
                     .attr('class', 'btn btn-primary')
                     .attr('data-toggle', 'modal')
                     .attr('data-backdrop', 'static')
                     .attr('data-keyboard', 'false')
                     .attr('data-target', '#popup-edit-battalion')
                     .text('Sửa')
                     .attr('onclick', 'showBattalion(' + value.id + ',' + value.show + ',' + value.distance1 + ',' + value.distance2 + ',' + value.toaDo + ',\'' + value.battalionName + '\')');
        var buttonDeleteBrigade = document.createElement("button");
        $(buttonDeleteBrigade).attr('type', 'button')
                     .attr('class', 'btn btn-danger ml-2')
                     .attr('onclick', 'deleteBattalion(' + value.id + ')')
                     .text('Xóa');
        $(tdButtonBattalion).append(buttonEditBattalion);
        $(tdButtonBattalion).append(buttonDeleteBrigade);

        $(tr2).append(tdNameBattalion);
        $(tr2).append(coordinateBattalion);
        $(tr2).append(distance1Battalion);
        $(tr2).append(distance2Battalion);
        $(tr2).append(distance3Battalion);
        $(tr2).append(tdButtonBattalion);
        $(tableConfig).append(tr2);
    });
    // add cannon
    $.each( response.settingCannons, function( index, value ) {
        var trCannon = document.createElement("tr");
        var tdNameCannon = document.createElement("td");
        $(tdNameCannon).append('Trận địa pháo ' + value.nameCannon);
        var coordinateCannon = document.createElement("td");
        $(coordinateCannon).append(value.toaDo);
        var distance1Cannon = document.createElement("td");
        $(distance1Cannon).append(' ');
        var distance2Cannon = document.createElement("td");
        $(distance2Cannon).append(' ');
        var distance3Cannon = document.createElement("td");
        $(distance3Cannon).append(value.radius + ' km');
        var tdButtonCannon = document.createElement("td");
        var buttonEditCannon = document.createElement("button");
        $(buttonEditCannon).attr('type', 'button')
                     .attr('class', 'btn btn-primary')
                     .attr('data-toggle', 'modal')
                     .attr('data-backdrop', 'static')
                     .attr('data-keyboard', 'false')
                     .attr('data-target', '#popup-edit-cannon')
                     .text('Sửa')
                     .attr('onclick', 'showCannon(' + value.id + ',\'' + value.nameCannon + '\',' + value.toaDo + ')');
        $(tdButtonCannon).append(buttonEditCannon);
        var buttonDeleteCannon = document.createElement("button");
        $(buttonDeleteCannon).attr('type', 'button')
                     .attr('class', 'btn btn-danger ml-2')
                     .text('Xóa')
                     .attr('onclick', 'deleteCannon(' + value.id + ')');
        $(tdButtonCannon).append(buttonDeleteCannon);

        $(trCannon).append(tdNameCannon);
        $(trCannon).append(coordinateCannon);
        $(trCannon).append(distance1Cannon);
        $(trCannon).append(distance2Cannon);
        $(trCannon).append(distance3Cannon);
        $(trCannon).append(tdButtonCannon);
        $(tableConfig).append(trCannon);
    });
}

function deleteBattalion(battalionId){
    var check = confirm("Bạn muốn xóa sở chỉ huy tiểu đoàn?");
    if(check){
        $.ajax({
            type: "GET",
            url: '/delete/flag/battalion/' + battalionId,
            success: function(response){
                if (response){
                    alert('Xóa thành công!');
                    init();
                }
            }
        });
    }
}

function showAddBrigade(){
    $('#coordinate-brigade').val('');
}

function addBrigade(){
    var toaDo = $('#coordinate-brigade').val().trim();
    if(toaDo == '' || toaDo.length != 5){
        alert('Tọa độ bạn nhập chưa đúng(tạo độ bao gồm 5 ký tự).');
        return;
    } else {
        if (validCoordinate(toaDo)){
            $.ajax({
                type: "POST",
                url: '/coordinate/brigade/' + toaDo + '/' + flightId,
                success: function(response){
                    if (response){
                        $('#popup-edit-brigade').modal('toggle');
                        init();
                    }
                }
            });
        }
    }
}

function deleteBrigade(brigadeId){
    var check = confirm("Bạn muốn xóa sở chỉ huy lữ đoàn?");
    if(check){
        $.ajax({
            type: "GET",
            url: '/delete/brigade/' + brigadeId,
            success: function(response){
                if (response){
                    alert('Xóa thành công!');
                    init();
                }
            }
        });
    }
}

function showBrigade(brigadeId, coordinate){
    $('#id-flag-brigade-edit').val(brigadeId);
    $('#coordinate-brigade').val(coordinate);
}

function showBattalion(battalionId, isShow, distance1, distance2, coordinate, nameBattalion){
    $('#id-flag-battalion-edit').val(battalionId);
    $('#coordinate-battalion').val(nameBattalion + ' ' + coordinate);
    $('#distance-chuyen-cap').val(distance1);
    $('#distance-giao-nv').val(distance2);
    if (isShow){
        $('#select-show').attr("selected",true);
    } else {
        $('#select-not-show').attr("selected",true);
    }
    $('#addFlagCoordinates').hide();
    $('#saveFlagCoordinates').show();
}

function showCannon(cannonId,nameCannon, coordinate){
    $('#addCannonCoordinates').hide();
    $('#saveCannonCoordinates').show();
    $('#id-cannon-edit').val(cannonId);
    $('#coordinate-cannon').val(nameCannon + ' ' + coordinate);
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

function showPopupAddBattalion(){
    $('#coordinate-battalion').val('');
    $('#distance-chuyen-cap').val('');
    $('#distance-giao-nv').val('');
    $('#addFlagCoordinates').show();
    $('#saveFlagCoordinates').hide();
}

$("#addFlagCoordinates").click(function(){
    var value = $('#coordinate-battalion').val().trim();
    var stringArr = value.split(" ");
    var battalionId = $('#id-flag-battalion-edit').val();
    var isShowDistance = $('#is-show-distance').val();
    var distance1 = $('#distance-chuyen-cap').val();
    var distance2 = $('#distance-giao-nv').val();
    if (value == ''){
        alert('Bạn chưa nhập tọa độ (VD: d3 44555)')
    } else if (distance1 == '' || distance2 == ''){
        alert('Bạn chưa nhập cự ly (Đơn vị cự ly km)');
    } else if(stringArr.length == 2){
        var toaDo = stringArr[1];
        var tenTieuDoan = stringArr[0];
        var capBac = tenTieuDoan.substring(0,1);

        if(toaDo != '' && toaDo.length == 5){
            if(capBac == 'D' || capBac == 'd'){
                if (validCoordinate(toaDo)){
                    var request = {
                        id: battalionId,
                        flightProcessId: flightId,
                        toaDo : toaDo,
                        battalionName: tenTieuDoan,
                        isShow: isShowDistance,
                        distance1: $('#distance-chuyen-cap').val(),
                        distance2: $('#distance-giao-nv').val()
                    };
                    $.ajax({
                        type: "POST",
                        data: request,
                        url: '/coordinate/battalion/' + isShowDistance,
                        success: function(response){
                            $('#popup-edit-battalion').modal('toggle');
                            init();
                        }
                    });
                }
            } else {
                alert('Cờ tiểu đoàn phải bắt đầu bằng "d" hoặc "D", vui lòng nhập lại!');
            }
        } else {
            alert('Vui lòng nhập thêm tọa độ(bao gồm 5 ký tự).');
        }
    } else {
        alert('Tọa độ bạn nhập không đúng, vui lòng nhập lại!');
    }
});

function showPopupAddCannon(){
    $('#coordinate-cannon').val('');
    $('#addCannonCoordinates').show();
    $('#saveCannonCoordinates').hide();
}

$("#addCannonCoordinates").click(function(){
    var value = $('#coordinate-cannon').val().trim();
    var stringArr = value.split(" ");
    var capBac = stringArr[0];
    var toaDo = stringArr[1];
    var cannonId = $('#id-cannon-edit').val();

    if(stringArr.length != 2){
        alert('Tọa độ bạn nhập không đúng, vui lòng nhập lại!');
        return;
    } else if (value == '') {
        alert('Bạn chưa nhập tọa độ pháo.');
        return;
    } else if(toaDo == '' || toaDo.length != 5){
        alert('Vui lòng nhập tọa độ tâm pháo(bao gồm 5 ký tự).');
        return;
    } else {
        var capDaiDoi = capBac.substring(0,1);
        if (capDaiDoi == 'c' || capDaiDoi == 'C'){
            var type = $('#select-cannon-type').val();
            if(validCoordinate(toaDo)){
                $.ajax({
                    type: "POST",
                    url: '/cannon/' + toaDo + '/' + flightId  + '/' + type + '/' + capBac,
                    success: function(response){
                        $('#popup-edit-cannon').modal('toggle');
                        init();
                    }
                });
            }
        } else {
            alert('Tọa độ trận địa pháo phải bắt đầu bằng "C" hoặc "c", vui lòng nhập lại!')
        }
    }
});

function deleteCannon(cannonId){
    var check = confirm("Bạn muốn xóa trận địa pháo này?");
    $.ajax({
        type: "GET",
        url: '/setting/cannon/delete/' + cannonId,
        success: function(response){
            if (response){
                alert('Xóa thành công!');
                init();
            }
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

$('#addMaps').click(function() {
   var mapsId = $('input[name="map"]:checked').val();
    if (typeof mapsId !== "undefined"){
        $.ajax({
            type: "GET",
            url: '/config/maps/' + mapsId + '/' + flightId,
            success: function(response){
               if (response){
                   alert('Thay đổi bản đồ thành công!');
               }
            }
        });
    }
});