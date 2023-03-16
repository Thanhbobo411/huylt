var tableTactic = $('#toa-do-tac-chien tbody');
var tableInterShip = $('#toa-do-thuc-tap tbody');
var table = $('#table-cannon-type tbody');

var arrTactic = [];
var arrInterShip = [];

function changeTextTactic(id){
     var valueTactic = $('#tactic-input-' + id).val();
     if(valueTactic == '') return;
     var request = {
         id: id,
         value: valueTactic,
     };

     for(i = 0; i < arrTactic.length; i++){
        if(arrTactic[i].value == valueTactic){
            alert('Gia tri trung lap.');
            $('#tactic-input-' + id).val('');
            return;
        }
     }

     arrTactic.push(request);
}

function changeTextInterShip(id){
     var valueIntership = $('#interShip-input-' + id).val();
     if(valueIntership == '') return;
     var request = {
         id: id,
         value: valueIntership,
     };

     for(i = 0; i < arrInterShip.length; i++){
         if(arrInterShip[i].value == valueIntership){
             alert('Gia tri trung lap.');
             $('#interShip-input-' + id).val('');
             return;
         }
      }
     arrInterShip.push(request);
}

$( document ).ready(function() {
    $('#save-data-tactic').hide();
    $('#save-data-inter-ship').hide();
    $('#cancel-data-tactic').hide();
    $('#cancel-data-inter-ship').hide();
    $.ajax({
        type: "GET",
        url: '/config/coordinate',
        success: function(response){
            for (i = 0; i < response.list.length; i++){
                var rowTactic = document.createElement("tr");
                tableTactic.append(rowTactic);
                var rowInterShip = document.createElement("tr");
                tableInterShip.append(rowInterShip);

                for (j = 0; j < response.list[i].list.length; j++){
                    var cellTactic = document.createElement("td");

                    var cellInterShip = document.createElement("td");
                    var textTactic = document.createElement("p");
                    var textInterShip = document.createElement("p");
                    var inputTactic = document.createElement("input");
                    var inputInterShip = document.createElement("input");
                    //tactic
                    $(inputTactic).attr('onchange', 'changeTextTactic(' + response.list[i].list[j].id + ')')
                            .attr('type', 'number')
                            .attr('class', 'form-control')
                            .attr('id', 'tactic-input-' + response.list[i].list[j].id)
                            .hide();
                    $(textTactic).attr('class' ,'gia-tri-toa-do')
                           .text(response.list[i].list[j].valueTactic)
                           .attr('id' ,'tactic-toa-do-' + response.list[i].list[j].id);
                    cellTactic.append(inputTactic);
                    cellTactic.append(textTactic);
                    rowTactic.append(cellTactic);
                    //interShip
                    $(inputInterShip).attr('onchange', 'changeTextInterShip(' + response.list[i].list[j].id + ')')
                            .attr('type', 'number')
                            .attr('class', 'form-control')
                            .attr('id', 'interShip-input-' + response.list[i].list[j].id)
                            .hide();
                    $(textInterShip).attr('class' ,'gia-tri-toa-do')
                           .text(response.list[i].list[j].valueIntership)
                           .attr('id' ,'interShip-toa-do-' + response.list[i].list[j].id);
                    cellInterShip.append(inputInterShip);
                    cellInterShip.append(textInterShip);
                    rowInterShip.append(cellInterShip);
                }
            }
        }
    });

    loadCannon();
    loadBattalionDistance();
    loadSettingPlanDistance();
});

