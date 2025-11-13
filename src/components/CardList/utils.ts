// interface Card {
//   accountHolder: unknown;
//   openDate: unknown;
// }

// interface CardWithRequiredProps extends Card {
//   accountHolder: string;
//   openDate: string;
// }

// const hasAccountHolder = (accountHolder: unknown) =>
//   typeof accountHolder === 'string';
// const hasOpenDate = (openDate: unknown) => typeof openDate === 'string';
// const isValidCard = (card: Card): card is CardWithRequiredProps =>
//   hasAccountHolder(card?.accountHolder) && hasOpenDate(card?.openDate);

// export const getSortedCards = (cards: Card[]) => {
//   const normalizeCardsData = cards.filter((c) => isValidCard(c));

//   const sortedByHolder = normalizeCardsData.sort((a, b) =>
//     a.accountHolder.localeCompare(b.accountHolder, 'ru', {
//       sensitivity: 'base',
//     })
//   );

//   const map = new Map<string, CardWithRequiredProps[]>();

//   return sortedByDateInsideEachHolderRange;
// };

// Object.values(cardsData) as CardData[];
// const sortCards = useCallback((cards: CardData[]): CardData[] => {
//   return cards.sort((a, b) => {
//     // First, sort by openDate (newest first) - if available
//     if (a.openDate && b.openDate) {
//       const dateA = new Date(a.openDate).getTime();
//       const dateB = new Date(b.openDate).getTime();
//       if (dateA !== dateB) {
//         return dateB - dateA; // newest first
//       }
//     }

//     // Then sort by accountHolder (alphabetically)
//     const holderA = a.accountHolder || '';
//     const holderB = b.accountHolder || '';
//     if (holderA !== holderB) {
//       return holderA.localeCompare(holderB, 'ru');
//     }

//     // Finally, sort by card number as fallback
//     return a.number.localeCompare(b.number);
//   });
// }, []);
// const cardsArray: CardData[] = sortCards(portfolioCardsArray);

import { orderBy } from 'lodash-es';
import { parseISO, isValid } from 'date-fns';

interface Card {
  accountHolder: unknown;
  openDate: unknown;
}

interface CardWithRequiredProps extends Card {
  accountHolder: string;
  openDate: string;
}

const isString = (v: unknown): v is string => typeof v === 'string';
const isIsoDate = (v: string): boolean => {
  const parsed = parseISO(v.trim());
  return isValid(parsed);
};

const isValidCard = (c: Card): c is CardWithRequiredProps =>
  isString(c.accountHolder) && isString(c.openDate) && isIsoDate(c.openDate);

export const getSortedCards = (cards: Card[]): CardWithRequiredProps[] => {
  const validCards = cards.filter(isValidCard);

  return orderBy<CardWithRequiredProps[]>(
    validCards,
    [
      (c: CardWithRequiredProps) =>
        c.accountHolder?.toString().trim().toLowerCase(),
      (c: CardWithRequiredProps) => parseISO(c.openDate.trim()).getTime(),
    ],
    ['asc', 'desc']
  );
};

export const sortCards = (cards: []): [] => {
  return [...cards].sort((a, b) => {
    // Then sort by accountHolder (alphabetically)
    const holderA = a.accountHolder || '';
    const holderB = b.accountHolder || '';
    if (holderA !== holderB) {
      return holderA.localeCompare(holderB, 'ru');
    }

    // First, sort by openDate (newest first) - if available
    if (a.openDate && b.openDate) {
      const dateA = new Date(a.openDate).getTime();
      const dateB = new Date(b.openDate).getTime();
      if (dateA !== dateB) {
        return dateB - dateA; // newest first
      }
    }

    // Finally, sort by card number as fallback
    return a.number.localeCompare(b.number);
  });
};
