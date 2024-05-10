/*export class PaginationDto{
    limit;
    offset;
    nextpage;
    total;
}

export class Pagination {
    limitRegex = /limit=\d+/;
    offsetRegex = /offset=\d+/;

    parseLimit(limit){
    return !isNaN(parseInt(limit)) ? parseInt(limit) : 15;
    }

    parseOff(offset){
        return !isNaN (parseInt(offset)) ? parseInt(offset) : 0;
    }

    buildPaginationDto(limit, currenOffset, total, path){
        const response = new PaginationDto();
        response.limit = limit;
        response.offset = currenOffset;
        response.total = total;
        if(limit !== -1){
            response.nextPage = limit + currentOffset < total ? this.builNextPage(path, limit, currenOffset)
        }
        return response;
    }
    buildNextPage(path, limit, currenOffset){
        let url = BASE
    }
}
*/