function loadCannon(){
    $.ajax({
        type: "GET",
        url: '/cannon/distance',
        success: function(response){
            $('#table-cannon-type tbody').empty();
            $.each( response, function( index, value ) {
                var tr = document.createElement("tr");
                var name = document.createElement("td");
                $(name).text(value.name);
                var distance = document.createElement("td");
                $(distance).text(value.distance + ' km');
                var blockButton = document.createElement("td");
                var buttonEdit = document.createElement("button");
                $(buttonEdit).attr('type', 'button')
                          .attr('class', 'btn btn-primary')
                          .attr('onclick', 'editCannon(' + value.id + ')')
                          .text('Sửa')
                          .attr('data-toggle', 'modal')
                          .attr('data-backdrop', 'static')
                          .attr('data-keyboard', 'false')
                          .attr('data-target', '#edit-cannon');
                var buttonDelete = document.createElement("button");
                $(buttonDelete).attr('type', 'button')
                            .attr('class', 'btn btn-danger m-l-10')
                            .attr('onclick', 'deleteCannon(' + value.id + ')')
                            .text('Xóa');

                $(blockButton).append(buttonEdit);
                $(blockButton).append(buttonDelete);
                $(tr).append(name);
                $(tr).append(distance);
                $(tr).append(blockButton);
                $(table).append(tr);
            });
        }
    });
}

function loadBattalionDistance(){
    $.ajax({
        type: "GET",
        url: '/battalion/distance',
        success: function(response){
            $('#table-shifting-distance').empty();
            $.each( response, function( index, value ) {
                var tr = document.createElement("tr");
                var name = document.createElement("th");
                $(name).text(value.name);
                var distance = document.createElement("td");
                var distanceText = document.createElement("p");
                $(distanceText).attr('id', 'distance-' + value.id)
                               .text(value.distance + ' km');
                var distanceInput = document.createElement("input");
                $(distanceInput).attr('type', 'text')
                                .attr('class', 'form-control')
                                .attr('value', value.distance);
                $(distance).append(distanceText);
                $(distance).append(distanceInput);

                var tdButton = document.createElement("td");
                var buttonEdit = document.createElement("button");
                $(buttonEdit).attr('type', 'button')
                             .attr('class', 'btn btn-primary')
                             .attr('data-toggle', 'modal')
                             .attr('data-backdrop', 'static')
                             .attr('data-keyboard', 'false')
                             .attr('data-target', '#edit-distance')
                             .text('Sửa')
                             .attr('onclick', 'showDistance(' + value.id + ')');
                $(tdButton).append(buttonEdit);
                $(tr).append(name);
                $(tr).append(distance);
                $(tr).append(tdButton);
                $('#table-shifting-distance').append(tr);
            });
        }
    });
}

$("#delete-data-tactic").click(function(){
    $('#toa-do-tac-chien input').show();
    $('#toa-do-tac-chien .gia-tri-toa-do').hide();
    $('#save-data-tactic').show();
    $("#delete-data-tactic").hide();
    $('#cancel-data-tactic').show();
});

$('#cancel-data-tactic').click(function(){
    $('#toa-do-tac-chien input').hide   ();
    $('#toa-do-tac-chien .gia-tri-toa-do').show();
    $('#save-data-tactic').hide();
    $("#delete-data-tactic").show();
    $('#cancel-data-tactic').hide();
});

$("#delete-data-inter-ship").click(function(){
    $('#toa-do-thuc-tap input').show();
    $('#toa-do-thuc-tap .gia-tri-toa-do').hide();
    $('#save-data-inter-ship').show();
    $("#delete-data-inter-ship").hide();
    $('#cancel-data-inter-ship').show();
});

$("#cancel-data-inter-ship").click(function(){
    $('#toa-do-thuc-tap input').hide();
    $('#toa-do-thuc-tap .gia-tri-toa-do').show();
    $('#save-data-inter-ship').hide();
    $("#delete-data-inter-ship").show();
    $('#cancel-data-inter-ship').hide();
});

$("#save-data-tactic").click(function(){
    $.ajax({
        type: "POST",
        url: '/save/tactic',
        data: JSON.stringify(arrTactic),
        dataType : 'json',
        contentType : "application/json",
        beforeSend: function() {
            $('.ajax-loader').css("visibility", "visible");
        },
        success: function(response){
            if (response){
                $('.ajax-loader').css("visibility", "hidden");
                window.location.href = '/api/config';
            }
        }
    });
});

