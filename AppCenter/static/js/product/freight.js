/**
 * Created by zhangli on 2017/1/17.
 */


// 保存运费模板
function save_freight() {
    var name = $("#name").val();
    var count = $("#count").val();

    if(name == ''){
        return alert('模板名称不能为空');
    }
    if(parseInt(count) < 1){
        return alert('购买产品数量应大于0');
    }

    var price_list = [];
    $('.freight_price').each(
        function(){
            price_list.push({"country_id": $(this).attr('data-target'), "price": $(this).val()})
        });

    var s_data = {
        "name": name,
        "count": count,
        "remark": $("#remark").val(),
        "countries_price": JSON.stringify(price_list)
    };

    $.ajax({
        url: '/adminlte/freight/create',
        type: 'POST',
        data: s_data,
        success: function (result) {
            if (result.code == 0){
                window.location = '/adminlte/freight';
            }else{
                alert(result.message);
            }

        }
    });
}


// 删除运费模板
function freight_delete(id) {
    $.ajax({
        url: '/adminlte/freight/'+ id +'/delete',
        type: 'POST',
        data: '',
        success: function (result) {
            if (result.code == 0){
                window.location.reload();
            }else{
                alert('删除失败');
            }
        }
    });
}


// 保存编辑运费模板
function save_edit_freight() {
    var freight_id = $("#name").data('target');
    var name = $("#name").val();
    var count = $("#count").val();

    if(name == ''){
        return alert('模板名称不能为空');
    }
    if(parseInt(count) < 1){
        return alert('购买产品数量应大于0');
    }

    var price_list = [];
    $('.freight_price').each(
        function(){
            price_list.push({"country_id": $(this).attr('data-target'), "price": $(this).val()})
        });

    var s_data = {
        "name": name,
        "count": count,
        "remark": $("#remark").val(),
        "countries_price": JSON.stringify(price_list)
    };

    $.ajax({
        url: '/adminlte/freight/'+ freight_id +'/edit',
        type: 'POST',
        data: s_data,
        success: function (result) {
            if (result.code == 0){
                window.location = '/adminlte/freight';
            }else{
                alert(result.message);
            }

        }
    });
}
