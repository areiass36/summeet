<script setup lang="ts">
import { ref } from 'vue';
import AssetColor from './AssetColor.vue';
import { MockedAssets } from '../mocked-assets';
import type { OnUpdateAssetEvent } from './tab';

interface Props { bodyAsset : Asset, eyesAsset: Asset, selectedBodyColor: number, selectedEyesColor: number }
const props = defineProps<Props>();

interface Emits { (e: 'updateBody', event: OnUpdateAssetEvent) : () => void, (e: 'updateEyes', event: OnUpdateAssetEvent) : () => void }
const emit = defineEmits<Emits>();

function onBodyUpdate(color: number) {
    emit('updateBody',{ asset: -1, color });
}

function onEyesUpdate(color: number) {
    emit('updateEyes',{ asset: -1, color });
}
</script>

<template>
Body
<AssetColor :asset="props.bodyAsset" 
:selected-color="props.selectedBodyColor"
@update="e => onBodyUpdate(e.color)"/>
Eyes
<AssetColor :asset="props.eyesAsset" 
:selected-color="props.selectedEyesColor"
@update="e => onEyesUpdate(e.color)"/>
</template>