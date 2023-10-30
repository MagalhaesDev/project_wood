/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivesContext } from "@/contexts/ActivesContext";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";

interface CategoryProps {
  name: string;
  quantity: number;
}

export function CategoryGraphics() {
  const { actives } = useContext(ActivesContext);

  const categoriesFilter = actives.reduce((acc: CategoryProps[], item) => {
    const existingItem = acc.find((el) => el.name === item.category);

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      acc.push({ name: item.category, quantity: 1 });
    }
    return acc;
  }, []);

 const categoriesSorted = categoriesFilter.sort((a, b) => b.quantity - a.quantity);
 categoriesSorted.splice(5)

  const categories = categoriesSorted.map(category => category.name);
  const quantity = categoriesSorted.map(category => category.quantity)

  const state: any = {
    series: [
      {
        data: quantity,
      },
    ],
    options: {
      chart: {
        height: 200,
        type: "bar",
      },
      plotOptions: {
        bar: {
          columnWidth: "20%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
      },
      xaxis: {
        categories: categories,
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
          },
        },
      },
      yaxis: {
        labels: {
          style: {
              colors: "#fff",
              fontSize: "12px",
            },
        },
      },
      fill: {
        type: 'gradient',
        gradient: {
          
          shade: 'dark',
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100]
        },
      }
    },
  };

  return (
    <div className="w-full flex flex-col items-center bg-zinc-800 p-2 rounded-md">
      <h2>5 Maiores categorias</h2>
      <div className="donut w-4/5">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={275}
        />
      </div>
    </div>
  )
}