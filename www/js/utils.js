// Utility method for String class
// Used here for parsing out responses from questions when generating surveys

String.prototype.startsWith = function (str){
    return this.indexOf(str) === 0;
};

String.prototype.endsWith = function (str){
    return this.slice(-str.length) === str;
};
