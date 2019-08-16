class ColorValueComponent extends HTMLElement
{
    private handleClick:EventListener = this.copyToClipboard.bind(this);

    private copyToClipboard() : void
    {
        if (this.innerHTML === 'Copied to clipboard')
        {
            return;
        }

        navigator.clipboard.writeText(this.innerHTML);
        const value = this.innerHTML;
        this.innerHTML = 'Copied to clipboard';

        setTimeout(()=>{
            this.innerHTML = value;
        }, 1000);
    }

    connectedCallback()
    {
        this.addEventListener('mousedown', this.handleClick);
    }
}

customElements.define('color-value-component', ColorValueComponent);
window.stylesheets.push('color-value-component');