import { Navegation } from "@/components/Navigation";
import { CategoryGraphics } from "./components/CategoryGraphics";
import { ProviderGraphics } from "./components/ProviderGraphics";
import { MajorCategoryGraphics } from "./components/MajorCategoryGraphics";
import { MajorCategoryDonuts } from "./components/MajorCategoryDonuts";
import { MajorLocaleDonuts } from "./components/MajorLocaleDonuts";
import { MajorLocaleGraphics } from "./components/MajorLocaleGraphics";


export function Graphics() {
  return (
    <>
      <Navegation />
      <div className="flex gap-3 mt-10 ">
        <ProviderGraphics />
        <CategoryGraphics />
      </div>
      <div className=" bg-zinc-800 mt-3 flex flex-col">
        <div className="text-center my-5">Categorias com os maiores valores</div>
        <div className="flex gap-3 ">
          <MajorCategoryDonuts />
          <MajorCategoryGraphics />
        </div>
      </div>
      <div className=" bg-zinc-800 mt-3 flex flex-col">
        <div className="text-center my-5">Locais com os maiores valores</div>
        <div className="flex gap-3 ">
          <MajorLocaleDonuts />
          <MajorLocaleGraphics />
        </div>
      </div>
    </>
  );
}
