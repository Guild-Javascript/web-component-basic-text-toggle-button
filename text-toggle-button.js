class TextToggleButton extends HTMLElement {
    constructor() { 
        super();
        this._isVisible = "false";
        this._toggleText = "More info!";
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <button>
                <slot>Default text</slot>
            </button>
        `;
    }
    
    connectedCallback() {
        if (this.hasAttribute('isVisible')) {
            this._isVisible = this.getAttribute('isVisible');
        }
        if (this.hasAttribute('toggleText')) {
            this._toggleText = this.getAttribute('toggleText');
        }
        if (this._isVisible === "true") {
            const paragraph = document.createElement("p");
            paragraph.innerText = this._toggleText;
            this.shadowRoot.appendChild(paragraph);
        }
        this.addEventListener('click', event => {
            console.log("hello");
            if (this._isVisible === "true") {
                const element = this.shadowRoot.querySelector("p");
                this.shadowRoot.removeChild(element);
                this._isVisible = "false";
            } else {
                const paragraph = document.createElement("p");
                paragraph.innerText = this._toggleText;
                this.shadowRoot.appendChild(paragraph);
                this._isVisible = "true";
            }
        });
    }
}

customElements.define("coopers-text-toggle-button", TextToggleButton);