//Модуль работы с формой
var formValModul = (function($) {

    var init = function(idForm){//публичный метод
        _cnl("Инициализировали модуль formValModul");
        var form = $(idForm),
            inps = $(idForm+' .add-tooltip');

        _addToltips(inps);
        _bindForm(form);
    },
    validation = function(node){//Валидируем данные поля
        _cnl(node.data('valtype')+' || '+node.val());

        switch (node.data('valtype')) {
            case 'text': //проверка на текст
                  
                if(node.val() != '') {
                    return true;
                }
                 return false;

            break;

            case 'numb': //проверка на число
                var value = node.val();
                if (node.val() != '' && !isNaN(value) ) {
                    return true;
                }
                return false;
                    
            break;
            
             case 'url': // проверка на ссылку
             var url = node.val();
                var objRE = /(^https?:\/\/)?[a-z0-9~_\-\.]+\.[a-z]{2,9}(\/|:|\?[!-~]*)?$/i;
                return objRE.test(url);
                                 
            break;              
            
            case 'email'://проверка на Email
                if(node.val() != '') {
                var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
                if(pattern.test(node.val())){
                   //прошло валидацию
                   return true; 
                } else {
                    return false;
                  //не верно
                }
            } else {
                //пусто
                return false;

            }

            break;

        };
        return true;
        
    },
    resetForm = function(form){//очистка формы
      _errArr = [];
      for (var k = 0, arr = _arrObjTooltip.length; k < arr; k++) {
              if (_scrW) {
                _arrObjTooltipApi[k].toggle(false);
              };
                
                _arrObjTooltip[k].removeClass('error');
            }
    },
    _scrW = screen.width > 1000 ? true : false,
    _cnl = function(text){//отображение console.log
        var view = true;
        if (view) {console.log(text)};
    },
    _bindForm = function(form){//Устанавливаем события
       _cnl("Вешаем обработчики событий");

       //отменяем отправку формы при submit
       form.on('submit', function(event) {
           event.preventDefault();
           _cnl(_arrObjTooltip);
           _submitForm(form);
       });

       //прячим поля при вводе в него текста
       form.on("keyup paste input propertychange", ".add-tooltip",  function(event) {
            _cnl(this);
           _cnl('Добавили инфу в поле');
           $(this).removeClass('error');
           
       });
      
      //прячим информационные сообщения
      form.on('click', '.block-info-close', function(event) {
        $('.wrp-bl-info').hide('fast');
      });

      //очистка формы
      form.on('reset', function(event) {
        resetForm();
      });
          
    },
    _submitForm = function(form){//событие отправки формы
        _errArr = []; //очищаем предыдущии ошибки

           for (var i = 0, lt = _arrObjTooltip.length; i < lt; i++) {
               
               if (!validation(_arrObjTooltip[i])) {
                    _errArr.push(i);
               };
           };
           //Отображаем ошибки если они есть или отправляем форму
           _cnl('Ошибки в полях - '+_errArr);

           if (_errArr.length != 0) {
            for (var j = 0, err = _errArr.length; j < err; j++) {
              if (_scrW) {
                _arrObjTooltipApi[_errArr[j]].toggle(true);
              }
                _arrObjTooltip[_errArr[j]].addClass('error');
            }
           }else{
             _cnl('Отправляем форму');
                _sendForm(form);
           };
    },
   
    _errArr = [] //Массив с не прошедшими валидацию полями
    _arrObjTooltip = [],//Массив с элементами, которые должны валидироваться
    _arrObjTooltipApi = [],//Масив с элементами api Tooltip
    _addToltips = function(inps){//Добавляем тултипы к элементам формы
        _cnl(inps, 'показываем элементы с тултипами');//показываем элементы с тултипами

        inps.each(function() { //Добавляем тултипы к полям

            if ($(this).data('pos') === 'left') {
                var obj = $(this).qtip( $.extend({}, { 
                    content: {attr: 'data-errtxt'},
                    position: {my: 'center right', at: 'center left'},
                        style: {classes: 'toltip_st',tip: true},
                    events: {
                        show: function(event, api) {
                            if (event.originalEvent.type === 'mouseover') {
                                event.preventDefault(); // Stop it!
                            }
                        }
                    }
                }));
            }else{
                var obj = $(this).qtip( $.extend({}, { 
                    content: {attr: 'data-errtxt'},
                    position: {my: 'center left', at: 'center right'},
                        style: {classes: 'toltip_st',tip: true},
                    events: {
                        show: function(event, api) {
                            if (event.originalEvent.type === 'mouseover') {
                                event.preventDefault(); // Stop it!
                            }
                        }
                    }
                }));
            }

           _arrObjTooltip.push(obj);
           var api = obj.qtip('api');
           _arrObjTooltipApi.push(api);
         
            //api.toggle(true);
         }),
        _sendForm = function(form){// отправляем данные формы

            var data = form.serialize(),
                url = form.attr('action');
            _cnl('параметры отправки формы - '+data+' || '+url);

            if (data && url) {

               $.ajax({
                      url: url,
                      type: "POST",
                      data: data,
                      dataType: "JSON"
                      
                }).success(function(response){
                    _cnl(response);
                    form.find('.bl-success').show('fast');
                }).fail(function(response){
                    _cnl('error '+response);
                    form.find('.bl-error').show('fast');
                });
                
                
            };//end if

        };


        
        

    };

    return {
      init : init, 
      validation : validation, 
      resetForm : resetForm
    };
}(jQuery));




//Обновление информаци в поле добавления файла
var inputFileCustom = (function($) {
    

    var init = function(inp_file, inp_view){
        _cnl('Иницилизировали плагин  inputFileCustom');
        var inpFile = $(inp_file),
            inpText = $(inp_view);
        _bindChenge(inpFile, inpText);
    },
    _cnl = function(text){//отображение console.log
        var view = false;
        if (view) {console.log(text)};
    },
    _bindChenge = function(inpFile, inpText){
       inpFile.change(function(event) {
            _cnl($(this).val());
            inpText.val($(this).val());
        });
       inpText.on('click', function(event) {
           _cnl('inpFile click');
           inpFile.click();
       });
    };


    return {init : init};
}(jQuery));


