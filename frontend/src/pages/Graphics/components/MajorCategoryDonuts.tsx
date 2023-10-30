/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivesContext } from "@/contexts/ActivesContext";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";

interface CategoryProps {
  name: string;
  quantity: number;
}

export function MajorCategoryDonuts() {
  const { actives } = useContext(ActivesContext);

  const categoriesFilter = actives.reduce((acc: CategoryProps[], item) => {
    const existingItem = acc.find((el) => el.name === item.category);

    if (existingItem) {
      existingItem.quantity += Number(item.value_buy);
    } else {
      acc.push({ name: item.category, quantity: Number(item.value_buy) });
    }
    return acc;
  }, []);

 const categoriesSorted = categoriesFilter.sort((a, b) => b.quantity - a.quantity);
 categoriesSorted.splice(5)

  const categories = categoriesSorted.map(category => category.name);
  const values = categoriesSorted.map(category => category.quantity);
  
  const state: any = {
          
    series: values,
    options: {
      chart: {
        width: 380,
        type: 'pie',
      },
      labels: categories,
      responsive: [{
        breakpoint: 480,
        options: {
          chart: {
            width: 200
          },
          legend: {
            position: 'bottom'
          }
        }
      }],
    }}


  return (
    <div className="w-full flex flex-col items-center p-2 rounded-md">
    <div className="donut w-4/5">
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="donut"
        height={275}
      />
    </div>
  </div>
  );
}
