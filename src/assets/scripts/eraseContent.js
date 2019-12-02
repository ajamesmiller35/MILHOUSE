export function eraseContent() {
    $('.new-list-item-box').on( "click", ".new-list-item", function() {
        console.log('erase');
        $(this).html('');
    });    
  }