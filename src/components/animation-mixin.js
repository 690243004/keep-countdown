const rm2 = () => {
  let re;
  const p = new Promise((resolve) => {
    re = resolve;
  });
  window.requestAnimationFrame(() => {
    window.requestAnimationFrame(() => {
      re();
    });
  });
  return p;
};
/**
 * 接收到新的数据 ->
 */
export default {
  methods: {
    async run() {
      if (this.theSchond > 0) {
        await rm2();
        this.timer = setTimeout(() => {
          this.theSchond = (this.theSchond - 0.1).toFixed(1);
          this.$emit("change", this.theSchond);
          this.run();
        }, 100);
      } else {
        this.$emit("end");
      }
    },
  },
  beforeDestroy() {
    this.timer && clearTimeout(this.timer);
  },
  watch: {
    second: {
      handler(newVal, oldVal) {
        if (newVal > 0) {
          if (this.firstRun) {
            this.theSchond = newVal;
            this.firstRun = false;
            return this.run();
          }
          if (newVal === oldVal - 1) {
            return;
          }
          if (newVal > oldVal) {
            this.theSchond += newVal - oldVal;
          }
        }
      },
      immediate: true,
    },
  },
};
