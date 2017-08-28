/**
 * Created by zhangli on 2017/1/18.
 */


function save_product(redirect) {
    var set_id = getQueryString('product_set_id');
    redirect = typeof redirect !=='undefined'? redirect : '/adminlte/product';
    var redirectUrl = redirect+'?product_set_id='+set_id;
    var code = $("#code").val();
    if (code == ''){
        alert('商品编号不能为空');
        return false;
    }
    var set_id = $("#product_set").val();
    if (set_id == ''){
        alert('商品集不能为空');
        return false;
    }
    var europe = $("#europe").val();
    if (europe == ''){
        alert('欧洲仓不能为空');
        return false;
    }
    var america = $("#america").val();
    if (america == ''){
        alert('美国仓不能为空');
        return false;
    }
    var china_out = $("#china_out").val();
    if (china_out == ''){
        alert('中国外销仓不能为空');
        return false;
    }
    var china_in = $("#china_in").val();
    if (china_in == ''){
        alert('中国内销仓不能为空');
        return false;
    }

    var appointment = document.getElementById("appointment").checked;
    var banner_list_val = [];
    var banner_list = $("input[name='banner_list']");
    for (var i = 0; i < banner_list.length; i++) {
        var banner = $(banner_list[i]);
        banner_list_val.push(banner.val());
    }

    //检查官方价格比实际价格要大
    var all_products_price = $('.countries-price');
    for(var s=0; s<all_products_price.length; s++){
        var off_price = all_products_price[s].getElementsByClassName('official_price')[0].value;
        var pro_price = all_products_price[s].getElementsByClassName('product_price')[0].value;
        if (pro_price != "" && parseFloat(off_price) != 0.0 && parseFloat(off_price) <= parseFloat(pro_price)){
            alert("官方价格要大于售卖价格");
            return false
        }
    }

    var countries_price = [];
    $('.countries-price').each(
        function () {
            var product_price = $(this).find("input[class='product_price']").val();
            if(product_price != ""){
                countries_price.push({"price": product_price,
                    "country_id": $(this).find("input[class='product_price']").attr('data-target'),
                    "temp_id": $(this).find('select').find('option:selected').val(),
                    "official_price": $(this).find("input[class='official_price']").val()
                })
            }
        }
    );

    var sku_dict = {};
    var sku1 = {};
    var sku2 = {};
    var sku3 = {};
    if ($('.sku1').find('label').html()){
        var sku1 = {
        "name": $('.sku1').find('label').html(),
        "value": $('.sku1').find('select').find('option:selected').html(),
        "code": $('.sku1').find('select').find('option:selected').val()
    };
    }

    if ($('.sku2').find('label').html()){
        var sku2 = {
        "name": $('.sku2').find('label').html(),
        "value": $('.sku2').find('select').find('option:selected').html(),
        "code": $('.sku2').find('select').find('option:selected').val()
    };
    }

    if ($('.sku3').find('label').html()){
        var sku3 = {
        "name": $('.sku3').find('label').html(),
        "value": $('.sku3').find('select').find('option:selected').html(),
        "code": $('.sku3').find('select').find('option:selected').val()
    };
    }

    sku_dict['sku1']=sku1;
    sku_dict['sku2']=sku2;
    sku_dict['sku3']=sku3;

    var s_data = {
        "code": code,
        "product_set": set_id,
        "europe": europe,
        "america": america,
        "china_out": china_out,
        "china_in": china_in,
        "sku": JSON.stringify(sku_dict),
        "countries_price": JSON.stringify(countries_price),
        "remark": $("#remark").val(),
        "banner_list": JSON.stringify(banner_list_val),
        "appointment": appointment
    };

    $.ajax({
        url: '/adminlte/product/create',
        type: 'POST',
        data: s_data,
        success: function (result) {
            if (result.code == 0){
                window.location = redirectUrl;
            }else{
                if (result.code == 10032){
                    alert(result.message.code);
                }else {
                    alert(result.message);
                }
            }

        }
    });
}


function save_next_product(){
    save_product('/adminlte/product/create')
}

function getQueryString(name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return decodeURI(r[2]); return null;
   }


function change_status(e) {
    // 商品的上下架
    var id = e.getAttribute('id');
    var state = e.getAttribute('data-target');
    $.ajax({
        url: '/adminlte/product/'+ id +'/status',
        type: 'POST',
        data: {"state": state},
        success: function (result) {
            if (result.code == 0){
                window.location.reload();
            }else{
                alert(result.message);
            }
        }
    });
}


function change_appointment(e) {
    // 商品的预约和取约
    var id = e.getAttribute('id');
    var appointment = e.getAttribute('data-target');
    $.ajax({
        url: '/adminlte/product/'+ id +'/appointment',
        type: 'POST',
        data: {"appointment": appointment},
        success: function (result) {
            if (result.code == 0){
                window.location.reload();
            }else{
                alert(result.message);
            }
        }
    });
}


