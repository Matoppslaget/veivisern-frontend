'use client'

import { useState } from 'react'
import { Label, Listbox, ListboxOption } from '@headlessui/react'
import ProductCard from './ProductCard'
import Product from './Product'
import { ArrowRightIcon } from '@heroicons/react/24/outline'

const products: Product[] = [
    {
        id: 1,
        name: 'Jomjom (Voksen, store raser)',
        imageUrl:
            'https://bilder.kolonial.no/local_products/5a1db8dc-afc6-44e2-8df0-0dba9c7e5c06.jpg?auto=format&fit=max&w=617&s=13229b79e9d9e7e13477054cab0482ff',
        ingredients: ["Dehydrert protein av kylling", "hydrolysert protein av kylling", "hvete", "kyllingfett", "mais", "ertestivelse", "ris", "hydrolysert protein av laks", "dehydrert protein av fisk", "fiskeolje", "lignincellulosefiber", "sukkerbetefiber", "frukto-oligosakkarider", "kalsiumkarbonat", "natriumklorid", "monokalsiumfosfat", "betaglukaner fra gjær"],
    },
]

export default function SelectProduct() {
    const [selected, setSelected] = useState(products[0])

    return (
        <div className='grid grid-cols-2 space-x-1 justify-items-center'>
            <div className='pt-6 px-20 w-[90%]'>
                <Listbox value={selected} onChange={setSelected}>
                    <Label className="block text-2xl font-medium leading-6 text-gray-900">Produkter</Label>
                    <div className="relative mt-2 space-y-2 border p-2 overflow-auto max-h-80">
                        {products.map((product) => (
                            <ListboxOption
                                key={product.id}
                                value={product}
                                className="group relative cursor-pointer select-none py-2.5 pl-3 pr-9 text-gray-900 data-[selected]:bg-lime-700 data-[selected]:text-white"
                            >
                                <div className="flex items-center group-data-[selected]:font-semibold group-data-[selected]:bg-lime-700">
                                    <img alt="" src={product.imageUrl} className="h-10 w-10 flex-shrink-0 " />
                                    <span className="text-base ml-3 block truncate font-normal group-data-[selected]:font-semibold group-data-[selected]:text-gray">
                                        {product.name}
                                    </span>
                                </div>

                                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-lime-700 group-data-[selected]:text-white [.group:not([data-selected])_&]:hidden">
                                    <ArrowRightIcon aria-hidden="true" className="h-5 w-5" />
                                </span>
                            </ListboxOption>
                        ))}
                        {/* </ListboxOptions> */}
                    </div>
                </Listbox>
            </div>
            <div className='flex px-20 w-5/6'>
                <ProductCard product={selected} />
            </div>
        </div>
    )
}
