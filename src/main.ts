import { Firebot } from "@crowbartools/firebot-custom-scripts-types";
import {SendRconEffect} from "./send-rcon-effect";

const script: Firebot.CustomScript<{}> = {
  getScriptManifest: () => {
    return {
      name: "Minecraft Multi-RCON",
      description: "A starter custom script for build",
      author: "SomeDev",
      version: "1.0",
      firebotVersion: "5",
    };
  },
  getDefaultParameters: () => {
    return { };
  },
  run: (runRequest) => {
    runRequest.modules.effectManager.registerEffect(SendRconEffect);
  },
};

export default script;
