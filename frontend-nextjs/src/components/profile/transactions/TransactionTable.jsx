'use client';
import {numberFormat} from '@/src/utils/helpers';
import PaginateTransactionTable from './PaginateTransactionTable';

export default function TransactionTable({data}) {
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr className='text-slate-300'>
              <th> ID</th>
              <th>Amount</th>
              <th>Condition</th>
              <th> Issue Tracking</th>
              <th className='hidden lg:table-cell'>Date</th>
            </tr>
          </thead>
          <tbody>
            {data.transactions.map((transaction) => (
              <tr key={transaction.id}>
                <th>{transaction.order_id}</th>
                <td>{numberFormat(transaction.amount)}$</td>
                <td>
                  <span className={transaction.status == 'موفق' ? 'text-green-500' : 'text-red-500'}>
                    {transaction.status}
                  </span>
                </td>
                <td>{transaction.trans_id}</td>
                <td className='hidden lg:table-cell'>{transaction.created_at}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-2 flex items-center justify-center p-4'>
        <PaginateTransactionTable links={data.meta.links} />
      </div>
    </>
  );
}
