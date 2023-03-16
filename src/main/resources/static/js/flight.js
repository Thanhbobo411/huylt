$( document ).ready(function() {
    loadAllFlight();
});

function loadAllFlight(){
    $.ajax({
        type: "GET",
        url: '/flight/all',
        success: function(response){
            $('#flight-table tbody').empty();
            $.each( response, function( index, value ) {
                var tr = document.createElement("tr");
                var tdStt = document.createElement("td");
                $(tdStt).text(index + 1);
                var tdName = document.createElement("td");
                $(tdName).text(value.flightName);
                var tdType = document.createElement("td");
                if(value.type == 1){
                    $(tdType).text('Chế độ tác chiến');
                } else {
                    $(tdType).text('Chế độ luyện tập');
                }
                var tdDate = document.createElement("td");
                $(tdDate).text(value.createdAt);

                var tdButton = document.createElement("td");
                var button = document.createElement("button");
                $(button).attr('type','button')
                         .addClass('btn btn-primary')
                         .attr('onclick', 'detailFlight(' + value.id + ')')
                         .text('Chi tiết');
                $(tdButton).append(button);

                var buttonDelete = document.createElement("button");
                $(buttonDelete).attr('type','button')
                         .addClass('btn btn-danger ml-2')
                         .attr('onclick', 'deleteFlight(' + value.id + ')')
                         .text('Xóa');
                if (value.statusSetup) {
                    var buttonEdit = document.createElement("button");
                    $(buttonEdit).attr('type','button')
                              .addClass('btn btn-primary ml-2')
                              .attr('onclick', 'editFlight(' + value.id + ')')
                              .text('Sửa cấu hình');
                    $(tdButton).append(buttonEdit);
                }
                $(tdButton).append(buttonDelete);
                $(tr).append(tdStt);
                $(tr).append(tdName);
                $(tr).append(tdType);
                $(tr).append(tdDate);
                $(tr).append(tdButton);
                $('#flight-table tbody').append(tr);
            });
            $('#flight-table').DataTable();
            configTableFlight();
        }
    });
}

function deleteFlight(flightId){
    var check = confirm("Bạn có muốn xóa bài tập này?");
    if (check){
        $.ajax({
            type: "GET",
            url: '/delete/flight/' + flightId,
            success: function(response){
                if (response){
                    loadAllFlight();
                }
            }
        });
    }
}

function configTableFlight(){
    $('#flight-table_filter').addClass("form-inline mb-2");
    $('#flight-table_filter input').addClass('form-control');
    $('#flight-table_length').hide();
    $('#flight-table_info').hide();
}

$("#button-add-plant-process-interShip").click(function(){
	    var name = $('#plant-process-input').val();
	    var chedo = $('#plant-process-input').val();
	    if(name == ''){
	        alert('Vui lòng nhập tên chu trình bay.');
	    } else if($('#status-interShip').is(':checked') || $('#status-tactic').is(':checked')){
	        $('.close').trigger('click');
            $.get( "/create/process", {plantName: name, type: 2} )
                .done(function( data ) {
                    loadAllFlight();
                });
	    } else {
	        alert('Vui lòng chọn chế độ.')
	    }
    });

function detailFlight(id){
    window.location.href = '/api/interShip/' + id;
}

function editFlight(id){
    window.location.href = '/api/interShip/edit/' + id;
}

$('#plant-process-input').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == 13) {
        $("#button-add-plant-process-interShip").trigger( "click" );
    }
});
