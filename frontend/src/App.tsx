import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./config/query-client";
import OrdersTable from "./components/orders-table";
import SearchBar from "./components/search-bar";
import { BrowserRouter } from "react-router-dom";
import Select from "./components/select";

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <div className="w-full h-full flex justify-center items-center flex-col gap-4 p-4">
          <SearchBar />
          <div className="flex gap-2">
            <Select
              label="Sort by"
              searchParamValue="sortBy"
              options={[
                {
                  value: "totalAmount",
                  label: "Total amount",
                },
                {
                  value: "createdAt",
                  label: "Created at",
                },
              ]}
            />
            <Select
              label="Sort direction"
              searchParamValue="sortDir"
              options={[
                {
                  value: "asc",
                  label: "Ascending",
                },
                {
                  value: "desc",
                  label: "Descending",
                },
              ]}
            />
            <Select
              label="Status"
              searchParamValue="status"
              options={[
                {
                  value: "pending",
                  label: "Pending",
                },
                {
                  value: "shipped",
                  label: "Shipped",
                },
                {
                  value: "delivered",
                  label: "Delivered",
                },
                {
                  value: "cancelled",
                  label: "Cancelled",
                },
              ]}
            />
          </div>
          <OrdersTable />
        </div>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
