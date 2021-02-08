export const Duplication = function(text) {
    return text += text;
}

export const Linkify = function(text) {
    text = text.replace(/(^|\s)@(\w+)/g, '$1@<a href="https://twitter.com/$2">$2</a>')
    return text.replace(/(^|\s)#(\w+)/g, '$1#<a href="https://twitter.com/search?q=%23$2">$2</a>');
};