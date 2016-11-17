/**
*
* https://gist.github.com/monkeymonk/c08cb040431f89f99928132ca221d647
*/
import $ from 'jquery';
import plugin from './lib/plugin';

class Loader {
    constructor(element, options) {
        
        let $element = $(element);

        options.onScroll = (options.onScroll == null) ? this.containerOnScroll : options.onScroll
        options.onDispatch = (options.onDispatch == null) ? this.defaultDispatcher : options.onDispatch
        options.onDone = (options.onDone == null) ? this.defaultDone : options.onDone
        
        $element.data('loader_options', options)

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

        $element.data('scroller', $scrollElement)

        if(options.autoTrigger == true){

        	$($scrollElement).on('scroll', function doScrollPreEvent(event){

		    	if(options.onScroll){
		    		options.onScroll.call($element, event)
		    	}
        	})
        }

        $element.on('ideialoader.manual_dispatch', function manualDispatch(){
        	let $element = $(this)
        	let options = $element.data('loader_options')

        	options.onDispatch.call(this)
        })

    }    

    containerOnScroll(event){
       
        let $element = $(this)
        let options = $element.data('loader_options')
        let $scroller = $element.data('scroller')

        let $scrollerPoint = $scroller.scrollTop() + $scroller.outerHeight()
        let $elementPoint = $element.offset().top + $element.outerHeight() - options.offset

        if($scrollerPoint > $elementPoint){
            options.onDispatch.call(this)
        }

    }

    defaultDispatcher(){
        let $element = $(this)
        let options = $element.data('loader_options')
        let $scroller = $element.data('scroller')

        if($element.data('loader_running')){
            return false;
        }

        $element.data('loader_running', true)

        $element.trigger('ideialoader.pre_dispatch', [this])

        let method = $element.data('method')
        let url = $element.data('url')
        let dataType = $element.data('dataType')

        let ajaxOptions = options.ajaxOptions

        if(method){
        	ajaxOptions.method = method
        }

        if(url){
        	ajaxOptions.url = url
        }

        $element.trigger('ideialoader.loading_start', [this])

        this.asyncLoad = $.ajax(ajaxOptions).done(function preDone(data){

        	if(options.onDone){
        		options.onDone.call($element[0], data)
        	}
            
            $element.trigger('ideialoader.post_dispatch', [this, data])

        }).fail(function(jqXHR, textStatus, errorThrown){

            if(options.onFail){
            	options.onFail.call($element[0], jqXHR, textStatus, errorThrown)
            }

            $element.trigger('ideialoader.fail_dispatch', [this, data])

        }).always(function allwaysRun(){

            $element.data('loader_running', false)
            $element.trigger('ideialoader.loading_finish', [this])
            
        })
    }

    defaultDone(data){
        let $element = $(this)
        let options = $element.data('loader_options')

        let $doneContainer = $('<div></div>').addClass('ideia-loader-container')

        $doneContainer.append($(data))

        switch(options.html.insertion){
        	case 'prepend':
        		$element.prepend($doneContainer)
        		break

        	case 'replace':
        		$element.empty()
        		$element.append($doneContainer)
        		break

        	case 'append':
        	default:
        		$element.append($doneContainer)
        		break
        }
       
    }

    defaultFail(jqXHR, textStatus, errorThrown){

        console.log(textStatus)

    }

}

Loader.DEFAULTS = {
    offset: 200,
    html: {
    	insertion: 'append', /*(append|prepend|replace) */
    },
    ajaxOptions: {
    	dataType: 'html', /* html, json */
    	method: 'GET',
    	url: window.location.href,
    },
    speed: 500,
    autoTrigger: true,
    onDispatch: null,
    onScroll: null,
    onDone: null,
    onFail: null,
    scrollContainer: 'window'
};

plugin('ideiaLoader', Loader);
