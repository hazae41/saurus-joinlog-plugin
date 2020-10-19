import type { Player } from "saurus/player.ts";
import type { Server } from "saurus/server.ts";

export class PlayerJoinLog {
  config = {
    join: (p: Player) => `${p.name} joined the game`,
    quit: (p: Player) => `${p.name} left the game`
  }

  /**
   * Plugin that logs when a player join/leave a given server.
   * @param server Server to enable the plugin on
   */
  constructor(readonly server: Server) {
    const offjoin = server.players.on(["join"],
      (p) => console.log(this.config.join(p)))

    const offquit = server.players.on(["quit"],
      (p) => console.log(this.config.quit(p)))

    server.once(["close"], offjoin, offquit)
  }
}

export class ServerJoinLog {
  config = {
    connect: (server: Server) =>
      `${server.name} connected`,
    disconnect: (server: Server, reason: string) =>
      `${server.name} disconnected (${reason})`,
  }

  /**
   * Server plugin that logs when the server is connected/disconnected.
   * @param server Server you want to activate the plugin on
   */
  constructor(server: Server) {
    console.log(this.config.connect(server))

    server.once(["close"], (e) =>
      console.log(this.config.disconnect(server, e.reason)))
  }
}