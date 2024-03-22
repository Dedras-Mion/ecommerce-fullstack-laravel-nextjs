import TransactionTable from '@/src/components/profile/transactions/TransactionTable';
import Loading from '@/src/components/UI/loading/Loading';
import {getFetch} from '@/src/utils/fetch';
import {cookies} from 'next/headers';
import {Suspense} from 'react';

export default async function TransactionsPage({searchParams}) {
  const params = new URLSearchParams(searchParams);
  const queryString = params.toString();
  const token = cookies().get('token');
  const data = await getFetch(`/profile/transactions?${queryString}`, {
    Authorization: `Bearer ${token.value}`,
  });

  return (
    <div>
      <Suspense key={queryString} fallback={<Loading />}>
        <TransactionTable data={data} />
      </Suspense>
    </div>
  );
}
