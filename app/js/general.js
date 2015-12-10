/*Стили и добавление картинки*/
$(function(){
    var wrapper = $( ".file-upload" ),
        inp = wrapper.find( "input" ),
        btn = wrapper.find( ".button" ),
        lbl = wrapper.find( "mark" );

    var file_api = ( window.File && window.FileReader && window.FileList && window.Blob ) ? true : false;

    inp.change(function(){
        var file_name;
        if( file_api && inp[ 0 ].files[ 0 ] )
            file_name = inp[ 0 ].files[ 0 ].name;
        else
            file_name = inp.val().replace( "C:\\fakepath\\", '' );

        if( ! file_name.length )
            return;

        if( lbl.is( ":visible" ) ){
            lbl.text( file_name );
        }else
            inp.text( file_name );
    }).change();

});
$( window ).resize(function(){
    $( ".file-upload input" ).triggerHandler( "change" );
});

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
        };

        var _removeError = function(){
        $('input, textarea, mark').removeClass('error');
        };

        return{
        init: init
        };

    })();
   
popup.init();