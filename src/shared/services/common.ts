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
    printTable: function() {
        var toPrint=document.getElementById("collections");
        var newWin = window.open("");
        var css1 = document.createElement("link");
        css1.setAttribute("rel", "stylesheet");
        css1.setAttribute("type", "text/css");
        css1.setAttribute("href", "http://" + window.location.host + "/assets/css/yeti_bootstrap.min.css");
        newWin.document.write(toPrint.outerHTML);
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
    penaltyForNotGoldCollateral: function(pledge, dateTo) {
        var penDate = new Date((new Date(pledge.dateadded)).setMonth((new Date(pledge.dateadded)).getMonth() + 1)),
            penMonths = this.dateDiffInMonths(penDate, new Date(dateTo)),
            penDays,
            penalty = 0,
            advanceInterest = (parseFloat(pledge.interest) / 100) * parseFloat(pledge.amount);
            
        var computePenalty = function (penDays, advanceInterest, multiplier) {
            var penalty = 0;
            if (penDays > 4 && penDays < 26) {
                penalty = (advanceInterest * (multiplier - 1)) + (advanceInterest / 30) * penDays;
            } else if (penDays > 25) {
                penalty = advanceInterest * multiplier;
            } else {
                penalty = (advanceInterest * (multiplier - 1));
            }
            penalty = (penalty < 0) ? 0 : penalty;
            return penalty;
        }

        penDate = new Date((new Date(pledge.dateadded)).setMonth((new Date(pledge.dateadded)).getMonth() + (penMonths + 1)));
        penDays = this.dateDiffInDays(penDate, new Date(dateTo));
        if (penDays < 0) {
            penDate = new Date((new Date(pledge.dateadded)).setMonth((new Date(pledge.dateadded)).getMonth() + penMonths));
            penDays = this.dateDiffInDays(penDate, new Date(dateTo));
            penalty = computePenalty(penDays, advanceInterest, penMonths);
        } else {
            penalty = computePenalty(penDays, advanceInterest, (penMonths + 1));
        }
        
        return {
            amount: parseFloat(pledge.amount),
            advanceInterest: advanceInterest,
            penalty: penalty
        };
    },
    penaltyForGoldCollateral: function(pledge, dateTo) {
        var penDate = new Date(pledge.dateadded),
        penMonths = this.dateDiffInMonths(penDate, new Date(dateTo)),
        penDays,
        penalty = 0,
        advanceInterest = (parseFloat(pledge.interest) / 100) * parseFloat(pledge.amount);
        
        penDays = this.dateDiffInDays(penDate, new Date(dateTo));

        if (penDays < 33) {
            penMonths = 0;
        } else {
            penDate = new Date((new Date(pledge.dateadded)).setMonth((new Date(pledge.dateadded)).getMonth() + penMonths - 1));
            penDays = this.dateDiffInDays(penDate, new Date(dateTo));

    		if (penDays < 33) {
                penMonths -= 1;
            } else {
                penDate = new Date((new Date(pledge.dateadded)).setMonth((new Date(pledge.dateadded)).getMonth() + penMonths));
                penDays = this.dateDiffInDays(penDate, new Date(dateTo));
            }
        }

        var computePenalty = function(penDays, advanceInterest, multiplier) {
            var penalty = 0;
            if (penDays >= 0 && penDays <= 10) {
                penalty = (advanceInterest * ((multiplier * 5) + 1));
            } else if (penDays >= 11 && penDays <= 21) {
                penalty = (advanceInterest * ((multiplier * 5) + 2));
            } else if (penDays >= 22 && penDays <= 32) {
                penalty = (advanceInterest * ((multiplier * 5) + 3));
            }
            penalty = (penalty < 0) ? 0 : penalty;
            return penalty;
        }

        penalty = computePenalty(penDays, advanceInterest, penMonths);

        return {
            amount: parseFloat(pledge.amount),
            advanceInterest: advanceInterest,
            penalty: penalty
        };
    },
    penaltyForNoCollateral: function(pledge, dateTo) {
        
    },
    compute: function(pledge, dateTo) {
        var result;

        if (!(pledge.isgold || pledge.nocollateral)) {
            result = this.penaltyForNotGoldCollateral(pledge, dateTo);
        } else if (pledge.isgold && !pledge.nocollateral) {
            result = this.penaltyForGoldCollateral(pledge, dateTo);
        } else if (!pledge.isgold && pledge.nocollateral) {
            result = this.penaltyForNoCollateral(pledge, dateTo);
        }
        return result;
    }
};