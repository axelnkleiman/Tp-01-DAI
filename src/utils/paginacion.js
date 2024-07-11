import "dotenv/config";

const BASE_URL = process.env.BASE_URL;

export class PaginationDto {
  limit;
  offset;
  nextPage;
  total;
}

export class Paginacion {
  limitRegex = /limit=\d+/;
  offsetRegex = /offset=\d+/;

  parseLimit(limit) {
    return !isNaN(parseInt(limit)) ? parseInt(limit) : 15;
  }

  parseOffset(offset) {
    return !isNaN(parseInt(offset)) ? parseInt(offset) : 0; 
  }

  buildPaginationDto(limit, currentOffset, total, path) {
    const response = new PaginationDto();
    response.limit = limit;
    response.offset = currentOffset;
    response.total = total;
    if (limit !== -1) {
      response.nextPage =
        limit * (currentOffset + 1) < total 
          ? this.buildNextPage(path, limit, currentOffset)
          : null;
    }
    return response;
  }

  buildNextPage(path, limit, currentOffset) {
    let url = BASE_URL + path;
    const nextOffset = currentOffset + limit;

    if (this.limitRegex.test(url)) {
      url = url.replace(this.limitRegex, `limit=${limit}`);
    } else {
      url = `${url}${url.includes("?") ? "&" : "?"}limit=${limit}`;
    }

    if (this.offsetRegex.test(url)) {
      url = url.replace(this.offsetRegex, `offset=${nextOffset}`);
    } else {
      url = `${url}${url.includes("?") ? "&" : "?"}offset=${nextOffset}`;
    }

    return url;
  }
}
