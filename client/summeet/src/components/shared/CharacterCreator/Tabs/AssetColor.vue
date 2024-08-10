<script lang="ts" setup>
import { defineProps, ref, computed } from 'vue';
import type { OnUpdateAssetEvent } from './tab';

interface Props { asset: Asset, selectedColor: number }
const props = defineProps<Props>()

interface Emits { (e: 'update', event : OnUpdateAssetEvent) : () => void }
const emit = defineEmits<Emits>();

function onUpdate(color: number) {
    emit('update', { asset: -1, color: color});
}
</script>

<template>
    <v-chip-group>
        <v-chip v-for="(v,i) in props.asset.variants" 
        class="color"
        :key="i"
        :color="v.color" 
        :style="{ 'border-color': v.color }"
        @click="onUpdate(i)"
        :variant="props.selectedColor === i ? 'elevated': 'outlined'"
        />
    </v-chip-group>
</template>

<style scoped>
.color {
    width: 30px;
    height: 30px;
}
</style>