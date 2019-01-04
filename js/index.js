$(function () {
    // 显示车牌号弹窗
    $('.car_mark').on('click', function () {
        $('#mode_car_mark').css('display', 'block');
    })
    var msg = {} //用户信息
    // 获取验证码
    $('.get_code').on('click', function () {
        msg.car_mark = $('.car_mark').text();
        msg.phone = $('.inp_phone input').val();
        if (msg.car_mark.length < 4) {
            user_hint('请输入车牌号');
        } else if (!(/^1[34578]\d{9}$/.test(msg.phone))) {
            user_hint('手机号错误，请重新输入');
        } else {
            console.log(msg);
            settime('.get_code');
            user_hint('验证码：1234');
        }

    })
    //点击登录
    $('.but_login').on('click',function(){
        console.log(msg);
        var code=1234;
        msg.code=$('.inp_code input').val();
        if(msg.code==code){
            console.log('登录成功');
            // user_hint('登录成功');
            $('.succeed_pop').css('display','block')
            setTimeout(function () {
                $('.succeed_pop').css('display','none')
            }, 2000)
            
        }else{
            user_hint('验证码错误');
        }
    })
    var countdown = 60;
    function settime(obj) {
        if (countdown == 0) {
            $(obj).css("pointer-events", "auto");
            $(obj).text("获取验证码");
            countdown = 60;
            return;
        } else {
            $(obj).css("pointer-events", "none");
            $(obj).text(countdown +'s'+'后重发');
            countdown--;
        }
        setTimeout(function () {
            settime(obj)
        }, 1000)
    }

})