/**
*
* https://gist.github.com/monkeymonk/c08cb040431f89f99928132ca221d647
*/
import $ from 'jquery';
import plugin from './lib/plugin';

class Loader {
    constructor(element, options) {
        
        let $element = $(element);

        options.onScroll = options.onScroll ? options.onScroll : this.containerOnScroll
        options.onDispatch = options.onDispatch ? options.onDispatch : this.defaultDispatcher
        options.onDone = options.onDone ? options.onDone : this.defaultDone
        
        $element.data('loader_options', options)

        if(options.autoTrigger == true){

            let $scrollElement = $element

            switch(options.scrollContainer){
                case 'window':
                    $scrollElement = $(window)
                    break;
                case 'self':
                default:
                    $scrollElement = $element
                    break;
            }

            $($scrollElement).on('scroll', function doScrollPreEvent(event){
                options.onScroll.call($element, event, $scrollElement)
            })

        }else{

        }

    }

    containerOnScroll(event, scroller){
        
        let $element = $(this)
        let $scroller = $(scroller)
        let options = $element.data('loader_options')

        let $scrollerPoint = $scroller.scrollTop() + $scroller.outerHeight()
        let $elementPoint = $element.offset().top + $element.outerHeight() - options.offset

        if($scrollerPoint > $elementPoint){
            options.onDispatch.call(this)
        }

    }

    defaultDispatcher(){
        let $element = $(this)
        let options = $element.data('loader_options')

        if($element.data('loader_running')){
            return;
        }

        $element.data('loader_running', true)

        let method = $element.data('method')
        let url = $element.data('url')

        this.asyncLoad = $.ajax({
            
            'method': method ? method : 'GET',
            'url': url ? url : window.location.href,
            'dataType': 'html'

        }).done(function preDone(data){

            options.onDone.call($element[0], data)
            $element.data('loader_running', false)

        }).fail(function(jqXHR, textStatus, errorThrown){

            console.log(textStatus)

        })

    }

    defaultDone(data){
        let $element = $(this)
        let $doneContainer = $('<div></div>').addClass('ideia-loader-container')

        $doneContainer.append($(data))
        $element.append($doneContainer);
    }

}

Loader.DEFAULTS = {
    offset: 200,
    speed: 500,
    autoTrigger: true,
    onDispatch: null,
    onScroll: null,
    onDone: null,
    scrollContainer: 'window'
};

plugin('ideiaLoader', Loader);
