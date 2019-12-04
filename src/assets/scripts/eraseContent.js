export function eraseContent() {
    $('.new-list-item-box').on( "click", ".new-list-item", function() {
        console.log('erase');
        $(this).html('');
    });
    $('#new-list-title').on('click', function(){
        $(this).html('');
    });
    $('.items').on('click', '.list-title', function(){
      $(this).html('');
      $('#save-warning').css('display', 'block');
      $('#save-item-changes').css('display', 'block');
      $('.list-item-box').addClass('list-item-box-edit');
    });
  }
