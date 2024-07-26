import type { ConnectedPlayer } from "@/models/connected-player";
import { defineStore } from "pinia";
import { reactive } from "vue";

export const connectedPlayersStore = defineStore('connectedPlayers', () => {
    const connections = reactive<Map<number, ConnectedPlayer>>(new Map<number, ConnectedPlayer>());
    return { connections };
});