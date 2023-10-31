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

  const categoriesSorted = categoriesFilter.sort(
    (a, b) => b.quantity - a.quantity
  );
  categoriesSorted.splice(5);

  const categories = categoriesSorted.map((category) => category.name);
  const quantity = categoriesSorted.map((category) => category.quantity);

  const state: any = {
    series: [
      {
        name: "Quantidade",
        data: quantity,
      },
    ],
    options: {
      chart: {
        height: 350,
        type: "bar",
        toolbar: {
          show: false,
        },
      },
      plotOptions: {
        bar: {
          columnWidth: "30%",
          distributed: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      xaxis: {
        labels: {
          rotate: -45,
          style: {
            colors: "#fff",
            fontSize: "12px",
          },
        },
        categories: categories,
        tickPlacement: "on",
      },
      yaxis: {
        title: {
          text: "Valores",
        },
        labels: {
          style: {
            colors: "#fff",
            fontSize: "12px",
          },
        },
      },
      fill: {
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "horizontal",
          shadeIntensity: 0.5,
          gradientToColors: undefined,
          inverseColors: true,
          opacityFrom: 1,
          opacityTo: 1,
          stops: [50, 0, 100],
        },
      },
    },
  };

  return (
    <div className="w-full flex flex-col items-center bg-zinc-800 p-2 rounded-md">
      <h2 className="text-zinc-200 font-bold text-lg">Categorias</h2>
      <div className="donut w-4/5">
        <ReactApexChart
          options={state.options}
          series={state.series}
          type="bar"
          height={275}
        />
      </div>
    </div>
  );
}
