import * as IPFS from 'ipfs-core';

export class IFPSSingleton {
    private static ipfs: IPFS.IPFS;
    public static async getInstance() {
        if (!this.ipfs) {
            this.ipfs = await IPFS.create();
        }
        return this.ipfs;
    }
}
