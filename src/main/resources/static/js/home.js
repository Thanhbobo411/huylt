$( document ).ready(function() {
    loadData();
});

$('#button-edit-content-brigade').click(function(){
    $('#content-brigade').hide();
    $('#block-edit-brigade').show();
});

$('#button-close-content-brigade').click(function(){
    $('#content-brigade').show();
    $('#block-edit-brigade').hide();
});

$('#button-edit-content-service-tactic').click(function(){
    $('#service-tactic').hide();
    $('#block-edit-service-tactic').show();
});

$('#button-close-service-tactic').click(function(){
    $('#service-tactic').show();
    $('#block-edit-service-tactic').hide();
});

$('#button-edit-content-service-interShip').click(function(){
    $('#service-interShip').hide();
    $('#block-edit-service-interShip').show();
});

$('#button-close-service-interShip').click(function(){
    $('#service-interShip').show();
    $('#block-edit-service-interShip').hide();
});

function loadData(){
    $.ajax({
        type: "GET",
        url: '/get/content/home',
        success: function(response){
            $('#content-brigade span').text(response.content);
            $('#service-tactic span').text(response.serviceTactic);
            $('#service-interShip span').text(response.serviceInterShip);
            $('#edit-content-brigade').val(response.content);
            $('#edit-service-tactic').val(response.serviceTactic);
            $('#edit-service-interShip').val(response.serviceInterShip);
        }
    });
}

$("#button-save-content-brigade").click(function(){
    var content = $('#edit-content-brigade').val();
    if (content != ''){
        if (content.length >= 5000){
            alert('Nội dung bạn nhập quá dài.(Nội dung không quá 5000 ký tự)');
        } else {
            $.ajax({
                type: "POST",
                url: '/save/content',
                dataType:"text",
                data: {content: content},
                success: function(response){
                    if (response){
                        alert('Lưu thành công.');
                        $('#content-brigade').show();
                        $('#block-edit-brigade').hide();
                        loadData();
                    }
                }
            });
        }
    } else {
        alert('Bạn chưa nhập nội dung.')
    }
});

$("#button-save-service-tactic").click(function(){
    var content = $('#edit-service-tactic').val();
    if (content != ''){
        if (content.length >= 2000){
            alert('Nội dung bạn nhập quá dài.(Nội dung không quá 2000 ký tự)');
        } else {
            $.ajax({
                type: "POST",
                url: '/save/content/tactic',
                dataType:"text",
                data: {content: content},
                success: function(response){
                    if (response){
                        alert('Lưu thành công.');
                        $('#service-tactic').show();
                        $('#block-edit-service-tactic').hide();
                        loadData();
                    }
                }
            });
        }
    } else {
        alert('Bạn chưa nhập nội dung.');
    }
});

$("#button-save-service-interShip").click(function(){
    var content = $('#edit-service-interShip').val();
    if (content != ''){
        if (content.length >= 2000){
            alert('Nội dung bạn nhập quá dài.(Nội dung không quá 2000 ký tự)');
        } else {
            $.ajax({
                type: "POST",
                url: '/save/content/interShip',
                dataType:"text",
                data: {content: content},
                success: function(response){
                    if (response){
                        alert('Lưu thành công.');
                        $('#service-interShip').show();
                        $('#block-edit-service-interShip').hide();
                        loadData();
                    }
                }
            });
        }
    } else {
        alert('Bạn chưa nhập nội dung.');
    }
});

