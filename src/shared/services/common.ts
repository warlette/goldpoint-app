export var common = {
    getBool: function(_value, _default) {
        var _default = _default || false;
        var str = String(_value).toLowerCase();
        switch (str) {
            case "true":
                return true;
            case "1":
                return true;
            case "false":
                return false;
            case "0":
                return false;
            default:
                return _default;
        }
    },
    setMonth: function(date, months) {
        date.setMonth(date.getMonth() + parseInt(months));
        return date;
    },
    hasValue: function(field) {
        if ((field === undefined) || (field === null) || (field === "")) {
            return false;
        }
        return true;
    },
    print: function() {
        var toPrint=document.getElementById("collections");
        var newWin = window.open("");
        var css1 = document.createElement("link");
        css1.setAttribute("rel", "stylesheet");
        css1.setAttribute("type", "text/css");
        css1.setAttribute("href", "http://" + window.location.host + "/assets/css/yeti_bootstrap.min.css");
        newWin.document.write(toPrint.outerHTML);
        newWin.document.getElementsByTagName("head")[0].appendChild(css1);
    }
};