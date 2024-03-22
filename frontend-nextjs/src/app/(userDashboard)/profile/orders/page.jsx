import OrdersTable from '@/src/components/profile/orders/OrdersTable';
import Loading from '@/src/components/UI/loading/Loading';
import {getFetch} from '@/src/utils/fetch';
import {cookies} from 'next/headers';
import {Suspense} from 'react';

export default async function OrdersPage({searchParams}) {
  const params = new URLSearchParams(searchParams);
  const queryString = params.toString();
  const token = cookies().get('token');
  const data = await getFetch(`/profile/orders?${queryString}`, {
    Authorization: `Bearer ${token.value}`,
  });

  return (
    <div>
      <Suspense key={queryString} fallback={<Loading />}>
        <OrdersTable data={data} />
      </Suspense>
    </div>
  );
}
