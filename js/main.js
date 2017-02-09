// http://arguments.callee.info/2009/04/15/click-and-drag-to-select-checkboxes/
var dragCheckbox = function(root) {
    root = root || document;
    var dragging = false;
    var current = false;
    document.onmouseup = function() {
        dragging = false;
    };
    var getTarget = function(element) {
        switch (element.tagName.toLowerCase()) {
            case 'input':
                return element;
                break;
            case 'label':
                element.style['MozUserSelect'] = 'none';      // Firefox and other Gecko
                element.style['WebkitUserSelect'] = 'ignore'; // Safari, Chrome, AIR
                element.onselectstart = function() {
                    return false;                             // IE
                };
                var el = element.getAttribute('for') || element.getAttribute('htmlFor');
                return document.getElementById(el);
                break;
            default:
                return null; // invalid element
        }
    };
    var checkboxes = function() {
        var c = [];
        var inputs = root.getElementsByTagName('input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs[i].getAttribute('type') == 'checkbox') {
                c.push(inputs[i]);
            }
        }
        return c;
    }();
    for (var i = 0; i < checkboxes.length; i++) {
        (function() {
            var down = function() {
                var box = getTarget(this);
                if (box) {
                    dragging = true;
                    box.checked = !box.checked;
                    current = box.checked;
                }
            };
            var over = function() {
                var box = getTarget(this);
                if (box && dragging) {
                    box.checked = current;
                }
            };
            var click = function() {
                var box = getTarget(this);
                if (box) {
                    box.checked = current;
                }
            };
            this.onmousedown = function() { down.call(this); };
            this.onmouseover = function() { over.call(this); };
            this.onclick = function() { click.call(this); };
            var label = (function() {
                var l = root.getElementsByTagName('label');
                for (var i = 0; i < l.length; i++) {
                    var f = l[i].getAttribute('for') || l[i].getAttribute('htmlFor');
                    if (f == this.id) {
                        return l[i];
                    }
                }
                return l;
            }).call(this);
            if (label) {
                label.onmousedown = function() { down.call(label); };
                label.onmouseover = function() { over.call(label); };
                label.onclick = function() { click.call(label); };
            }
        }).call(checkboxes[i]);
    }
};

document.addEventListener('DOMContentLoaded',function(){
  dragCheckbox(document)
})

document.addEventListener('contextmenu', function(e) {
  comment = document.createElement("span")
  comment.innerHTML = prompt("You've tried to open context menu at " + e.clientX + ", " + e.clientY, "")
  comment.style.position = "fixed"
  comment.style.left = (parseInt((e.clientX + 15)/30)*30 - 15) + "px"
  comment.style.top = (parseInt((e.clientY + 10)/30)*30 - 10) + "px"
  comment.style.zIndex = 20
  comment.style.lineHeight = "30px"
  comment.style.fontFamily = "sans-serif"
  document.body.appendChild(comment)
  e.preventDefault();
}, false);