$("#save-data-inter-ship").click(function(){
    $.ajax({
        type: "POST",
        url: '/save/interShip',
        data: JSON.stringify(arrInterShip),
        dataType : 'json',
        contentType : "application/json",
        beforeSend: function() {
            $('.ajax-loader').css("visibility", "visible");
        },
        success: function(response){
            if (response){
                $('.ajax-loader').css("visibility", "hidden");
                window.location.href = '/api/config';
            }
        }
    });
});

$("#add-new-cannon").click(function(){
    $('.cannon-detail').hide();
    $('#cannon-input').show();
});

$("#addNewCannon").click(function(){
    var nameCannon = $('#cannon-name').val();
    var distanceInput = $('#cannon-distance').val();
    if (nameCannon == '') {
        alert('Bạn chưa nhập tên pháo.');
    }else if (!((!isNaN(distanceInput) && distanceInput.toString().indexOf('.') != -1) || (distanceInput % 1 === 0))) {
        alert('Dữ liệu bạn nhập chưa đúng.');
    } else if (distanceInput == '') {
        alert('Bạn chưa nhập cự ly.');
    } else {
        var request = {
            cannonName: nameCannon,
            distance: distanceInput
        };
        $.ajax({
            type: "POST",
            url: '/create/cannon',
            data: request,
            success: function(response){
                var nameCannon = $('#cannon-name').val('');
                var distanceInput = $('#cannon-distance').val('');
                $('.cannon-detail').show();
                $('#cannon-input').hide();
                loadCannon();
            }
        });
    }
});

$("#backDetail").click(function(){
    $('.cannon-detail').show();
    $('#cannon-input').hide();
});

function editCannon(cannonId){
     $.ajax({
         type: "GET",
         url: '/cannon/' + cannonId,
         success: function(response){
             $('#name-cannon').val(response.name);
             $('#distance-cannon').val(response.distance);
             $('#save-edit-info-cannon').click(function(){
                changeInfoCannon(cannonId);
             });
         }
     });
};

function deleteCannon(cannonId){
    var check = confirm("Bạn muốn xóa loại pháo?");
    if(check){
        $.ajax({
            type: "GET",
            url: '/cannon/delete/' + cannonId,
            success: function(response){
                if(response){
                    loadCannon();
                    alert('Xóa thành công!');
                }
            }
        });
    } else {
        return;
    }
};

function changeInfoCannon(cannonId){
    var nameCannon = $('#name-cannon').val();
    var distanceInput = $('#distance-cannon').val();
    if (nameCannon == '') {
        alert('Bạn chưa nhập tên pháo.');
    }else if (!((!isNaN(distanceInput) && distanceInput.toString().indexOf('.') != -1) || (distanceInput % 1 === 0))) {
        alert('Dữ liệu bạn nhập chưa đúng.');
    } else if (distanceInput == '') {
        alert('Bạn chưa nhập cự ly.');
    } else {
        var request = {
            id: cannonId,
            cannonName: nameCannon,
            distance: distanceInput
        };
        $.ajax({
            type: "POST",
            url: '/edit/cannon',
            data: request,
            success: function(response){
                $('#edit-cannon').modal('toggle');
                loadCannon();
            }
        });
    }
};

function showDistance(id){
    $.ajax({
        type: "GET",
        url: '/show/distance/' + id,
        success: function(response){
            $('#name-distance').val(response.name);
            $('#distance').val(response.distance);
            $('#id-distance').val(response.id);
        }
    });
}

function changeDistance(){
    var id = $('#id-distance').val();
    var distanceInput = $('#distance').val();

    if (!((!isNaN(distanceInput) && distanceInput.toString().indexOf('.') != -1) || (distanceInput % 1 === 0))) {
        alert('Dữ liệu bạn nhập chưa đúng.');
    } else if (distanceInput == '') {
        alert('Bạn chưa nhập cự ly.');
    } else {
        var request = {distance: distanceInput};
        $.ajax({
            type: "POST",
            url: '/change/distance/' + id,
            data: request,
            success: function(response){
                $('#distance-' + id).text(distanceInput + ' km');
                $('#edit-distance').modal('toggle');
            }
        });
    }
}

