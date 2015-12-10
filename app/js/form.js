
 $(document).ready(function(){

            $('input[placeholder], textarea[placeholder]').placeholder();
        
 });
/*----------Валидация формы----------*/
 var contactMe = (function(){

 	var init = function(){
 		_setUpListners();
 	};

 					var _setUpListners = function (){
 						$('#forms').on('submit', _submitForm);
 					};

 					var _submitForm = function(e){
 						e.preventDefault();

 							var form = $(this),
 							url = 'contacts.php',
 							defObj = _ajaxForm(form, url);
 					};

 						var _ajaxForm = function(form, url){
 							if(!validation.validateForm(form)) return false;
 						};
 							return{
 								init:init
 							}
 })();

 contactMe.init();
