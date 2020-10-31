import type { Player } from "saurus/src/player.ts";
import type { Server } from "saurus/src/server.ts";

export class PlayerJoinLog {
  readonly config = {
    join: (p: Player) => `${p.name} joined the game`,
    quit: (p: Player) => `${p.name} left the game`
  }

  /**
   * Plugin that logs when a player join/leave a given server.
   * @param server Server to enable the plugin on
   */
  constructor(readonly player: Player) {
    const { config } = this

    console.log(config.join(player))

    player.once(["quit"], () =>
      console.log(config.quit(player)))
  }
}

export class ServerJoinLog {
  readonly config = {
    connect: (server: Server) =>
      `${server.name} connected`,
    disconnect: (server: Server, reason?: string) =>
      `${server.name} disconnected (${reason || "Unknown"})`,
  }

  /**
   * Server plugin that logs when the server is connected/disconnected.
   * @param server Server you want to activate the plugin on
   */
  constructor(server: Server) {
    const { config } = this;

    console.log(config.connect(server))

    server.once(["close"], (e) =>
      console.log(config.disconnect(server, e.reason)))
  }
}