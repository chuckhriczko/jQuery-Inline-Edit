(function($){
   $.fn.extend({
      inlineEdit: function(options) {
         //Set the default values
         var defaults = {
            //If this is set to anything but a blank string, on blur of the
            //textbox, an ajax request will be issued, either posting or getting the data
            ajaxUrl: '',
            ajaxMethod: 'post', //Can be either post or get
            ajaxData: '', //Extra data to be passed in Ajax request. Formed like, 'string1=astring&string2=secondstring'
            ajaxCallback: null, //If this is not null, it will be called after the ajax request completes
            elementType: 'input', //Can be either input or textarea
            sendOnEnter: true, //Determines whether or not to make the enter key act like you clicked off the box
            width: '157px' //Simply, the width of the textbox
         }
          
         var options =  $.extend(defaults, options);
         
         return this.each(function(index) {
            var o = options;
            var obj = this;
            
            //Decide which element to create
            var elString = '';
            if (o.elementType=='input'){
               elString = '<input type="text" id="txt-inline-edit-' + o.elementType + index + '" value="' + $(this).text() + '" />';
            } else {
               elString = '<textarea id="txt-inline-edit-' + o.elementType + index + '">' + $(this).text() + '</textarea>';
            }
            
            //Initialize the textbox and insert it into the document
            $(elString).addClass('txt-inline-edit').css({ display: 'none', width: o.width }).blur(function(){
               var labelText = $(this).val();
               var dbField = $(obj).data('dbField');
               
               //Hide the textbox on blur, set the label's text and show the label
               $(this).hide();
               $(obj).text(labelText).css({ display: 'inline-block' });
               
               //If we have extra data to pass, add an ampersand to it
               //so it can be added to the existing data string
               if (o.ajaxData!='') o.ajaxData = '&' + o.ajaxData;
               
               //If the ajax url is set, issue an ajax request
               if (o.ajaxUrl!=''){
                  $.ajax({
                     url: o.ajaxUrl,
                     type: o.ajaxMethod,
                     data: 'labelText=' + labelText + '&dbField=' + dbField + o.ajaxData,
                     success: function(resp){
                        //If the callback exists, call it and pass the response with it
                        console.log(resp);
                        if (typeof o.ajaxCallback=='function') o.ajaxCallback(resp);
                     }
                  });
               }
            }).insertAfter($(this)).keyup(function(e){
               if (o.sendOnEnter){
                  if(e.keyCode == 13) $(this).trigger('blur'); //Add enter key functionality
               }
            });
            
            //Initialize the label
            $(this).css({ cursor: 'pointer' }).click(function(){
               var $textbox = $(this).next(o.elementType + '.txt-inline-edit');
               
               //Hide the label, set the textbox's text, show it and give it focus.
               //NOTE: Giving focus is important as without it the blur functionality
               //doesn't function properly and things get wonky... that's right... wonky
               $(this).hide();
               $textbox.val($(this).text()).css({ display: 'block' }).focus();
            });
         });
      }
   });
})(jQuery);