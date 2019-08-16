class Application
{
    constructor()
    {
        this.init();
    }

    private getStylesheets() : void
    {
        while (window.stylesheets.length)
        {
            const stylesheet = window.stylesheets[0];

            let stylesheetEl = document.head.querySelector(`[component="${ stylesheet }"]`);
            if (!stylesheetEl)
            {
                stylesheetEl = document.createElement('style');
                stylesheetEl.setAttribute('component', stylesheet);
                document.head.appendChild(stylesheetEl);
                fetch(`${ window.location.origin }${ window.location.pathname }assets/styles/${ stylesheet }.css`)
                .then(request => request.text())
                .then(response => {
                    stylesheetEl.innerHTML = response;
                })
                .catch(error => {   
                    console.error(error);
                });
            }

            window.stylesheets.splice(0, 1);
        }
    }

    private init() : void
    {
        if ('requestIdleCallback' in window)
        {
            // @ts-ignore
            window.requestIdleCallback(this.getStylesheets);
        }
        else
        {
            console.warn('Idle callback prototype not available in this browser, fetching stylesheets');
            this.getStylesheets();
        }
    }
}

new Application();