function loadSettingPlanDistance(){
    $.ajax({
        type: "GET",
        url: '/setting/plan',
        success: function(response){
            $('#setting-plan tbody').empty();
            $.each( response, function( index, value ) {
                var tr = document.createElement("tr");
                $(tr).attr('id', 'tr-setting-plan-' + value.id)
                var tdStt = document.createElement("td");
                $(tdStt).text(index + 1);
                var tdName = document.createElement("td");
                $(tdName).text(value.topPlan);
                var tdLimit = document.createElement("td");
                var labelLimit = document.createElement("label");
                $(labelLimit).text('từ: ' + value.planFrom + ' đến: ' + value.planTo);
                $(tdLimit).append(labelLimit);

                var tdColor = document.createElement("td");
                var divColor = document.createElement("div");
                $(divColor).attr('style', 'background:' + value.color)
                           .addClass('setting-plan mt-3');
                $(tdColor).append(divColor);

                var tdButton = document.createElement("td");
                var buttonEdit = document.createElement("button");
                $(buttonEdit).attr('type', 'button')
                             .attr('class', 'btn btn-primary')
                             .attr('data-toggle', 'modal')
                             .attr('data-backdrop', 'static')
                             .attr('data-keyboard', 'false')
                             .attr('data-target', '#edit-setting-plan')
                             .text('Sửa')
                             .attr('onclick', 'settingPlan(' + value.id + ')');
                $(tdButton).append(buttonEdit);
                $(tr).append(tdStt);
                $(tr).append(tdName);
                $(tr).append(tdLimit);
                $(tr).append(tdColor);
                $(tr).append(tdButton);
                $('#setting-plan tbody').append(tr);
            });
        }
    });
}

function settingPlan(id){
    $.ajax({
        type: "GET",
        url: '/show/plan/' + id,
        success: function(response){
            $('#id-setting-plan').val(id);
            $('#color-plan').attr('style', 'background:' + response.color);
            $('#top-plan-name').val(response.topPlan);
            $('#limit-from').val(response.planFrom);
            $('#limit-to').val(response.planTo);
        }
    });
}

function changeSettingPlan(id){
    var valueFrom = $('#limit-from').val();
    var valueTo = $('#limit-to').val();
    if (valueFrom == '' || valueTo == ''){
        alert('Bạn chưa nhập hết giá trị.');
    } else if (valueFrom >= valueTo) {
        alert('Giới hạn từ phải nhở hơn giới hạn đến.');
    } else {
        var request = {planFrom: valueFrom, planTo: valueTo};
        $.ajax({
            type: "POST",
            url: '/change/plan/' + id,
            data: request,
            success: function(response){
                if(response){
                    $('#tr-setting-plan-' + id + ' label').text('từ: ' + valueFrom + ' đến: ' + valueTo);
                    $('#edit-setting-plan').modal('toggle');
                }
            }
        });
    }
}

$("#save-setting-plan").click(function(){
    var id = $("#id-setting-plan").val();
    changeSettingPlan(id);
});

document.querySelector('input[type="file"]').addEventListener('change', function() {
    if (this.files && this.files[0]) {
        var fileName = this.files[0].name;
        var image = $('#mapImg');
        var buttonSaveMap = $('#saveMap');
        if(checkFileName(fileName)){
            var src = URL.createObjectURL(this.files[0]);
            image.show();
            buttonSaveMap.show();
            image.attr('src', src);
        } else {
            alert('Vui lòng tải lên file có định dạng JPG, JPEG, PNG, GIF và BMP');
            image.hide();
            buttonSaveMap.hide();
        }
    }
});

function checkFileName(file) {
    var extension = file.substr((file.lastIndexOf('.') + 1))
    if (extension === 'jpg' || extension === 'jpeg' || extension === 'gif' || extension === 'png' || extension === 'PNG') {
        return true;
    } else {
        return false;
    }
}

$("#show-popup-choose-maps").click(function(){
    $('#fileInput').val('');
    $('#mapImg').hide();
});

