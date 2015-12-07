(function($){




$(document).ready(function() {

	if ($('#file-md-form') !== undefined) {//если есть форма с id #file-md-form
		formValModul.init('#file-md-form');//Передаём id формы
		inputFileCustom.init('#prj_img', '#prj_img_text');//передаём id инпута загрузки файлов и id инпута отображения имени этого файла
	};

});//end ready

})(jQuery);