import holder from '@/assets/holder.png';
import { ConnectedPlayer } from '@/models/connected-player';
import type { Player } from '@/models/player';
import { meetingStore } from '@/stores/meeting';
import { onMounted, onUnmounted, reactive, ref } from "vue";
import type { Message, MessageContent } from '@/models/message';
import { pl } from 'vuetify/locale';
import { MessageType } from '@/common/message-type';
import { useWebSocket } from '@/hooks/useWebSocket';
import type { PlayerDisconnected } from '@/models/player-disconnected';
import { connectedPlayersStore } from '@/stores/connectedPlayer';

export function usePlayerSocket(url: string) {
	const socket = useWebSocket(url);
	const { connections } = connectedPlayersStore();

	let shouldReconnect = true;

	onMounted(() => {
		shouldReconnect = true;
	});
	socket.onClosed(() => {
		if (shouldReconnect) {
			//console.log("Reconnecting...");
			//socket.connect();
		}
	})

	socket.onMessage((event: string) => {
		const message = JSON.parse(event) as Message;
		const handler = {
			[MessageType.playerInfo]: onPlayerInfoReceived,
			[MessageType.playerDisconnected]: onPlayerDisconnected
		}[message.type];
		handler(message);
	});

	function onPlayerInfoReceived(event: Message) {
		const message = event as MessageContent<Player>;
		const content = message.content;
		const img = document.createElement("img");
		img.src = holder;
		const player = connections.get(message.content.user.id) || new ConnectedPlayer(img, content.position, content.direction, content.user);
		player.position = content.position;
		player.direction = content.direction;
		connections.set(player.user.id, player);
	}

	function onPlayerDisconnected(event: Message) {
		const message = event as MessageContent<PlayerDisconnected>;
		connections.delete(message.content.user);
	}

	function sendPlayerInfo(player: Player) {
		if (!socket) return;
		socket.sendMessage({ type: MessageType.playerInfo, content: player });
	}

	return { sendPlayerInfo }
}
