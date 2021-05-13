import Vue from "vue";
import OhVueIcon from "oh-vue-icons";

import { MdImage, MdImagenotsupportedRound } from "oh-vue-icons/icons";

OhVueIcon.add(MdImage, MdImagenotsupportedRound);
Vue.component("VIcon", OhVueIcon);