function delete_product(id) {
    // 删除商品（修改商品的状态）
    $.ajax({
        url: '/adminlte/product/'+ id +'/status',
        type: 'POST',
        data: {"state": 2},
        success: function (result) {
            if (result.code == 0){
                window.location.reload();
            }else{
                alert(result.message);
            }
        }
    });
}


function display_counties_price(e) {
    $(".dialog").show();
    var product_id = e.getAttribute('data-target');
    var table_html = '<tr><th>国家</th><th>官方价格</th><th>价格</th><th>货币单位</th><th>所属仓库</th><th>库存</th><th>运费模板</th></tr>';
    $.ajax({
        url: '/adminlte/product/'+ product_id +'/price',
        type: 'GET',
        data: {},
        success: function (result) {
            if (result.code == 0){
                var re_data = result.message;
                for (var m=0; m<re_data.length; m++){
                    if (re_data[m]['storage'] > 0 ){
                        table_html += '<tr><th>'+ re_data[m]['country_name'] +'</th><th>'+ re_data[m]['official_price'] +'</th><th>'+ re_data[m]['price'] +'</th><th>'+ re_data[m]['currency'] +'</th><th>'+ re_data[m]['warehouse'] +'</th><th>'+ re_data[m]['storage'] +'</th><th>'+ re_data[m]['temp'] +'</th></tr>';
                    }else{
                        table_html += '<tr><th>'+ re_data[m]['country_name'] +'</th><th>'+ re_data[m]['official_price'] +'</th><th>'+ re_data[m]['price'] +'</th><th>'+ re_data[m]['currency'] +'</th><th>'+ re_data[m]['warehouse'] +'</th><th><font color="red">'+ re_data[m]['storage'] +'</font></th><th>'+ re_data[m]['temp'] +'</th></tr>';
                    }
                }
                $('#table_show').html(table_html);
            }else{
                alert(result.message);
            }
        }
    });
}


function close_dialog() {
    $('.dialog').css('display','none');
}


function set_delete(id) {
    $.ajax({
        url: '/adminlte/product/sets/'+ id +'/delete',
        type: 'POST',
        data: {},
        success: function (result) {
            if (result.code == 0){
                window.location.reload();
            }else{
                alert(result.message);
            }
        }
    });
}


function select_all(){
    // 全选
    var select_status = document.getElementById("products").checked;

    var all_products = $('.product');
    for(var m=0; m<all_products.length; m++){
        all_products[m].checked = select_status;
    }
}


function change_on_products() {
    // 全选上架
    var product_ids = "";
    var all_products = $('.product');
    for(var m=0; m<all_products.length; m++){
        if(all_products[m].checked == true) {
            var product_id = all_products[m].getAttribute('data-target');
            product_ids = product_ids + product_id + ','
        }
    }

    if (product_ids == ""){
        return
    }

    $.ajax({
        url: '/adminlte/product/batch/status',
        type: 'POST',
        data: {"product_ids": product_ids, "flag": "on"},
        success: function (result) {
            if (result.code == 0){
                window.location.reload();
            }else{
                alert(result.message);
            }
        }
    });
}


function change_off_products() {
    // 全选下架
    var product_ids = "";
    var all_products = $('.product');
    for(var m=0; m<all_products.length; m++){
        if(all_products[m].checked == true) {
            var product_id = all_products[m].getAttribute('data-target');
            product_ids = product_ids + product_id + ','
        }
    }

    if (product_ids == ""){
        return
    }

    $.ajax({
        url: '/adminlte/product/batch/status',
        type: 'POST',
        data: {"product_ids": product_ids, "flag": "off"},
        success: function (result) {
            if (result.code == 0){
                window.location.reload();
            }else{
                alert(result.message);
            }
        }
    });
}


function change_delete_products() {
    // 全选删除
    var product_ids = "";
    var all_products = $('.product');
    for(var m=0; m<all_products.length; m++){
        if(all_products[m].checked == true){
            var product_id = all_products[m].getAttribute('data-target');
            product_ids = product_ids + product_id +','
        }
    }

    if (product_ids == ""){
        return
    }
    $.ajax({
        url: '/adminlte/product/batch/delete',
        type: 'POST',
        data: {"product_ids": product_ids},
        success: function (result) {
            if (result.code == 0){
                window.location.reload();
                var all_products = $('.product');
                for(var m=0; m<all_products.length; m++){
                    all_products[m].checked = false;
                }
            }else{
                alert(result.message);
            }
        }
    });
}


function change_appointment_products(flag) {
    // 预约和取约
    var product_ids = "";
    var all_products = $('.product');
    for(var m=0; m<all_products.length; m++){
        if(all_products[m].checked == true) {
            var product_id = all_products[m].getAttribute('data-target');
            product_ids = product_ids + product_id + ','
        }
    }

    if (product_ids == ""){
        return
    }

    $.ajax({
        url: '/adminlte/product/appointment',
        type: 'POST',
        data: {"product_ids": product_ids, "flag": flag},
        success: function (result) {
            if (result.code == 0){
                window.location.reload();
            }else{
                alert(result.message);
            }
        }
    });
}
