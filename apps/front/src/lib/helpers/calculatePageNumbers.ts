export const calculatePageNumbers = (
  { totalPages, currentPage, oneSidePageNeighborsAmount }:
  {
    totalPages: number,
    currentPage: number,
    oneSidePageNeighborsAmount: number
  }) => {
  // 3 - текущая страница, первая страница и последняя страница
  const totalNumbers = oneSidePageNeighborsAmount * 2 + 3;
  //потому что с двух сторон от блоков с номерами страниц могут быть блоки с ...
  const totalBlocks = totalNumbers + 2;

  if (totalPages > totalBlocks) {
    //Страница с номером 1 отображается всегда, поэтому startPage не может быть меньше 2
    const startPage = Math.max(2, currentPage - oneSidePageNeighborsAmount);
    //Последняя страница всегда отображается, поэтому номер endPage не может быть больше или равен totalPages.
    const endPage = Math.min(totalPages - 1, currentPage + oneSidePageNeighborsAmount);

    //Создаём массив с номерами страниц.
    let pages: (string | number)[] = Array.from(
      { length: endPage - startPage + 1 },
      (_, index) => startPage + index);

    //При необходимости добавляем ... в начале массива.
    if (startPage > 2) {
      pages = ['...', ...pages];
    }

    //При необходимости добавляем ... в конце массива.
    if (endPage < totalPages - 1)
      pages = [...pages, '...'];

    //Первая и последняя страницы отображаются всегда, поэтому дополнительно добавляем их в начало и конец массива.
    return [1, ...pages, totalPages];
  }

  //Если общее количество страниц меньше или равно totalBlocks, то отображаются все номера страниц, т.е. блоки пропуска (...) не требуются.
  return Array.from({ length: totalPages }, (_, index) => index + 1);
};