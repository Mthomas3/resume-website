// language=JQuery-CSS

$(window).on('load', function () {

    let test = $(`#fp-nav ul`)
    //$('#fp-nav ul').hide()
    test.hide()
})

enum Section {
    home = 1,
    about = 2,
    contact = 3
}

function removeElement(elementID) {
    (document.getElementById(elementID)).parentNode.removeChild(document.getElementById(elementID))
}

jQuery(function () {
    const _button = $('.selector-div ')

    function handleScrollingAnimation(index, direction) {
        if (direction === Section.about) {
            $('#fp-nav ul').fadeIn(1500)
            $('.scrolling-title').fadeOut()
            $('.buttons').fadeOut()
        } else if (direction === Section.home) {
            $('.scrolling-title').fadeIn(1500)
            $('.buttons').fadeIn(1500)
            $('#fp-nav ul').fadeOut(1500)
        }
    }

    _button.click( () => {
        $.fn.fullpage.moveTo('page2', 1);
    })

    $('#fullpage').fullpage({

        menu: '#menu',
        keyboardScrolling: true,
        anchors: ['page1', 'page2', 'page3'],
        offsetSections: true,
        navigation: true,
        navigationPosition: 'right',
        onLeave: function(index, direction) {
            handleScrollingAnimation(index, direction);
        }
    })
});