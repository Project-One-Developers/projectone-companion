import { Droptimizer, NewCharacter, Player } from "@/lib/types";
import { contextBridge, ipcRenderer, IpcRendererEvent } from "electron";

const api = {
    addDroptimizer(url: string): Promise<Droptimizer | null> {
        return ipcRenderer.invoke("add-droptimizer", url);
    },
    addCharacter(character: NewCharacter): Promise<Player | null> {
        return ipcRenderer.invoke("add-character", character);
    },
};

export const ipc = {
    send(channel: string, value: unknown) {
        ipcRenderer.send(channel, value);
    },
    on(channel: string, callback: (...args: unknown[]) => void) {
        const subscription = (_event: IpcRendererEvent, ...args: unknown[]) =>
            callback(...args);
        ipcRenderer.on(channel, subscription);
        return () => {
            ipcRenderer.removeListener(channel, subscription);
        };
    },
    api,
};

contextBridge.exposeInMainWorld("ipc", ipc);
