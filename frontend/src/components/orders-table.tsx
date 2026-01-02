import useGetOrders from "../api/orders/hooks/useGetOrders";
import type { Order } from "../api/orders/types";

const OrdersTable = () => {
  const { data, isPending, isError, error } = useGetOrders();

  return (
    <div className="w-full h-full flex justify-center items-center">
      {isPending ? (
        <div>Loading...</div>
      ) : !data ? (
        <div>No data</div>
      ) : isError ? (
        <div>Error: {error.message}</div>
      ) : (
        <div className="h-full w-full flex justify-center items-center flex-col gap-2">
          <div className="relative overflow-x-auto bg-neutral-primary-soft shadow-xs rounded-xl border border-default">
            <table className="w-full text-sm text-left rtl:text-right text-body">
              <thead className="text-sm text-body bg-neutral-secondary-soft border-b rounded-base border-default">
                <tr>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Name
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Total Amount
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Item Count
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Status
                  </th>
                  <th scope="col" className="px-6 py-3 font-medium">
                    Created At
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((order: Order) => (
                  <tr
                    className="bg-neutral-primary border-b border-default"
                    key={order.id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-heading whitespace-nowrap"
                    >
                      {order.customerName}
                    </th>
                    <td className="px-6 py-4">{order.totalAmount}</td>
                    <td className="px-6 py-4">{order.itemsCount}</td>
                    <td className="px-6 py-4">{order.status}</td>
                    <td className="px-6 py-4">
                      {new Date(order.createdAt).toDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
