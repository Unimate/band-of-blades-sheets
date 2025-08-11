interface ItemVariant {
  label: string;
  fine: boolean;
  description?: string;
}

export interface ILoadItem {
  primary: ItemVariant;
  alternative?: ItemVariant;
  usages: number;
  usesLoadSlot: number;
}