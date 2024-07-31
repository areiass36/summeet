<template>
    <section>
        <div v-for="v in asset.variants" class="color" :style="styles[v.color]"></div>
    </section>
</template>

<script lang="ts" setup>
import { defineComponent, reactive, defineModel, defineProps, ref, computed } from 'vue';

interface Props { asset: Asset }
const props = defineProps<Props>()

type Style = { 'background-color': string, 'border-color': string }

const styles = computed(() => { 
    const styles : { [key : string]: Style }= {};
    props.asset.variants.forEach(v => styles[v.color] = { "background-color": v.color, "border-color": `${v.color}` });
    return styles;
});
</script>

<style scoped>
section {
    display: flex;
    gap: 1rem;
}

.color {
    height: 1.5rem;
    width: 1.5rem;
    border-radius: var(--border-radius-small);
    box-sizing: border-box; 
}
</style>