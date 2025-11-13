import React from 'react';
import { mockCardList } from './mockCardList';
import { sortCards } from './utils';

type WordForms = [string, string, string];
type Amount = string | number;
type SplitAmount = [string, string];

const RANGES = {
  BILLION: 1000000000,
  MILLION: 1000000,
  THOUSAND: 1000,
  ONE: 1,
};

const RUBLE_FORMS: WordForms = ['рубль', 'рубля', 'рублей'];
const KOPECK_FORMS: WordForms = ['копейка', 'копейки', 'копеек'];

const RUB_RANGES: { value: number; forms: WordForms }[] = [
  { value: RANGES.BILLION, forms: ['миллиард', 'миллиарда', 'миллиардов'] },
  { value: RANGES.MILLION, forms: ['миллион', 'миллиона', 'миллионов'] },
  { value: RANGES.THOUSAND, forms: ['тысяча', 'тысячи', 'тысяч'] },
  { value: RANGES.ONE, forms: RUBLE_FORMS },
];

// функция склонения слов
const getWordForm = (amount: number, wordForms: WordForms): string => {
  const lastTwoDigits = amount % 100;
  const lastDigit = amount % 10;

  // правило для чисел от 11 до 19
  if (lastTwoDigits > 10 && lastTwoDigits < 20) return wordForms[2];
  // правило для чисел, заканчивающихся на 2, 3, 4 (кроме 12-14)
  if (lastDigit > 1 && lastDigit < 5) return wordForms[1];
  // правило для чисел, заканчивающихся на 1 (кроме 11)
  if (lastDigit === 1) return wordForms[0];

  return wordForms[2];
};

const splitAmount = (amount: Amount): SplitAmount => {
  const [rub = '', kop = ''] = String(amount).replace(/\./g, ',').split(',');

  return [rub.replace(/\D/g, ''), kop.replace(/\D/g, '').slice(0, 2)];
};

const splitNumberByRanges = (value: number): number[] => {
  let remaining = value;

  return RUB_RANGES.map(({ value: rangeValue }) => {
    const rangeNum = Math.floor(remaining / rangeValue);
    remaining %= rangeValue;
    return rangeNum;
  });
};

const getKopeckString = (kopStr: string): string | null => {
  if (!kopStr) return null;

  const kopNum = Number(kopStr.length === 1 ? kopStr + '0' : kopStr);
  if (!kopNum) return null;

  return `${kopNum} ${getWordForm(kopNum, KOPECK_FORMS)}`;
};

const getRublesParts = (rangeCounts: number[]): string[] => {
  return RUB_RANGES.map((range, i) => {
    const count = rangeCounts[i];

    return count > 0 ? `${count} ${getWordForm(count, range.forms)}` : null;
  }).filter(Boolean) as string[];
};

export const rublesToSpeechString = (amount: Amount): string => {
  const [rubStr, kopStr] = splitAmount(amount);

  const rubles = Number(rubStr) || 0;
  const rangeCounts = splitNumberByRanges(rubles);

  // генерируем части по разрядам
  const rubleParts = getRublesParts(rangeCounts);

  // если рублей нет, добавляем "0 рублей"
  if (rubleParts.length === 0) {
    rubleParts.push(`0 ${getWordForm(0, RUBLE_FORMS)}`);
  }

  const kopeckPart = getKopeckString(kopStr);
  if (kopeckPart) rubleParts.push(kopeckPart);

  return rubleParts.join(' ');
};

const CardList = () => {
  console.log('amount', rublesToSpeechString('-11000,9'));
  return (
    <div>
      {sortCards(Object.values(mockCardList)).map((card, index) => (
        <div key={index}>
          {`${card.accountHolder} --- ${card.openDate} --- ${card?.amount?.amount}`}
        </div>
      ))}
    </div>
  );
};

export default CardList;
