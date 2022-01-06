<template>
  <div
    ref="drawer"
    class="drawerClass"
    :class="{
      rightOff: left === undefined && !rightOn,
      rightOn: left === undefined && rightOn,
      leftOff: left !== undefined && !leftOn,
      leftOn: left !== undefined && leftOn,

      right: left === undefined,
      left: left !== undefined
    }"
    :style="{
      zIndex: zIndex,
      transition: `all ${speed}s cubic-bezier(0.4, 0, 0.2, 1)`,
      width: `${width}px`,
      right:
        left === undefined && !rightOn && !rightAlign
          ? `-${width}px`
          : rightAlign && rightOn
          ? `${rightAlign}px !important`
          : rightAlign && !rightOn
          ? `-${width}px`
          : 'auto',
      left:
        left !== undefined && !leftOn && !leftAlign
          ? `-${width}px`
          : leftAlign && leftOn
          ? `${leftAlign}px !important`
          : leftAlign && !leftOn
          ? `-${width}px`
          : 'auto'
    }"
  >
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "Drawer",

  props: {
    active: {
      type: Boolean,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    speed: {
      type: Number,
      required: false
    },
    zIndex: {
      type: Number,
      required: false
    },
    left: {
      required: false
    },
    rightAlign: {
      type: Number,
      required: false
    },
    leftAlign: {
      type: Number,
      required: false
    }
  },

  data() {
    return {
      rightOn: false,
      leftOn: false
    };
  },

  watch: {
    active(val) {
      if (val) {
        if (this.left === undefined) {
          this.rightOn = true;
        } else {
          this.leftOn = true;
        }
      } else {
        if (this.left === undefined) {
          this.rightOn = false;
        } else {
          this.leftOn = false;
        }
      }
    }
  }
};
</script>

<style scoped>
.drawerClass {
  position: fixed;
  top: 0;
  height: 100vh;
  background-color: white;
  overflow-x: hidden;
  z-index: 8;
}

.right {
  -webkit-box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.14);
  box-shadow: -1px 1px 2px rgba(0, 0, 0, 0.14);
}

.left {
  -webkit-box-shadow: 17px 0px 27px -7px rgba(0, 0, 0, 0.3);
  box-shadow: 17px 0px 27px -7px rgba(0, 0, 0, 0.3);
}

.rightOn {
  right: 0px !important;
}
.leftOn {
  left: 0px !important;
}
</style>