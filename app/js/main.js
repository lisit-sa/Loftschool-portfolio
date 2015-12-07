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

var close = document.querySelector(".pop-up-close");
var popup = document.querySelector(".pop-up");

      link.addEventListener("click", function(event) 
      {
        event.preventDefault();
        popup.classList.add("write-us-show");
      login.focus();
      if (storage) {
        login.value = storage;
        e-mail.focus();
      } else {
        login.focus();
      }


      });
      close.addEventListener("click", function(event) {
        event.preventDefault();
        popup.classList.remove("write-us-show");
        popup.classList.remove("write-error");
      });