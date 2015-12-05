/* Функция закрывает по нажатие на кнопку модальное окно */
function bclose() {
	$(".pop-up").bPopup().close();
	return false;
}

/* Функция показывает модальное окно по нажатию на кнопку */
function bopen() {
	$('.pop-up').bPopup();
	return false;
}
