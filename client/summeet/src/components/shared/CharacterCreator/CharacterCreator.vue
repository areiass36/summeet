<script setup lang="ts">
import { reactive } from 'vue';

const items = reactive([0,1,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,3,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]);
</script>

<template>
<section>
    <v-bottom-navigation mode="shift">
        <v-btn value="recent">
            <v-icon>mdi-history</v-icon>

            <span>Recent</span>
        </v-btn>

        <v-btn value="favorites">
            <v-icon>mdi-heart</v-icon>

            <span>Favorites</span>
        </v-btn>

        <v-btn value="nearby">
            <v-icon>mdi-map-marker</v-icon>

            <span>Nearby</span>
        </v-btn>
    </v-bottom-navigation>
    <div class="character">
        
    </div>
    <div class="tabs">
        <div class="items">
            <div v-for="i in items" class="item">

            </div>
        </div>
        <div class="colors">

        </div>
    </div>  
</section>
</template>

<style scoped>
section {
    background-color: red;
    display: flex;
    width: 50rem;
    height: 40rem;
    padding: 2rem;
    align-items: center;
}

.character {
    background-color: gray;
    width: 40%;
    height: 75%;
}

.items {
    display: grid;
    background-color: green;
    width: 100%;
    height: 80%;
    padding: 1rem;
    gap: 1rem;
    grid-template-columns: repeat(4, 1fr);
    grid-template-rows: 5rem;
    align-self: flex-start;
    justify-items: center;
    overflow-y: scroll;
}

.item {
    background-color: white;
    height: 5rem;
    width: 5rem;
    cursor: pointer;
}

.assets {
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 60%;
}

.colors {
    background-color: black;
    height: 20%;
    width: 100%;
}
</style>