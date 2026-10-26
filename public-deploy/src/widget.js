// El navegador entiende esta clase; no es un componente Angular.
const API = '/api'; // API local de demo (repo api-java).

// CONTRATO entre módulos (eventos en window):
//   escucha → 'tienda:carrito-cambio'   detail: { cantidad }   (lo lanza el carrito)
class Contador extends HTMLElement {
 constructor() { super(); this.attachShadow({ mode: 'open' }); }
 connectedCallback() {
   this.control?.abort();
   this.control = new AbortController();
   this.shadowRoot.innerHTML = `
     <style>:host {display:inline-block} span {border:2px solid #087f8c;padding:6px 14px;border-radius:99px;font-weight:700}</style>
     <span title="JavaScript puro · localhost:4503">🛒 <b id="cantidad">0</b></span>`;
   // Forma 1 · evento: se actualiza al instante cuando el carrito cambia.
   window.addEventListener('tienda:carrito-cambio', e => this.mostrar(e.detail.cantidad), { signal: this.control.signal });
   // Forma 3 · API: al abrir la página, pregunta cuántos productos hay guardados.
   this.cargar();
 }
 disconnectedCallback() { this.control?.abort(); }
 async cargar() {
   try {
     const items = await (await fetch(API + '/carrito')).json();
     this.mostrar(items.reduce((suma, item) => suma + item.cantidad, 0));
   } catch {
     this.shadowRoot.querySelector('#cantidad').textContent = '–'; // API apagada.
   }
 }
 mostrar(cantidad) { this.shadowRoot.querySelector('#cantidad').textContent = String(cantidad); }
}
if (!customElements.get('tienda-contador')) customElements.define('tienda-contador', Contador);
