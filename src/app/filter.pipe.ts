import { Pipe, PipeTransform } from "@angular/core";
@Pipe({
  name: "filter"
})
export class FilterPipe implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if (!items) return [];
    // if (!searchText) return items;
    if (searchText) {
      if (
        !searchText.searchString &&
        !searchText.startDate &&
        !searchText.endDate
      ) {
        return items;
      } else {
        if (searchText.searchString) {
          items = items.filter(it => {
            return it.to_firstname == searchText.searchString ||
              it.from_firstname == searchText.searchString
              ? it
              : null;
          });
        }

        if (searchText.startDate) {
          items = items.filter(it => {
            var ourDate = new Date(it.updatedAt);
            var searchDate = new Date(searchText.startDate);
            if (ourDate > searchDate) {
              return it;
            } else {
              return null;
            }
          });
        }

        if (searchText.endDate) {
          items = items.filter(it => {
            var ourDate = new Date(it.updatedAt);
            var searchDate = new Date(searchText.endDate);
            if (ourDate < searchDate) {
              return it;
            } else {
              return null;
            }
          });
        }

        return items;
      }
    }
  }
}

@Pipe({
  name: "userFilter"
})
export class FilterUsers implements PipeTransform {
  transform(items: any[], searchText): any[] {
    if (!items) return [];
    if (!searchText.type) {
      return items;
    }
    items = items.filter(it => {
      // console.log(it);
      return searchText.type == "merchant"
        ? it.is_merchant == 1
          ? it
          : null
        : it.is_merchant == 0
        ? it
        : null;
    });
    return items;
  }
}
