
 /*----------TOOLTIPS-----------*/
var validation = (function(){

	var init = function(){
		_setUpListners();
	};

	var _setUpListners = function(){
		$('form').on('keydown', '.error', _removeError);
		$('form').on('reset', clearForm);
	};

			var _removeError = function(){
				$(this).removeClass('error');
			};
			
			/*-----Очистка формы контакты----*/
			var clearForm = function(form){
				var form = $(this);
				form.find('.login, .textarea, .email').trigger('hideTooltip');
				form.find('.error').removeClass('error');
			};

		var _createQtip = function(element, position){
					if(position === 'right'){
						position = {
							my:'left center',
							at:'right center'
						}
					}else{
						position = {
							my:'right center',
							at:'left center',
							adjust: {
								method: 'shift none'
							}
						}
					}
				element.qtip({
						content:{
							text: function(){
								return $(this).attr('qtip-content');
							}
						},
						show:{
							event:'show'
						},
						hide:{
							event:'keydown hideTooltip'
						},
						position:position,
						style:{
							classes: 'qtip-rounded',
							tip:{
								height:10,
								width:16
							}
						}
				}).trigger('show');

			};
			var validateForm = function(form){


				var elements = form.find('input, textarea, mark').not('input[type="file"]'),
				valid = true;

				$.each(elements, function(index, val){
				var element = $(val),
				val = element.val(),
				pos = element.attr('qtip-position');



				if(val.length === 0){
					element.addClass('error');
					_createQtip(element, pos);
					valid = false;
				}
				});
				return valid;
			};

			return{
				init: init,
				validateForm: validateForm,
			};
		})();
		validation.init();


/*Lобавление картинки*/
$(function(){
    var wrapper = $( ".file-upload" ),
        inp = wrapper.find( "input" ),
        lbl = wrapper.find( "mark" );

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    lbl.change(function(){

        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
        	inp.text( file_name ),
            lbl.text( file_name )
            
        }
    }).change();

});
// $( window ).resize(function(){
//     $( ".file-upload input" ).triggerHandler( "change" );
// });

/*POPUP*/

    var popup = (function(){
        var popup;
        $('.add').on('click', function(e){
            e.preventDefault();
            popup = $('.pop-up').bPopup({
            speed: 650,
            transition: 'slideDown',
            transitionClose: 'slideDown',
            modalColor:'#929181'
        });
        });

/*Закрыть POPUP*/

        $('.pop-up-close').on('click', function(e){
            popup.close();
        });

        var init = function(){
        _setUpListners();
        };

        var _setUpListners = function(){
        $('.pop-up-close').on('click', _removeError);
        $('.pop-up-close').on('click', clearForm);
        };

        var _removeError = function(){
        $('input, textarea, mark').removeClass('error');
        };

        var clearForm = function(){
        $('input, textarea, mark').trigger('hideTooltip');

        };
        
        return{
        init: init
        };

    })();
   
popup.init();

/*-----Плэйсхолдеры для ИЕ 8------*/

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
 							form.find('.error-message').text('Ошибка! Невозможно добавить проект').show();
 							if(!validation.validateForm(form)) return false;

 						};
 							return{
 								init:init
 							}
 })();

 contactMe.init();
