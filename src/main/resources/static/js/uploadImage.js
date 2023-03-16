$( document ).ready(function() {
    loadTableImage();
});

$('#saveMap').click(function(){
    var form = $('#form-import-data')[0];
    var formData = new FormData(form);
    $.ajax({
        url: '/import/image',
        data: formData,
        type: 'POST',
        contentType: false,
        processData: false,
        beforeSend: function() {
            $('.ajax-loader').css("visibility", "visible");
        },
        success: function(response) {
            loadTableImage();
            $('#popup-upload-image').modal('toggle');
            $('.ajax-loader').css("visibility", "hidden");
            $('#show-image').append('<img alt="" src="' + response + '">');
        }
    });
});

function loadTableImage(){
    $.ajax({
        type: "GET",
        url: '/images',
        success: function(response){
            var table = $('#table-map-image');
            $('#table-map-image tbody').empty();
            $.each( response, function( index, value ) {
                var tr = document.createElement("tr");
                var stt = document.createElement("td");
                $(stt).text(index + 1);
                var name = document.createElement("td");
                $(name).text(value.name);
                var tdImage = document.createElement("td");
                var image = document.createElement("img");
                $(image).attr('src', value.url);
                $(tdImage).append(image);

                var blockButton = document.createElement("td");
                var buttonEdit = document.createElement("button");
                var buttonDelete = document.createElement("button");
                $(buttonDelete).attr('type', 'button')
                            .attr('class', 'btn btn-danger m-l-10')
                            .attr('onclick', 'deleteImage(' + value.id + ')')
                            .text('Xóa');

                $(blockButton).append(buttonDelete);
                $(tr).append(stt);
                $(tr).append(name);
                $(tr).append(tdImage);
                $(tr).append(blockButton);
                $(table).append(tr);
            });
        }
    });
}

function deleteImage(id){
    $.ajax({
        type: "GET",
        url: '/delete/image/' + id,
        success: function(response){
            if (response){
                loadTableImage();
                alert('Xóa thành công!');
            }
        }
    });
}
