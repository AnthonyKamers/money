<template>
    <v-menu
        v-model="menu"
        :close-on-content-click="true"
        :nudge-width="200"
        offset-x
        >
        <template v-slot:activator="{ on, attrs }">
            <div
                class="square"
                :style="{ backgroundColor: color }"
                v-bind="attrs"
                v-on="on"
            ></div>
        </template>

        <v-card>
            <div class="color-picker">
                <div v-for="(cor, index) in colors" :key="index">
                    <div
                        class="square"
                        :class="{selected: cor == color}"
                        :style="{ backgroundColor: cor }"
                        @click="color = cor"
                    ></div>
                </div>
            </div>
        </v-card>

    </v-menu>
</template>

<script>
export default {
    name: "ColorPicker",

    data() {
        return {
            menu: false,
            color: ""
        }
    },

    watch: {
        color(val) {
            this.$emit("update", val);
        }
    }
}
</script>

<style scoped>
.color-picker {
    background-color: white;
    width: auto;
    display: flex;
    border: 1px solid #a8a8a8;
    box-shadow: 3px 1px 19px 0px rgba(0,0,0,0.75);
    -webkit-box-shadow: 3px 1px 19px 0px rgba(0,0,0,0.75);
    -moz-box-shadow: 3px 1px 19px 0px rgba(0,0,0,0.75);
}

.square {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    cursor: pointer;
}

.selected {
    opacity: 0.7;
}
</style>