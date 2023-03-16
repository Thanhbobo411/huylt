document.querySelector("html").classList.add('js');

var fileInput  = document.querySelector( ".input-file" ),  
    button     = document.querySelector( ".input-file-trigger" ),
    the_return = document.querySelector(".file-return");
      
button.addEventListener( "keydown", function( event ) {  
    if ( event.keyCode == 13 || event.keyCode == 32 ) {  
        fileInput.focus();  
    }  
});
button.addEventListener( "click", function( event ) {
   fileInput.focus();
   return false;
});  
fileInput.addEventListener( "change", function( event ) {  
    the_return.innerHTML = this.value;  
});

$('#button-confirm-file').click(function(){
    var fileName = $('#my-file').val();
    if (fileName == '') {
        alert('Bạn chưa chọn file!');
    } else {
        var arr = fileName.split('.');
        if (arr[1] != 'xlsx'){
            alert('File nhập vào phải có định dạng .xlsx')
        } else {
            var flightId = $('#flight-id').val();
            var form = $('#form-import-data')[0];
            var formData = new FormData(form);
            $.ajax({
                url: '/import/data/' + flightId,
                data: formData,
                type: 'POST',
                contentType: false,
                processData: false,
                beforeSend: function() {
                    $('.ajax-loader').css("visibility", "visible");
                },
                success: function(response) {
                    $('.ajax-loader').css("visibility", "hidden");
                    if (response.statusImport == 0){
                        if (response.list.length > 0){
                            $('#flight-coordinate').show();
                            $('#import-data').hide();
                            $('#button-review-process').show();
                            $.each( response.list, function( index, value ) {
                                loadTableCoordinate(index, value);
                            });
                            var table = $('#detail-flight-table').DataTable();
                            configTableFlightDetail();
                        }
                    } else if (response.statusImport == 1){
                        alert('Bạn chưa nhập tên cột trong file excel.');
                    } else if (response.statusImport == 2){
                        alert('Số cột trong file excel chưa đúng (6 cột).')
                    } else {
                        alert('Tên cột trong file excel chưa đúng.')
                    }
                }
            });
        }
    }
});

$('#button-delete-data').click(function(){
    var check = confirm("Bạn có muốn xóa toàn bộ dữ liệu?");
    var flightId = $('#flight-id').val();
    if (check){
        $.ajax({
            url: '/delete/data/' + flightId,
            type: 'GET',
            success: function(response) {
                if (response){
                    console.log(response);
                    location.reload();
                }
            }
        });
    }
});

function loadTableCoordinate(index, value){
//    $('#end-process').show();
    var tr = document.createElement("tr");
    var tdStt = document.createElement("td");
    $(tdStt).text(index + 1);
    var tdTopSo = document.createElement("td");
    if (value.statusFirst){
        $(tdTopSo).text('XH ' + value.coordinateCode);
    } else {
        $(tdTopSo).text(value.coordinateCode);
    }

    var tdToaDo = document.createElement("td");
    $(tdToaDo).text(value.coordinate);
    var tdSoLuong = document.createElement("td");
    $(tdSoLuong).text(value.number);
    var tdType = document.createElement("td");
    $(tdType).text(value.type);
    var tdCaoDo = document.createElement("td");
    $(tdCaoDo).text(value.height);
    var tdTime = document.createElement("td");
    if (value.sttTime == 1) {
        $(tdTime).text(value.time);
    } else {
        $(tdTime).text('');
    }
    var tdNote = document.createElement("td");

    $(tr).append(tdStt);
    $(tr).append(tdTopSo);
    $(tr).append(tdToaDo);
    $(tr).append(tdSoLuong);
    $(tr).append(tdType);
    $(tr).append(tdCaoDo);
    $(tr).append(tdTime);
    $(tr).append(tdNote);
    $('#detail-flight-table tbody').append(tr);
}

function configTableFlightDetail(){
    $('#detail-flight-table_filter').addClass("form-inline mb-2");
    $('#detail-flight-table_filter input').addClass('form-control');
    $('#detail-flight-table_length').hide();
    $('.dataTables_empty').empty();
}