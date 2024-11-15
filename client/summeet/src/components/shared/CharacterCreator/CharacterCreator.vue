<script setup lang="ts">
import { reactive, ref, type Ref } from 'vue';
import AssetBodyTab from './Tabs/AssetBodyTab.vue';
import { Tabs } from './Tabs/tab';
import AssetListTab from './Tabs/AssetListTab.vue';
import { MockedAssets } from './mocked-assets';

const assets = MockedAssets;
const tab = ref<Tabs>(Tabs.Hairstyle);

interface Character {
    body: CharacterAsset,
    eyes: CharacterAsset,
    hairstyle: CharacterAsset 
    outfit: CharacterAsset
}
interface CharacterAsset {
    asset: number, 
    color: number
}

const char : Ref<Character> = ref({
    body: {
        asset: -1,
        color: 3,
    },
    eyes: {
        asset: -1,
        color: 2,
    },
    hairstyle: {
        asset: 1,
        color: 2
    },
    outfit: {
        asset: 0,
        color: 1
    }
});
</script>

<template>
    <v-card>
        <v-tabs v-model="tab" bg-color="primary" align-tabs="center">
            <v-tab :value="Tabs.Body">Body</v-tab>
            <v-tab :value="Tabs.Hairstyle">Hair</v-tab>
            <v-tab :value="Tabs.Outfit">Outfit</v-tab>
            <v-tab :value="Tabs.Accessories">Accesories</v-tab>
        </v-tabs>

        <v-card-text>
            <div class="player">
                <v-img :lazy-src="`https://picsum.photos/10/6?image=10`" :src="`https://picsum.photos/500/300?image=10`" cover></v-img>
            </div>
            <v-tabs-window v-model="tab">
                <v-tabs-window-item :value="Tabs.Body">
                    <AssetBodyTab 
                    :body-asset="assets.body"
                    :eyes-asset="assets.body"
                    :selected-body-color="char.body.color"
                    :selected-eyes-color="char.eyes.color"
                    @update-body="e => char.body = e"
                    @update-eyes="e => char.eyes = e"/>
                </v-tabs-window-item>

                <v-tabs-window-item :value="Tabs.Hairstyle">
                    <AssetListTab :assets="assets.hairstyle" 
                    :selected-asset="char.hairstyle.asset" 
                    :selected-color="char.hairstyle.color" 
                    @update="e => char.hairstyle = e"/>
                </v-tabs-window-item>

                <v-tabs-window-item :value="Tabs.Outfit">
                    <AssetListTab :assets="assets.outfits" 
                    :selected-asset="char.outfit.asset" 
                    :selected-color="char.outfit.color" 
                    @update="e => char.outfit = e"/>
                </v-tabs-window-item>

                <v-tabs-window-item :value="Tabs.Accessories">
                <div>Hello man</div>
                </v-tabs-window-item>
            </v-tabs-window>
        </v-card-text>
    </v-card>
</template>

<style scoped>
.v-card {
    width: 80%;
    height: 50%;
}

.v-card-text {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
    height: 100%;
    width: 100%;
}

.v-card-text:nth-child(n) {
    height: 100%;
    width: 100%;
}

.v-tabs-window, .v-tabs-window-item {
    height: 100%;
}

</style>