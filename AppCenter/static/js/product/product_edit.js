/**
 * Created by zhangli on 2017/2/4.
 */


var vsku1 = $('#sku1').data('target');
$('#sku1').val(vsku1);
var vsku2 = $('#sku2').data('target');
$('#sku2').val(vsku2);
var vsku3 = $('#sku3').data('target');
$('#sku3').val(vsku3);

$('.freight_temp').each(
        function () {
            $(this).val($(this).data('target'));
        }
    );


function save_product() {
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
        "value": $('.sku1').find('select').find('option:selected').val(),
        "code": $('.sku1').find('select').find('option:selected').data('target')
    };
    }

    if ($('.sku2').find('label').html()){
        var sku2 = {
        "name": $('.sku2').find('label').html(),
        "value": $('.sku2').find('select').find('option:selected').val(),
        "code": $('.sku2').find('select').find('option:selected').data('target')
    };
    }

    if ($('.sku3').find('label').html()){
        var sku3 = {
        "name": $('.sku3').find('label').html(),
        "value": $('.sku3').find('select').find('option:selected').val(),
        "code": $('.sku3').find('select').find('option:selected').data('target')
    };
    }

    sku_dict['sku1']=sku1;
    sku_dict['sku2']=sku2;
    sku_dict['sku3']=sku3;

    var product_id = $('#code').data('target');

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
        url: '/adminlte/product/'+ product_id +'/edit',
        type: 'POST',
        data: s_data,
        success: function (result) {
            if (result.code == 0){
                window.location = '/adminlte/product?product_set_id='+ set_id;
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
