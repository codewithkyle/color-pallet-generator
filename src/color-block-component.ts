class ColorBlockComponent extends HTMLElement
{
    private _deleteButton : HTMLButtonElement;
    private _editButton : HTMLButtonElement;
    private _colorButton : HTMLElement;
    private _color : string;
    private _modalTemplate : HTMLTemplateElement;
    private _pallet : ColorPalletComponent;
    private _palletBreakdownComponent : PalletBreakdownComponent;

    constructor()
    {
        super();
        this._deleteButton = this.querySelector('.js-delete-button');
        this._editButton = this.querySelector('.js-edit-button');
        this._colorButton = this.querySelector('.js-color-button');
        this._color = '#000000';
        this._modalTemplate = document.body.querySelector('[tag="color-selector-modal"]');
        this._pallet = document.body.querySelector('color-pallet-component');
        this._palletBreakdownComponent = document.body.querySelector('pallet-breakdown-component');
    }

    private handleDeleteClick:EventListener = this.removeColor.bind(this);
    private handleEditClick:EventListener = this.editColor.bind(this);
    private handleColorClick:EventListener = this.activateColor.bind(this);

    private removeColor() : void
    {
        this._pallet.removeColor(this._color.replace('#', ''));
        this.remove();
    }

    private editColor() : void
    {
        const modal = document.importNode(this._modalTemplate.content, true);
        document.body.appendChild(modal);
        const modalComponent = document.body.querySelector('color-modal-component') as ColorModalComponent;
        modalComponent.setInitialColor(this._color, this);
    }

    public updateColor(color:string) : void
    {
        const colorPreview = this.querySelector('custom-color-preview') as HTMLElement;
        colorPreview.style.backgroundColor = `#${ color }`;
        this._color = `#${ color }`;
        colorPreview.dataset.color = this._color;
    }

    private activateColor() : void
    {
        this._palletBreakdownComponent.generateColorBreakdown(this._color);
    }

    connectedCallback()
    {
        this._deleteButton.addEventListener('click', this.handleDeleteClick);
        this._editButton.addEventListener('click', this.handleEditClick);
        this._colorButton.addEventListener('click', this.handleColorClick);
        
        const colorPreview = this.querySelector('custom-color-preview') as HTMLElement;
        const cleanValue = colorPreview.style.backgroundColor.replace(/[rgb\(\)\s]/gi, '');
        const rgbValue = cleanValue.split(',');
        this._color = `#${ convert.rgb.hex(rgbValue) }`;
        colorPreview.dataset.color = this._color;
    }

    disconnectedCallback()
    {
        this._deleteButton.removeEventListener('click', this.handleDeleteClick);
        this._editButton.removeEventListener('click', this.handleEditClick);
        this._colorButton.removeEventListener('click', this.handleColorClick);
    }
}

customElements.define('color-block-component', ColorBlockComponent);
window.stylesheets.push('color-block-component');
