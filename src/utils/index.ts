export function hasIncompleteFields(object: object) {
    return Object.values(object).some((value) => value === undefined || value === null || value === '');
}