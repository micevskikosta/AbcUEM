enum Languages { Mk, Fr }
enum Pages { Master = 1 }

class Global {
    public lang: Languages;
    public setLang(lang: Languages) {
        this.lang = lang;
    }
}


$(window).load(function () {
    //Toggle class on page load
    var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/#/") + 1);
    $(".nav-bar-buttons a").each(function () {
        if ($(this).attr("href") == pgurl || $(this).attr("href") == '')
            $(this).addClass("active");

        $(".nav-bar-buttons a").click(function (event) {
            $(".nav-bar-buttons a").removeClass("active");
        });
    })

    //Toggle class on click
    $(".nav-bar-buttons a").click(function (event) {
        var self = $(this)[0];
        $(".nav-bar-buttons a").each(function (index) {
            if (self == $(this)[0])
                $(self).addClass("active");
            else
                $(this).removeClass("active");
        });
    });
});
