var validation = (function() {

/*-----Старт setUpListeners------*/ 
	var init = function() {
		_setUpListeners();
	};

/*-----Прослушка-----*/
	var _setUpListeners = function() {
		$('#forms').on('keydown', '.error', _removeError);
		$('#forms').on('reset', _clearForm);
	};

/*------Убираем тултипы и клас error при очистке формы-----*/
	var _clearForm = function (form) {
		var form = $(this);
		form.find('.validate').trigger('hideTooltip').removeClass('error');
	};

/*------Убираем класс error-----*/
	var _removeError = function () {
		$(this).removeClass('error');
	};

/*------Создаём тултипы------*/
	var _createQtip = function (element, position) {
		if (position === 'right') {
			position = {
				my: 'left center',
				at: 'right center'
			}
		}else{
			position = {
				my: 'right center',
				at: 'left center',
				adjust: {
					method: 'shift none'
				}
			}
		}

/*------Добавляем тултипы. Стили взяты из css qtip-----*/
		element.qtip({
			content: {
				text: function() {
					return $(this).attr('qtip-content');
				}
			},
			show: {
				event: 'show'
			},
			hide: {
				event: 'keydown onchange hideTooltip',
			},
			position: position,
			style: {
				classes: 'qtip-rounded',
				tip: {
					height:10,
					width: 16
				}
			}
		}).trigger('show');
	};

/*-------Валидируем формы------*/
	var validateForm = function (form) {

		var elements = form.find('.validate'),
		valid = true;

		$.each(elements, function(index, val) {
			var element = $(val),
				val = element.val(),
				pos = element.attr("qtip-position");

			if (val.length === 0) {
				element.addClass('error');
				_createQtip(element, pos);
				valid = false;
			}
		});

		return valid;

	};

	return {
		init: init,
		validateForm: validateForm
	};
})();

validation.init();

/*-----Поп-ап и загрузка файлов------*/

var app = (function() {

/*-----Старт setUpListeners------*/ 
	var init = function() {
		_setUpListeners();
	};

/*-----Прослушка-----*/
	var _setUpListeners = function() { 
		$('.add').on('click', _showModal); // Открываем поп-ап
		$('#forms').on('submit', _addProject); // Кнопка добавить проект
		$('#file-p').on('change', _showPath); // Показываем путь для загрузки файлов
	};

/*------Загрузка файла-----*/
	var _showPath = function(e) {
		e.preventDefault();
		
		var filename = $("#filename"),
			path = $("#file-p").val().replace(/\\/g, '/').replace(/.*\//, '');
		
		filename.val(path); 

		if (filename.hasClass('error')) {
			filename.removeClass("error");
			filename.qtip('hide');
		}
	};

/*------Открываем и закрываем поп-ап------*/
	var _showModal = function(e) { 
		e.preventDefault();

		$('.pop-up').bPopup({
			speed: 450,
			transition: 'slideDown',
			transitionClose: 'fadeIn',
			onClose: function() {
				$('#forms').trigger("reset");
			}
		});
	};
	
/*-----Плэйсхолдеры для ИЕ 8------*/

 $(document).ready(function(){

            $('input[placeholder], textarea[placeholder]').placeholder();
        
 });

/*-----Отправляем проект-----*/
	var _addProject = function(e) { 
		e.preventDefault();

		var form = $(this),
			url = "",
			defObj = _ajaxForm(form, url);

		if (defObj) {
			defObj.done(function(ans) {

				var errorBox = form.find('#error');

				if(ans.msg == 'OK') {
					errorBox.hide();
					successBox.show();
				}else {
					successBox.hide();
					errorBox.show();
				}
			})
		}
	};

	var _ajaxForm = function (form, url) { 
		
		if (!validation.validateForm(form)) {
			form.find('.error-message').show();
		}else{
			$('.pop-up').bPopup().close(),
			$('.success-message').bPopup({
			speed: 450,
			transition: 'slideDown'
		});
		};


	};


	return {
		init: init,
	};

})();

app.init();

/*----Закрыть блок error---*/
var _errrorMes = $('#error');

$('.close-message').click(function(event){
	event.preventDefault();
    _errrorMes.hide()
});