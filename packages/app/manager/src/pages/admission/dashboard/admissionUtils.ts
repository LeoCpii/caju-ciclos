import type { CandidateData } from '@caju/services/candidates';

export function _generateNewOrderedColumn(column: CandidateData[], card: CandidateData, position: number) {
    const currentIndex = column.findIndex(({ id }) => id === card.id);

    const indexToInsert = position > currentIndex ? position + 1 : position;

    // Remove old card
    const newColumnCards = column.filter(({ id }) => id !== card.id);

    // Add new card
    newColumnCards.splice(indexToInsert, 0, card);

    return newColumnCards;
}