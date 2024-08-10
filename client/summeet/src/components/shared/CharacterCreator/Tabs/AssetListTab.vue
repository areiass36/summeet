<script setup lang="ts">
import { ref, type Ref } from 'vue';
import AssetColor from './AssetColor.vue';
import { MockedAssets } from '../mocked-assets';
import type { OnUpdateAssetEvent } from './tab';

interface Emits { (e: 'update', event: OnUpdateAssetEvent) : () => void }
const emit = defineEmits<Emits>();

interface Props { assets : Asset[], selectedAsset: number, selectedColor: number };
const props = defineProps<Props>();

function onUpdate(asset: number, color: number) {
    emit('update', { asset, color });
}
</script>

<template>
    <section class="assetList">
        <div class="assets">
            <v-chip class="asset" v-for="(a, i) in props.assets"
            label
            @click="onUpdate(i, selectedColor)"
            color="#ccc"
            :variant="selectedAsset === i ? 'elevated' : 'outlined'">
                <div class="img">
                    <img :src="a.variants[0].fileUrl"></img>
                </div>
            </v-chip>
        </div>
        <AssetColor 
        :asset="assets[selectedAsset]" 
        :selectedColor="selectedColor"
        @update="e => onUpdate(selectedAsset, e.color)"/>
    </section>
</template>

<style scoped>
.assetList {
    height: 100%;
    width: 100%;
    display: grid;
    grid-template-rows: 2fr 1fr;
}

.assets {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: start;
    align-content: start;
    flex-wrap: wrap;
    overflow-y: auto;
    gap: 8px;
}

.img {
    width: 48px;
    height: 96px;
    overflow: hidden;
    scale: .6;
}

.img img {
    height: auto;
    width: auto;
    background-position: left top;
}

.asset {
    height: 50px !important;
    width: 50px !important;
    display: flex;
    justify-content: center;
}
</style>