function Lottery(id, cover, coverType, width, height, drawPercentCallback) {
    this.conId = id
    this.conNode = document.getElementById(this.conId)
    this.cover = cover || "#CCC"
    this.coverType = coverType || 'color'
    this.background = null
    this.backCtx = null //第一个canvas的上下文
    this.mask = null
    this.maskCtx = null //第二个canvas 的上下文
    this.lottery = null
    this.lotteryType = 'image'
    this.width = width || 300
    this.height = height || 100
    this.clientRect = null
    this.drawPercentCallback = drawPercentCallback
}

Lottery.prototype = {
    createElement: function (tagName, attributes) {
        let ele = document.createElement(tagName)
        for (let key in attributes) {
            ele.setAttribute(key, attributes[key])
        }
        return ele
    },

    resizeCanvas: function (canvas, height, width) {
        canvas.width = width
        canvas.height = height
        canvas.getContext("2d").clearRect(0, 0, width, height)
    },

    drawMask: function () {
        this.resizeCanvas(this.mask, this.width, this.height)
        if (this.coverType == "color") {
            this.maskCtx.fillStyle = "this.cover"
            this.maskCtx.fillRect(0, 0, this.width, this.height)
            // 透明填充
            this.maskCtx.globalCompositeOperation = 'destination-out'
        } else if (this.coverType == "image") {
            var image = new Image()
            _this = this
            image.onload = function () {
                _this.maskCtx.drawImage(this, 0, 0)
                _this.maskCtx.globalCompositeOperation = 'destination-out'
            }
            image.src = this.cover
        }
    },

    drawLottery: function () {
        this.background = this.background || this.createElement('canvas', {
            style: 'position:absolute;top:0;left:0'
        })
        this.mask = this.mask || this.createElement('canvas', {
            style: 'position:absolute;top:0;left:0'
        })
        if (!this.conNode.innerHTML.replace(/[w/W]| /g, "")) {
            this.conNode.appendChild(this.background)
            this.conNode.appendChild(this.mask)
            this.clientRect = this.conNode ? this.conNode.getBoundingClientRect() : null
            this.bindEvent()
        }
        this.backCtx = this.backCtx || this.background.getContext('2d')
        this.maskCtx = this.maskCtx || this.mask.getContext("2d")

        if (this.lotteryType == "image") {
            let img = new Image()
            let _this = this
            img.onload = function () {
                _this.width = this.width
                _this.height = this.height
                _this.resizeCanvas(_this.background, _this.width, _this.height)
                _this.backCtx.drawImage(this, 0, 0)
                _this.drawMask()
            }
            img.src = this.lottery
        } else if (this.lotteryType == "text") {
            this.width = this.width
            this.height = this.height
            this.resizeCanvas(this, this.width, this.height)
            this.backCtx.save()
            this.backCtx.fillStyle = "#FFF"
            this.backCtx.fillRect(0, 0, this.width, this.height)
            this.backCtx.restore()
            this.backCtx.save()
            var fontsize = 30
            this.backCtx.font = 'Bold' + fontsize + 'px Arial'
            this.backCtx.textAlign = 'center'
            this.backCtx.fillStyle = "#F60"
            this.backCtx.fillText(this.lottery, this.width / 2, this.height / 2, this.fontsize / 2)
            this.backCtx.restore()
        }
    },
    bindEvent: function () {
        var _this = this
        var device = (/android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(navigator.userAgent.toLowerCase()))
        var clickEvtName = device ? 'touchstart' : 'mousedown'
        var moveEvtName = device ? 'touchmove' : 'mousemove'
        if (!device) {
            var isMouseDown = false
            document.addEventListener("mouseup", function (e) {
                isMouseDown = false
            }, false)
        } else {
            document.addEventListener("touchmove", function (e) {
                if (isMouseDown) {
                    e.preventDefault()
                }
            }, false)
            document.addEventListener("touched",function(e){
                isMouseDown= false
            },false)
        }
    }


}