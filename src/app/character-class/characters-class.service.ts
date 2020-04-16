export class CharactersClassService {
  private charactersClasses: object[] = [
    {
      iconLink: 'https://wow.zamimg.com/images/wow/icons/large/classicon_warrior.jpg',
      color: '#C79C6E',
      name: 'Warrior'
    },
    {
      iconLink: 'https://wow.zamimg.com/images/wow/icons/large/classicon_mage.jpg',
      color: '#40C7EB',
      name: 'Mage'
    },
    {
      iconLink: 'https://wow.zamimg.com/images/wow/icons/large/classicon_paladin.jpg',
      color: '#F58CBA',
      name: 'Paladin'
    },
    {
      iconLink: 'https://wow.zamimg.com/images/wow/icons/large/classicon_hunter.jpg',
      color: '#A9D271',
      name: 'Hunter'
    },
    {
      iconLink: 'https://wow.zamimg.com/images/wow/icons/large/classicon_druid.jpg',
      color: '#FF7D0A',
      name: 'Druid'
    },
    {
      iconLink: 'https://wow.zamimg.com/images/wow/icons/large/classicon_warlock.jpg',
      color: '#8787ED',
      name: 'Warlock'
    },
    {
      iconLink: 'https://wow.zamimg.com/images/wow/icons/large/classicon_deathknight.jpg',
      color: '#C41F3B',
      name: 'Death Knight'
    },
    {
      iconLink: 'https://wow.zamimg.com/images/wow/icons/large/classicon_shaman.jpg',
      color: '#0070DE',
      name: 'Shaman'
    },
    {
      iconLink: 'https://wow.zamimg.com/images/wow/icons/large/classicon_rogue.jpg',
      color: '#FFF569',
      name: 'Rogue'
    },
  ];

  getCharactersData(): object[] {
    return [...this.charactersClasses];
  }
}
