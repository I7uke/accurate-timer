import ReactDOMClient from 'react-dom/client';
import App from './app';
import StoreMain from './stores/storeMain';

document.addEventListener("DOMContentLoaded", () => {
    let rootContainer: HTMLElement | null = document.getElementById("Root");
    if (rootContainer) {
        rootContainer.innerHTML = '';
    } else {
        const container = document.createElement("div");
        document.body.append(container);
        rootContainer = container;
    }

    const storeMain = new StoreMain();

    const root = ReactDOMClient.createRoot(rootContainer);
    root.render(<App storeMain={storeMain}/>);
});