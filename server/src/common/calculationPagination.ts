import { BadRequestException } from '@nestjs/common';
import { IPagination } from '../interfaces/pagination.interface';

export function calculationPagination(
  counts: number,
  take: number,
  skip: number,
): IPagination {
  const totalPages: number = Math.ceil(counts / take);

  const currentPage: number = counts ? Math.floor(skip / take) + 1 : 0;

  if (currentPage > totalPages || skip === counts)
    throw new BadRequestException('Page not found');

  return {
    totalPages,
    currentPage,
    next: currentPage < totalPages,
    prev: currentPage > 1,
    counts,
  };
}
