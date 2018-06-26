enum Section {
    home = 1,
    about = 2,
    contact = 3
}

jQuery(function () {

    function doSomething(index, direction) {
        console.log("there->", index, direction)

        if (direction === 2) {

            //$("#section1").last().addClass("test")
            console.log(direction)
        }


    }

    $('#fullpage').fullpage( {

      onLeave: function(index, direction) {
          doSomething(index, direction);
      }

    })


    $('.landing-text').click( function () {
        $('html, body').animate({scrollTop: $('#section1').offset().top}, 'slow');
        return false
    })

});


