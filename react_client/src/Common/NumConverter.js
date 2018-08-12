export function toPersian( num, dontTrim ) {

    var i = 0,

        dontTrim = dontTrim || false,

        num = dontTrim ? num.toString() : num.toString().trim(),
        len = num.length,

        res = '',
        pos,

        persianNumbers = typeof persianNumber == 'undefined' ?
            ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
            persianNumbers;

    for (; i < len; i++)
        if (( pos = persianNumbers[num.charAt(i)] ))
            res += pos;
        else
            res += num.charAt(i);

    return res;
}

export function toEnglish( num, dontTrim ) {

    var i = 0,

        dontTrim = dontTrim || false,

        num = dontTrim ? num.toString() : num.toString().trim(),
        len = num.length,

        res = '',
        pos,

        persianNumbers = typeof persianNumber == 'undefined' ?
            ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'] :
            persianNumbers;

    for (; i < len; i++){
        pos = persianNumbers.indexOf(num.charAt(i))
        if (pos === -1)
            res += num.charAt(i);
        else
            res += pos;
    }

    return res;
}