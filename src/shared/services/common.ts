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
    print: function($html) {
        var newWin = window.open("");
        var css1 = document.createElement("link");
        css1.setAttribute("rel", "stylesheet");
        css1.setAttribute("type", "text/css");
        css1.setAttribute("href", "http://" + window.location.host + "/assets/css/yeti_bootstrap.min.css");
        newWin.document.write($html);
        newWin.document.getElementsByTagName("head")[0].appendChild(css1);
    },
    dateDiffInDays: function(dateFrom, dateTo) {
        var _MS_PER_DAY = 1000 * 60 * 60 * 24;
        var utc1 = Date.UTC(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate());
        var utc2 = Date.UTC(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate());
      
        return Math.floor((utc2 - utc1) / _MS_PER_DAY);
    },
    dateDiffInMonths: function(dateFrom, dateTo) {
        var _MS_PER_MONTH = 1000 * 60 * 60 * 24 * 7 * 4;

        var utc1 = Date.UTC(dateFrom.getFullYear(), dateFrom.getMonth(), dateFrom.getDate());
        var utc2 = Date.UTC(dateTo.getFullYear(), dateTo.getMonth(), dateTo.getDate());
    
        var months = Math.floor((utc2 - utc1) / _MS_PER_MONTH);
    
        var _dateFrom = new Date(dateFrom);
        _dateFrom = new Date(_dateFrom.setMonth(_dateFrom.getMonth() + months));
        
        if (_dateFrom > dateTo) {
            months--;
        }

        return months;
    },
    compute: function(pledge, date, type) {
        
        if (!(pledge.isgold && pledge.nocollateral)) {
            
        } else if (pledge.isgold && !pledge.nocollateral) {

        } else if (!pledge.isgold && pledge.nocollateral) {

        }
    }
};