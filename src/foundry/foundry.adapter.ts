const prefix = 'band-of-blades-sheets';
export const foundryAdapter = {
  localize(value: string, options?: Record<string, unknown>) {
    if (options) {
      return game.i18n.format(`${prefix}.${value}`, options);
    }

    return game.i18n.localize(`${prefix}.${value}`);
  },

  hasLocale(value: string): boolean {
    return game.i18n.has(`${prefix}.${value}`);
  },
  async requestItemsFromCompendium(key: string): Promise<any[]> {
    const pack = game.packs.get(key);
    return pack.getDocuments();
  }

}