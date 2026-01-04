import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { ORDERS } from "../query-keys";
import { orderApi } from "../service";
import { useSearchParams } from "react-router-dom";
import type {
  CountFilter,
  OrderParams,
  OrderStatus,
  SortBy,
  SortDir,
} from "../types";

export default function useGetOrders() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const sortDir = searchParams.get("sortDir");
  const status = searchParams.get("status");
  const statusArray = status
    ? status.split(",").filter((s) => s.trim().length > 0)
    : [];
  const itemCount = searchParams.get("itemCount");
  const countFilter = searchParams.get("countFilter");
  const page = searchParams.get("page") || "1";
  const limit = searchParams.get("limit") || "10";

  const orderParamsObj: OrderParams = {
    page,
    limit,
  };

  if (search && search.length > 0) orderParamsObj.search = search;
  if (sortBy) orderParamsObj.sortBy = sortBy as SortBy;
  if (sortDir) orderParamsObj.sortDir = sortDir as SortDir;
  if (statusArray.length > 0) {
    orderParamsObj.status = statusArray as OrderStatus[];
  }
  if (countFilter && itemCount && itemCount.length > 0) {
    orderParamsObj.countFilter = countFilter as CountFilter;
    orderParamsObj.itemCount = itemCount;
  }

  return useQuery({
    queryKey: [
      ORDERS,
      search,
      sortDir,
      sortBy,
      status,
      countFilter,
      itemCount,
      page,
      limit,
    ],
    queryFn: () => orderApi.getOrders(orderParamsObj),
    placeholderData: keepPreviousData,
  });
}
