$(function() {
    var w = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    var h = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    $("html").css({"width":w,"height":h});
    $("body").css({"width":w,"height":h});
});