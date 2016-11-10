/**
*
* https://gist.github.com/monkeymonk/c08cb040431f89f99928132ca221d647
*/
import $ from 'jquery';
import plugin from './lib/plugin';

class Loader {
    constructor(element, options) {
        
        this.$element = $(element);

        if(options.autoTrigger == true){

            let $scrollElement = this.$element

            switch(options.scrollContainer){
                case 'window':
                    $scrollElement = $(window)
                    break;
                case 'self':
                default:
                    $scrollElement = this.$element
                    break;
            }

            options.onScroll = options.onScroll ? options.onScroll : this.containerOnScroll

            $($scrollElement).on('scroll', options.onScroll)

        }else{



        }

    }

    containerOnScroll(event){
        
        let $element = $(this)

        console.log($(this).scrollTop() - $element.offset().top)
        console.dir($element.data())

        // if($(this).scrollTop() > options.offset){

        // }

    }

    defaultDispatcher(){
        console.log('In Dispatcher')
    }

    defaultDone(){
        console.log('In Done')
    }

}

Loader.DEFAULTS = {
    offset: 100,
    speed: 500,
    autoTrigger: true,
    onDispatch: Loader.defaultDispatcher,
    onScroll: null,
    onDone: Loader.defaultDone,
    scrollContainer: 'self'
};

plugin('ideiaLoader', Loader);
