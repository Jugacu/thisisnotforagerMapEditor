export type IBlockIndex = {
    [key: number]: IBlockIndexData;
};

export type IBlockIndexData = {
    name: string,
    color: number
};

export default class BlockIndex {
    public static readonly index: IBlockIndex = {
        0: {name: 'water', color: 0x0099db},
        1: {name: 'sand', color: 0xfee761},
        2: {name: 'lava', color: 0xcf1020},
    };

    public static getBlockData(id: number): IBlockIndexData {
        return BlockIndex.index[id];
    }

    public static getId(name: string): number {
        return parseInt(Object.keys(BlockIndex.index).find((key: any): boolean => BlockIndex.index[key].name === name));
    }
}