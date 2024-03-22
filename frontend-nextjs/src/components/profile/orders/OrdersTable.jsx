'use client';
import {getBlurDataUrl, numberFormat} from '@/src/utils/helpers';
import Image from 'next/image';
import PaginateProducts from './PaginateProducts';
import {ShoppingCart} from 'lucide-react';

export default function OrdersTable({data}) {
  return (
    <>
      <div className='overflow-x-auto'>
        <table className='table'>
          {/* head */}
          <thead>
            <tr className='text-slate-300'>
              <th>ID</th>
              <th>Address Title</th>
              <th className='hidden lg:table-cell'>Status</th>
              <th className='hidden lg:table-cell'>Payment Status</th>
              <th>Paying Amount</th>
              <th className='hidden lg:table-cell'>Created At</th>
            </tr>
          </thead>
          <tbody>
            {data.orders.map((order) => (
              <tr key={order.id}>
                <th>{order.id}</th>
                <td>{order.address_title}</td>
                <td className='hidden lg:table-cell'>{order.status}</td>
                <td
                  className={`hidden lg:table-cell ${order.payment_status == 'موفق' ? 'text-green-500' : 'text-red-500'}`}>
                  {order.payment_status}
                </td>
                <td>{numberFormat(order.paying_amount)}</td>
                <td className='hidden lg:table-cell'>{order.created_at}</td>
                <td>
                  <button
                    className='btn btn-circle btn-ghost text-slate-200'
                    onClick={() => document.getElementById(`modal-${order.id}`).showModal()}>
                    <ShoppingCart />
                  </button>
                  <dialog id={`modal-${order.id}`} className='modal'>
                    <div className='modal-box'>
                      <form method='dialog'>
                        <button className='btn btn-circle btn-ghost btn-sm absolute right-2 top-2'>✕</button>
                        <h2 className='text-lg font-bold text-red-500'>ID: {order.id}</h2>
                      </form>

                      <div className='overflow-x-auto'>
                        <table className='table'>
                          {/* head */}
                          <thead>
                            <tr>
                              <th>product</th>
                              <th>name</th>
                              <th>Price</th>
                              <th>Number</th>
                              <th> Total price</th>
                            </tr>
                          </thead>
                          <tbody>
                            {order.order_items.map((item) => (
                              <tr key={item.id}>
                                <th>
                                  <Image
                                    src={item.product_primary_image}
                                    width={80}
                                    height={50}
                                    alt='product-image'
                                    placeholder='blur'
                                    blurDataURL={getBlurDataUrl()}
                                    className='rounded-lg object-cover'
                                  />
                                </th>
                                <td> {item.product_name}</td>
                                <td>{numberFormat(item.price)}$</td>
                                <td>{item.quantity}</td>
                                <td>{numberFormat(item.subtotal)}$</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </dialog>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className='mt-2 flex items-center justify-center p-4'>
        <PaginateProducts links={data.meta.links} />
      </div>
    </>
  );
}
