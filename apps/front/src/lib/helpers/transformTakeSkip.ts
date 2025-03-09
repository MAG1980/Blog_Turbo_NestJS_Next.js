import { DEFAULT_PAGE_SIZE } from 'server/dist/src/constants';

export const transformTakeSkip = (
  { pageNumber, pageSize = DEFAULT_PAGE_SIZE }
  :
  { pageNumber?: number, pageSize?: number }) => ({
  skip: ((pageNumber ?? 1) - 1) * pageSize,
  take: pageSize,
});