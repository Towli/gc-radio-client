export const Query = {
  isValid(query) {
    if (query.length > 50) throw new Error('Query exceeds 50 character limit');
    return query;
  }
};
