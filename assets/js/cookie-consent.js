$(document).ready(function () {
    var lang = $('html')[0].lang || 'en';
    window.cookieconsent.initialise({
        "palette": {
            "popup": {
                "background": "#000000",
                "text": "#e5e5e5"
            },
            "button": {
                "background": "#90a4ae",
                "text": "#ffffff"
            }
        },
        "content": content[lang]
    })
});

var content = {
    de: {
        message: "Diese Webseite verwendet Cookies, um Dienste und Funktionen bereitzustellen.",
        dismiss: "OK",
        link: "Mehr erfahren",
    },
    en: {
        message: "This website uses cookies to provide the best browsing experience.",
        dismiss: "Got it",
        link: "Learn more",
    }
}