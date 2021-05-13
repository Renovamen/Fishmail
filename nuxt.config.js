export default {
  target: "static",
  head: {
    title: "Fishmail",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content: "Just touch fish on Fishmail!"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  // global css
  css: ["ant-design-vue/dist/antd.css"],
  plugins: ["@/plugins/antd-ui", "@/plugins/icons"],
  // auto import components
  components: true,
  build: {
    transpile: ["oh-vue-icons"]
  }
};
