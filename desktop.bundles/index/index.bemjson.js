({
    block : 'page',
    title : 'Title of the page',
    favicon : '/favicon.ico',
    head : [
        { elem : 'meta', attrs : { name : 'description', content : '' } },
        { elem : 'meta', attrs : { name : 'viewport', content : 'width=device-width, initial-scale=1' } },
        { elem : 'css', url : '_index.css' }
    ],
    scripts : [
        { elem : 'js', url : '_index.js' }
    ],
    mods : { theme : 'islands' },
    content : [
        {
            block : 'input',
            mods : { theme : 'islands', size : 's', 'has-clear' : true },
            mix: { block: 'keyboard', js: { id: 1 } },
            val : 'value',
            placeholder : 'placeholder'
        },
        {
            block: 'keyboard',
            js: { id: 1 },
            mods: { theme: 'islands' },
            layout: 'ru'
        }
    ]
});
