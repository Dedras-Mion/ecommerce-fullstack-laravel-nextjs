'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';

export default function Sort() {
  const router = useRouter();
  const pathName = usePathname();
  const searchParams = useSearchParams();

  function handleClick(type) {
    const params = new URLSearchParams(searchParams);
    params.set('sortBy', type);
    params.delete('page');

    router.replace(`${pathName}?${params.toString()}`);
    // example url: .../menu/?sortBy=max
  }

  const sortOptions = [
    {label: 'highest price', value: 'max'},
    {label: 'lowest price', value: 'min'},
    {label: 'Best selling', value: 'bestseller'},
    {label: 'with discount', value: 'sale'},
  ];

  return (
    <div>
      {sortOptions.map((option) => (
        <div className='form-control' key={option.value}>
          <label className='label cursor-pointer'>
            <span className='label-text'>{option.label}</span>
            <input
              type='radio'
              name='radio-10'
              onClick={() => handleClick(option.value)}
              checked={searchParams.get('sortBy') === option.value}
              className='radio-error radio checked:bg-red-500'
            />
          </label>
        </div>
      ))}
    </div>
  );
}

// "use client";

// import { usePathname, useRouter, useSearchParams } from "next/navigation";

// export default function Sort() {
//   const router = useRouter();
//   const pathName = usePathname();
//   const searchParams = useSearchParams();

//   function handleClick(type) {
//     const params = new URLSearchParams(searchParams);
//     params.set("sortBy", type);
//     params.delete("page");

//     router.replace(`${pathName}?${params.toString()}`);
//   }

//   return (
//     <div>
//       <div className="form-control">
//         <label className="cursor-pointer label">
//           <span className="label-text">highest price</span>
//           <input
//             onClick={() => handleClick("max")}
//             type="radio"
//             name="radio-10"
//             checked={
//               searchParams.has("sortBy") && searchParams.get("sortBy") == "max"
//                 ? "radio checked:bg-red-500"
//                 : ""
//             }
//             className="radio radio-error"
//           />
//         </label>
//       </div>
//       <div className="form-control">
//         <label className="cursor-pointer label">
//           <span className="label-text">lowest price</span>
//           <input
//             type="radio"
//             name="radio-10"
//             onClick={() => handleClick("min")}
//             checked={
//               searchParams.has("sortBy") && searchParams.get("sortBy") == "min"
//                 ? "radio checked:bg-red-500"
//                 : ""
//             }
//             className="radio radio-error"
//           />
//         </label>
//       </div>
//       <div className="form-control">
//         <label className="cursor-pointer label">
//           <span className="label-text">Best selling</span>
//           <input
//             type="radio"
//             name="radio-10"
//             onClick={() => handleClick("bestseller")}
//             checked={
//               searchParams.has("sortBy") &&
//               searchParams.get("sortBy") == "bestseller"
//                 ? "radio checked:bg-red-500"
//                 : ""
//             }
//             className="radio radio-error"
//           />
//         </label>
//       </div>
//       <div className="form-control">
//         <label className="cursor-pointer label">
//           <span className="label-text">with discount</span>
//           <input
//             type="radio"
//             name="radio-10"
//             onClick={() => handleClick("sale")}
//             checked={
//               searchParams.has("sortBy") && searchParams.get("sortBy") == "sale"
//                 ? "radio checked:bg-red-500"
//                 : ""
//             }
//             className="radio radio-error"
//           />
//         </label>
//       </div>
//     </div>
//   );
// }
