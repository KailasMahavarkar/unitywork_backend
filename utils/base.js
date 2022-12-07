const uppercaseAlphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowercaseAlphabets = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const base62Charset = numbers + uppercaseAlphabets + lowercaseAlphabets;
const base64Charset = base62Charset + "+/";

// string to number
const strToNumber = (str) => {
    let num = 0;
    for (let i = 0; i < str.length; i++) {
        num += str.charCodeAt(i) * Math.pow(256, str.length - i - 1);
    }
    return num;
};

// number to string
const numberToStr = (num) => {
    let str = "";
    while (num > 0) {
        str = String.fromCharCode(num % 256) + str;
        num = Math.floor(num / 256);
    }
    return str;
};


const toBase = (num, base, charset) => {
    let str = "";
    while (num > 0) {
        str = charset[num % base] + str;
        num = Math.floor(num / base);
    }
    return str;
}

const fromBase = (str, base, charset) => {
    var len = Math.min(charset.length, base);
    var result = 0;
    for (var i = 0; i < str.length; i++) {
        result += charset.indexOf(str[i]) * Math.pow(len, str.length - i - 1);
    }
    return result;
}


const makeEncoder = (charset) => {
    const base = charset.length;
    return {
        encode: (str) => {
            let num = strToNumber(str);
            return toBase(num, base, charset);
        },
        decode: (str) => {
            try{
                let num = fromBase(str, base, charset);
                return numberToStr(num);
            }catch(err){
                return "malformed input";
            }
        },
    };
}

const base62 = makeEncoder(base62Charset);
const base64 = makeEncoder(base64Charset);


module.exports = {
    base62,
    base64
}