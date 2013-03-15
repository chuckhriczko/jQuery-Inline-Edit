jQuery-Inline-Edit
==================

Plugin for jQuery that converts text to an editable field. Support is included for Ajax to allow for seamless, instant form editing

Parameters:
ajaxUrl
Default Value: Empty string
If this is set to anything but a blank string (such as a URL), on blur an ajax request will be issued

ajaxMethod
Default Value: post
Can be either post or get            

ajaxData
Default Value: Empty string
Extra data to be passed in Ajax request. Formed like, 'string1=astring&string2=secondstring'

ajaxCallback
Default Value: null
If this is not null, it will be called after the ajax request completes

elementType
Default Value: input
Can be either input or textarea

sendOnEnter
Default Value: true
Determines whether or not to make the enter key act like you clicked off the box (Boolean)

width
Default Value: '157px'
Simply, the width of the textbox

Example:

var ajaxUrl = '/ajax.php';
var ajaxData = 'id=1';
var $content = $('body.personal #content'); //Save the jQuery object for the content area for caching purposes

//Init the inlineEdit plugin for the input[type=text] inputs
$content.find('.inline-edit').inlineEdit({
   ajaxUrl: ajaxUrl,
   ajaxData: ajaxData,
   ajaxCallback: function(response){
      alert(response);
   }
});

//Init the inlineEdit plugin for the textarea inputs
$content.find('.inline-edit-textarea').inlineEdit({
   ajaxUrl: ajaxUrl,
   ajaxData: ajaxData,
   ajaxCallback: function(resp){
      alert(response);
   },
   elementType: 'textarea',
   width: '515px',
   sendOnEnter: false
});