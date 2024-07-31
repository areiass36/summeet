<template>
    <CharacterCreator />
</template>

<script setup lang="ts">
import CharacterCreator from '@/components/shared/CharacterCreator/CharacterCreator.vue';
import AssetColor from '@/components/shared/CharacterCreator/Tabs/AssetColor.vue';
const asset : Asset = {
    key: "shirt",
    variants: [
        {
            color: "#ffffff",
            fileUrl: "seila"
        },
        {
            color: "#ff0000",
            fileUrl: "seila"
        },
        {
            color: "#00ffff",
            fileUrl: "seila"
        },
        {
            color: "#0000ff",
            fileUrl: "seila"
        },
        {
            color: "#00ff00",
            fileUrl: "seila"
        },
    ]
}
</script>