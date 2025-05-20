import { Product, NovaIngredient } from '../../types/ProductTypes';
import Image from 'next/image';
import { Spinner } from '@material-tailwind/react';
import IngredientTooltip from '../IngredientTooltip';
import { Dialog, DialogBody, DialogHeader } from '@material-tailwind/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import React from 'react';
import ProcessedLabel from '../ProcessedLabel';
import { cleanedProductName, productSubtitle } from '@/utils/CommonFunctions';

interface SearchProductCardProps {
  product: Product;
  isModalOpen: boolean;
  toggleModal: () => void;
}

export default function ProductModal({
  product,
  isModalOpen,
  toggleModal,
}: SearchProductCardProps) {
  return (
    <Dialog
      size="xs"
      open={isModalOpen}
      handler={toggleModal}
      placeholder={undefined}
    >
      <DialogHeader className="flex justify-end" placeholder={undefined}>
        <XMarkIcon
          className="text-gray-500 w-6 h-6 cursor-pointer hover:text-black"
          onClick={toggleModal}
        />
      </DialogHeader>
      <DialogBody
        placeholder={undefined}
        className="max-h-screen overflow-y-auto"
      >
        <span className="flow-root text-center text-lg text-black font-bold sm:text-2xl">
          {cleanedProductName(product)}
        </span>
        <span className="flow-root text-center text-sm sm:text-lg">
          {productSubtitle(product)}
        </span>

        <div className="my-4 sm:my-8 border-0 flow-root mx-auto box-border h-36 w-36 sm:h-72 sm:w-72">
          <Image
            className="h-full w-full object-contain"
            sizes="(max-width: 768px) 100vw, 33vw"
            src={product.image ? product.image : ''}
            alt={product.name}
            width={1}
            height={1}
          />
        </div>
        {!product.processedClass ? (
          <div className="flex justify-center space-x-3 my-4 p-2 text-center italic font-semibold text-gray-500">
            <Spinner /> <span>Henter produktdetaljer...</span>
          </div>
        ) : (
          product.processedClass && (
            <>
              <div className="text-center">
                <ProcessedLabel processedClass={product.processedClass} />
              </div>
              <hr className="my-6 sm:my-10"></hr>
              <div>
                {!product.ingredients || product.ingredients.length === 0 ? (
                  <div className="py-2">
                    <div className="text-2xl">
                      Ingredienser ikke tilgjengelig
                    </div>
                    <span>Produsenten har ikke oppgitt noen ingredienser.</span>
                  </div>
                ) : (
                  <div className="grid">
                    <div className="p-2 text-black text-md sm:text-xl">Ingredienser: </div>
                    <div className="max-h-40 sm:max-h-60 md:max-h-80 overflow-auto grid shadow-[inset_0_-24px_10px_-10px_rgba(0,0,0,0.06)]">
                      {(product.novaIngredients ?? []).map(
                        (novaIngredient: NovaIngredient) => (
                          <div
                            className="p-1 flex"
                            key={novaIngredient.ingredientName}
                          >
                            <div
                              className={`px-2 py-1 text-black text-sm sm:text-md
                                    ${
                                      novaIngredient.novaClass > 3
                                        ? 'rounded-lg'
                                        : 'bg-gray-50 bg-opacity-50'
                                    }  
                                    ${
                                      novaIngredient.novaClass === 4
                                        ? 'rounded-lg border-red-600 border-2 hover:border-red-500'
                                        : ''
                                    }`}
                            >
                              {novaIngredient.ingredientName}
                            </div>
                            {novaIngredient.novaClass === 4 && (
                              <IngredientTooltip />
                            )}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            </>
          )
        )}
      </DialogBody>
    </Dialog>
  );
}
