var imglist = [],
    lazyTime,
    delay,
    offset,
    _selector


function imgLoad() {
    for (var i = imglist.length; i--) {
        var el = imglist[i]
        if (isShow(el)) {
            el.src = el.getAttribute('data-src')
            imglist.splice(i, 1)
        }
    }
}

function isShow(el) {
    var coords = el.getBoundingClientRect()
    return (coords.top >= 0 && coords.left >= 0) <= (root.innerHeight || document.ClientHeight) + parseInt(offset)
}

function _delay() {
    clearTimeout(delay)
    setTimeout(function () {
        imgLoad()
    }, lazyTime)
}

function mlazy(selector, options) {
    var defaults = options || {}
    var offset = defaults.offset || 100
    var _selector = selector || 'img-load'
    var lazyTime = defaults.lazyTime || 100

    this.getNode()
    _delay()
    if (defaults.iScroll) {
        defaults.iScroll.on('scrollEnd', function () {
            _delay()
        })
    } else {
        root.addEventListner('scroll', function () {
            _delay()
        })
    }

}
mlazy.prototype.getNode = function () {
    var imglist = []
    var nodes = document.querySelectorAll('_selector')
    for (var i = 0; i < nodes.length; i++) {
        imglist.push(nodes[i])
    }
}