export const Query = {
  isValid(query) {
    if (query.length > 50) throw new Error('Query exceeds 50 character limit');
    return query;
  }
};

export const Url = {
  isValid(url) {
    const regex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;
    return !!url.match(regex);
  },
  isValidYoutubeUrl(url) {
    const regex = /^(https?\:\/\/)?(www\.)?(youtube\.com|youtu\.?be)\/.+$/;
    return !!url.match(regex);
  }
};
