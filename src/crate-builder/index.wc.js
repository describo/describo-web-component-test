import { defineCustomElement } from "vue";
import DescriboCrateBuilder from "./Shell.component.wc.vue";
import "./tailwind.css";
import "@element-plus/theme-chalk/dist/index.css";
import "./component.css";
import ElementPlus from "element-plus";
import "@fortawesome/fontawesome-free/js/all";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoReplaceSvg = "nest";

// Web Component build entrypoint
const element = defineCustomElement(DescriboCrateBuilder);
export default customElements.define("describo-crate-builder", element);
