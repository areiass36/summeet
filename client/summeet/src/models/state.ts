import { type Screen } from './screen'
import type { Layer } from './layer'
import type { Player } from './player'
import type { ConnectedPlayer } from './connected-player'
import type { KeysController } from '@/controllers/keys-controller'

export interface State {
	controller: KeysController,
	localPlayer: Player,
	onlinePlayers: Map<number, ConnectedPlayer>
	layer: Layer,
	ctx: CanvasRenderingContext2D,
	screen: Screen,
}
