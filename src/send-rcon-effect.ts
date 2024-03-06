import {Firebot} from "@crowbartools/firebot-custom-scripts-types";
import {Rcon} from "rcon-client";

export const SendRconEffect: Firebot.EffectType<{
    host: string;
    port: number;
    password: string;
    command: string;
}> = {
    definition: {
        id: "dennisrijsdijk:send-mc-rcon-command",
        name: "Send Minecraft RCON Command",
        description: "Send an RCON command to a specified MC Server",
        icon: "fad fa-terminal",
        categories: ["scripting"]
    },
    //language=HTML
    optionsTemplate: `
        <div>
            <eos-container header="RCON Details">
                <firebot-input style="margin-top: 10px;" input-title="Host" model="effect.host" placeholder-text="Enter Host"></firebot-input>
                <firebot-input style="margin-top: 10px;" input-title="Port" model="effect.port" input-type="number" placeholder-text="Enter Port"></firebot-input>
                <firebot-input style="margin-top: 10px;" input-title="Password" model="effect.password" type="password" placeholder-text="Enter Password"></firebot-input>
            </eos-container>
            
            <eos-container header="Command" pad-top="true">
                <firebot-input input-title="Command" model="effect.command" placeholder-text="Enter Command"></firebot-input>
            </eos-container>
        </div>
    `,
    optionsController: ($scope) => {
        if ($scope.effect.host == null) {
            $scope.effect.host = "";
        }
        if ($scope.effect.port == null) {
            $scope.effect.port = 0;
        }
        if ($scope.effect.password == null) {
            $scope.effect.password = "";
        }
        if ($scope.effect.command == null) {
            $scope.effect.command = "";
        }
    },
    optionsValidator: (effect) => {
        const errors: string[] = [];
        if (effect.host === "") {
            errors.push("Please set a host.");
        }
        if (effect.port === 0) {
            errors.push("Please set a port.");
        }
        if (effect.password === "") {
            errors.push("Please set a password.");
        }
        if (effect.command === "") {
            errors.push("Please enter a command.");
        }
        return errors;
    },
    onTriggerEvent: async ({effect}) => {
        const rcon = new Rcon({
            host: effect.host,
            port: effect.port,
            password: effect.password
        });

        const promise = new Promise<void>((resolve, reject) => {
            rcon.on("authenticated", async () => {
                await rcon.send(effect.command);
                await rcon.end();
                resolve();
            })

            rcon.on("error", async () => {
                await rcon.end();
                reject();
            });
        });

        await promise;
    }
}