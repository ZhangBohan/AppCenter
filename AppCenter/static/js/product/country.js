/**
 * Created by zhangli on 2017/1/16.
 */


function save_country() {
    if($('#name').val() == ''){
        return alert('国家名称不能为空');
    }
    if($('#code').val() == ''){
        return alert('国家编码不能为空');
    }
    if($('#en_name').val() == ''){
        return alert('英文名字不能为空');
    }
    if($('#currency').val() == ''){
        return alert('货币单位不能为空');
    }

    var s_data = {
        'name': $('#name').val(),
        'code': $('#code').val(),
        'en_name': $('#en_name').val(),
        'currency': $('#currency').val()
    };
    console.log(s_data);
    $.ajax({
        url: '/adminlte/country/create',
        type: 'POST',
        data: s_data,
        success: function (result) {
            if (result.code == 0){
                window.location = '/adminlte/country';
            }else{
                alert(result.message);
            }

        }
    });
}


function save_edit_country() {
    if($('#name').val() == ''){
        return alert('国家名称不能为空');
    }
    if($('#code').val() == ''){
        return alert('国家编码不能为空');
    }
    if($('#en_name').val() == ''){
        return alert('英文名字不能为空');
    }
    if($('#currency').val() == ''){
        return alert('货币单位不能为空');
    }
    var country_id = $('#name').data('target');

    var s_data = {
        'name': $('#name').val(),
        'code': $('#code').val(),
        'en_name': $('#en_name').val(),
        'currency': $('#currency').val()
    };
    console.log(s_data);
    $.ajax({
        url: '/adminlte/country/'+ country_id + '/edit',
        type: 'POST',
        data: s_data,
        success: function (result) {
            if (result.code == 0){
                window.location = '/adminlte/country';
            }else{
                alert(result.message);
            }

        }
    });
}
