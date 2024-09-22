import { QuestionMarkCircleIcon } from "@heroicons/react/24/outline";
import { Tooltip, Typography } from "./MaterialTailwind"
import { EvaluatedProduct, KassalappProduct, ProcessedClass } from "./KassalappResponse";
import Image from 'next/image';
import { Spinner } from "@material-tailwind/react";

interface ProductCardProps {
  product: KassalappProduct;
  isEvaluating: boolean;
  evaluatedProduct?: EvaluatedProduct;
}


export default function ProductCard({ product, isEvaluating, evaluatedProduct }: ProductCardProps) {
  return (
    <div className="mx-6 flex justify-center w-full ">
      <div className="">
        <span className="flow-root my-3 text-center text-2xl"> {product.name} </span>
        <div className='flow-root my-4 mx-auto box-border h-48 w-48'>
          <Image className="h-full w-full object-contain" sizes="(max-width: 768px) 100vw, 33vw" src={product.image ? product.image : ""} alt={product.name} width={20} height={20} />
        </div>
        {isEvaluating && <div>
          <div className="flex justify-center space-x-3 my-4 p-2 text-center italic font-semibold text-gray-500">
            <Spinner></Spinner> <span> Spinning the UP-roulette</span>
          </div>
        </div>}
        {evaluatedProduct &&
          <div className={`my-8 text-center text-xl font-semibold
          `}> <span className={`border p-2 px-3 rounded-xl ${evaluatedProduct.upAnswer === ProcessedClass.ULTRAPROCESSED ?
              'border-red-600 bg-red-200' : evaluatedProduct.upAnswer === ProcessedClass.PROCESSED ? 'border-yellow-400 bg-yellow-200' : 'border-green-600 bg-green-600 bg-opacity-50'}`}>{evaluatedProduct.upAnswer}</span> </div>}
        {/* For debug, søk opp tine økologisk lettmelk. Ingrediensene viser økologisk lettmelk, Novaingredients viser "properties required" */}
        {evaluatedProduct &&
          <div className="flow-root my-6 ">
            {(!evaluatedProduct.novaIngredients || evaluatedProduct.novaIngredients.length === 0) ?
              <div className="py-2">
                <div className="text-2xl">Ingredienser ikke tilgjengelig</div>
                <span> Produsenten har ikke oppgitt noen ingredienser.</span>
              </div>
              : <div className="grid">
                <div className="pl-4 p-2 text-lg">Ingredienser: </div>
                <div className=" max-h-80 overflow-auto grid shadow-[inset_0_-24px_10px_-10px_rgba(0,0,0,0.06)]">
                  {evaluatedProduct.novaIngredients && Object.entries(evaluatedProduct.novaIngredients).map(([ingredient, novaClass]) => (
                    <div className="p-1 flex" key={ingredient}>
                      <div
                        className={`px-2 py-1 text-md
                              ${novaClass > 2 ? 'rounded-lg' : 'bg-gray-100 bg-opacity-50'}  
                              ${novaClass === 4 ? 'bg-red-600 hover:border-red-500 text-gray-50' :
                            novaClass === 3 ? 'bg-yellow-400 hover:border-yellow-500' : ''}`}
                      >
                        {ingredient}
                      </div>
                      {novaClass === 4 &&
                        <span>
                          <Tooltip
                            className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                            content={
                              <div className="w-80">
                                <Typography color="blue-gray" className="text-lg font-bold">
                                  Det æ fali det...
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="text-lg opacity-80"
                                >
                                  Denne vil du ikke spise!!
                                </Typography>
                              </div>
                            }
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}>
                            <QuestionMarkCircleIcon className="hover:cursor-pointer pl-2 w-[34px] h-[28px]"></QuestionMarkCircleIcon>
                          </Tooltip>
                        </span>
                      }
                      {novaClass === 3 &&
                        <span>
                          <Tooltip
                            className="border border-blue-gray-50 bg-white px-4 py-3 shadow-xl shadow-black/10"
                            content={
                              <div className="w-80">
                                <Typography color="blue-gray" className="text-lg font-bold">
                                  Hvem vet, kanskje denne er farlig?
                                </Typography>
                                <Typography
                                  variant="small"
                                  color="blue-gray"
                                  className="text-lg opacity-80"
                                >
                                  Mye som tyder på at denna ikke er helt bra.
                                </Typography>
                              </div>
                            }
                            animate={{
                              mount: { scale: 1, y: 0 },
                              unmount: { scale: 0, y: 25 },
                            }}>
                            <QuestionMarkCircleIcon className="hover:cursor-pointer pl-2 w-[34px] h-[28px]"></QuestionMarkCircleIcon>
                          </Tooltip>
                        </span>
                      }
                    </div>
                  ))}
                </div>
              </div>
            }
          </div>
        }
      </div >
    </div >


  )


}