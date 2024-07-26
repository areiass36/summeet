import { PlayerController } from './action-keys'
import { type Screen } from './screen'
import type { Layer } from './layer'
import type { Player } from './player'
import type { ConnectedPlayer } from './connected-player'

export interface State {
	controller: PlayerController,
	localPlayer: Player,
	onlinePlayers: Map<number, ConnectedPlayer>
	layer: Layer,
	ctx: CanvasRenderingContext2D,
	screen: Screen,
}
