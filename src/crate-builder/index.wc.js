import { defineCustomElement } from "vue";
import DescriboCrateBuilder from "./Shell.component.wc.vue";
import "./tailwind.css";
import "@element-plus/theme-chalk/dist/index.css";
import "./component.css";
import ElementPlus from "element-plus";
import "@fortawesome/fontawesome-free/js/all";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoReplaceSvg = "nest";

// @beepsoft: I don't understand why this is next bit is required. In your
//   react app you include the css file in line 5 of App.tsx. It seems to me that
//   this isn't required then. (or, since you bundled the style into the component,
//   including it in the react app is not required. If this is true though, I think it's
//   better to not do it here so that the user of the component can decide when they want the
//   style to be loaded)

// @marcolarosa: I just forgot to remove from App.tsx. The css must be embedded into the web component like below
// otherise it would not have effect.

// The trick is to import from the vue build, because it is built before this, so style.css is already available.
// If we tried to import from dist/web-component/style.css it was not available since we are in the building process
// and so style.css wouldbe only available at the end of it.
import css from "../../dist/vue/style.css";

// Explicitly inline styles in the component
DescriboCrateBuilder.styles = [css];

// Web Component build entrypoint
const element = defineCustomElement(DescriboCrateBuilder);

export default customElements.define("describo-crate-builder", element);
