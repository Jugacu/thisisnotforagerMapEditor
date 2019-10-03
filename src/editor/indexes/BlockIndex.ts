export type IBlockIndex = {
    [key: number]: IBlockIndexData;
};

export type IBlockIndexData = {
    name: string,
    color: number
};

export default class BlockIndex {
    public static readonly index: IBlockIndex = {
        0: {name: 'water', color: 0x2299db},
        1: {name: 'grass', color: 0x63c74d},
        2: {name: 'sand', color: 0xfee761},
        3: {name: 'lava', color: 0xcf1020},
    };

    public static getBlockData(id: number): IBlockIndexData {
        return BlockIndex.index[id];
    }

    public static getId(name: string): number {
        return parseInt(Object.keys(BlockIndex.index).find((key: any): boolean => BlockIndex.index[key].name === name));
    }
}