import { useQuery } from "@tanstack/react-query";
import { ORDERS } from "../query-keys";
import { orderApi } from "../service";
import { useSearchParams } from "react-router-dom";
import type { OrderParams, OrderStatus, SortBy, SortDir } from "../types";

export default function useGetOrders() {
  const [searchParams] = useSearchParams();

  const search = searchParams.get("search");
  const sortBy = searchParams.get("sortBy");
  const sortDir = searchParams.get("sortDir");
  const status = searchParams.get("status");

  const orderParamsObj: OrderParams = {};

  if (search && search.length > 0) orderParamsObj.search = search;
  if (sortBy) orderParamsObj.sortBy = sortBy as SortBy;
  if (sortDir) orderParamsObj.sortDir = sortDir as SortDir;
  if (status) orderParamsObj.status = status as OrderStatus;

  return useQuery({
    queryKey: [ORDERS, search, sortDir, sortBy, status],
    queryFn: () => orderApi.getOrders(orderParamsObj),
  });
}
