import { createApp } from "vue";

import Footer from './Footer.vue';

export default (selector) => {
    createApp(Footer).mount(selector);
}
