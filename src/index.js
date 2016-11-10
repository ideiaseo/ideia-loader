/**
*
* https://gist.github.com/monkeymonk/c08cb040431f89f99928132ca221d647
*/
import $ from 'jquery';
import plugin from './lib/plugin';

class Loader {
    constructor(element, options) {
        const $element = $(element);

        // $(window).scroll(function () {
        //     if ($(this).scrollTop() > options.offset) {
        //         $element.fadeIn();
        //     } else {
        //         $element.fadeOut();
        //     }
        // });
        //
        // $element.click(function (e) {
        //     e.preventDefault();
        //
        //     $('html, body').animate({
        //         scrollTop: 0
        //     }, options.speed);
        // });
        console.log( $element );
    }


}

Loader.DEFAULTS = {
    offset: 100,
    speed: 500,
};

plugin('ideiaLoader', Loader);
