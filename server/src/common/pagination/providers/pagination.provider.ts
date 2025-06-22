import { Inject, Injectable } from "@nestjs/common";
import { PaginationQueryDto } from "../dtos/pagination-query.dto";
import { FindOptionsWhere, ObjectLiteral, Repository } from "typeorm";
import { Request } from "express";
import { REQUEST } from "@nestjs/core";
import { Paginated } from "../interfaces/paginated.interface";

@Injectable()
export class PaginationProvider {
  constructor(
    @Inject(REQUEST)
    private readonly request: Request
  ) {}

  public async paginateQuery<T extends ObjectLiteral>(
    paginationQuery: PaginationQueryDto,
    repository: Repository<T>,
    findBy?: string,
    orderBy?: string
  ): Promise<Paginated<T>> {
    const skip = (paginationQuery.page! - 1) * paginationQuery.limit!;
    const whereClause: FindOptionsWhere<T> = findBy
      ? (JSON.parse(findBy) as FindOptionsWhere<T>)
      : {};

    const results = await repository.find({
      where: whereClause,
      skip,
      take: paginationQuery.limit,
      order: orderBy ? JSON.parse(orderBy) : undefined,
    });

    const totalItems = await repository.count({ where: whereClause });
    const totalPages = Math.ceil(totalItems / paginationQuery.limit!);
    const next =
      paginationQuery.page! === totalPages
        ? paginationQuery.page
        : paginationQuery.page! + 1;

    const prev =
      paginationQuery.page === 1
        ? paginationQuery.page
        : paginationQuery.page! - 1;

    const baseUrl = `${this.request.protocol}://${this.request.headers.host}/`;
    const newUrl = new URL(this.request.url, baseUrl);

    const response: Paginated<T> = {
      data: results,
      meta: {
        totalItems,
        totalPages,
        currentPage: paginationQuery.page!,
        itemsPerPage: paginationQuery.limit!,
      },
      links: {
        first: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit!}&page=${1}`,
        last: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit!}&page=${totalPages}`,
        current: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit!}&page=${paginationQuery.page}`,
        next: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit!}&page=${next}`,
        prev: `${newUrl.origin}${newUrl.pathname}?limit=${paginationQuery.limit!}&page=${prev}`,
      },
    };

    return response;
  }
}
