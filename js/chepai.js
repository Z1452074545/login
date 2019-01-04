$(function () {
	var num = 6; //需要输入的车牌数


	// 点击but_x 关闭
	$('.but_X').on('click', function () {
		$('#mode_car_mark').css('display', 'none');
	})

	//切换键盘
	$('.changeContentBtn').click(function () {
		if ($(this).html() == 'ABC') {
			$('#textBox').show();
			$('#provienceBox').hide();
		} else {
			$('#textBox').hide();
			$('#provienceBox').show();
		}
	})
	//新能源点击事件
	$('.xinnengyuan').click(function () {
		num = 7;
		$(this).removeClass('xinnengyuan');
	})
	//获取当前车牌数字索引
	function getIndex() {
		var index = 0;
		$('.carLicenseMain ul li').each(function () {
			var reg = new RegExp('active');
			if (reg.test($(this).attr('class'))) {
				index = $(this).index();
			}
		})
		return index;
	}
	//自定义键盘处理函数
	function keyboard(num, self) {
		var index = getIndex();
		if (index == 1 && ($(self).html()) < 10) {
			user_hint('车牌第二位为字母')
			return
		}
		if (index <= num) {
			if (index == num) {
				$('.carLicenseMain ul li.active').html($(self).html());
			} else {
				$('.carLicenseMain ul li.active').html($(self).html()).removeClass('active').next().addClass('active');
			}
			$('#textBox').show();
			$('#provienceBox').hide();
		}
	}
	//省份键盘点击事件
	$('#provienceBox ul li:not(.other)').click(function () {
		var self = this;
		keyboard(num, self);
	})
	//文本键盘点击事件
	$('#textBox ul li:not(.other)').click(function () {
		var self = this;
		keyboard(num, self);
	})
	//回退按钮点击事件
	$('.deleteBtn').click(function () {
		var index = getIndex();
		if (index == 0 || index == 1) {
			$('#textBox').hide();
			$('#provienceBox').show();
		}
		if (index == num) {
			if ($('.carLicenseMain ul li.active').html() != '') {
				$('.carLicenseMain ul li.active').html('');
			} else {
				if (index == 7) {
					$('.carLicenseMain ul li:last-of-type').addClass('xinnengyuan');
					num = 6;
				}
				$('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('');
			}

		} else if (index < num && index > 1) {
			$('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('');
		} else if (index == 1) {
			$('.carLicenseMain ul li.active').removeClass('active').prev().addClass('active').html('省');
		}
	})

	//提交按钮点击事件
	$('#submitBtn').click(function () {

		var str = '';
		for (var i = 0; i < 8; i++) {
			str += $('.carLicenseMain').find('li').eq(i).text();
		}
		// console.log(str)
		if (str.length < 7) {
			user_hint('输入正确的车牌')
			return;
		} else {
			var car_mark = str;
			// console.log(car_mark);
			$('.car_mark').html(car_mark);
			$('.car_mark').removeClass('col_grey');
			$('#mode_car_mark').css('display', 'none');
		}
	})
	//选中车牌
	$('.carLicenseMain').on('click', 'li', function (event) {
		$(this).siblings().removeClass("active");
		$(this).addClass('active');
		// console.log($(this).index());
		if ($(this).index() != 0) {
			$('#textBox').show();
			$('#provienceBox').hide();
		} else {
			$('#textBox').hide();
			$('#provienceBox').show();
		}
	});
})
// hint 
//user_hint:
function user_hint(txt) {
	$('.lay_hint').empty();
	$('.lay_hint').html(txt);
	$('.lay_hint').css('display', 'block');
	setTimeout(function () {
		$('.lay_hint').css('display', 'none');
	}, 2000)

}