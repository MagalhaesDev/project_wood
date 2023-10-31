/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivesContext } from "@/contexts/ActivesContext";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";

interface LocaleProps {
  name: string;
  quantity: number;
}


export function MajorCategoryGraphics() {
  const { actives } = useContext(ActivesContext);

  const categoriesFilter = actives.reduce((acc: LocaleProps[], item) => {
    const existingItem = acc.find((el) => el.name === item.category);

    if (existingItem) {
      existingItem.quantity += Number(item.value_buy);
    } else {
      acc.push({ name: item.category, quantity: Number(item.value_buy) });
    }
    return acc;
  }, []);

  const categoriesSorted = categoriesFilter.sort(
    (a, b) => b.quantity - a.quantity
  );
  categoriesSorted.splice(5);

  const locales = categoriesSorted.map((category) => category.name);
  const values = categoriesSorted.map((category) => category.quantity);
  
  const state: any = {
    series: [{
      name: 'Preço',
      data: values,
    }],
    options: {
      chart: {
        height: 350,
        type: 'bar',
        toolbar: {
          show: false,
        }
      },
      plotOptions: {
        bar: {
          columnWidth: '30%',
          distributed: true,  
        }
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        width: 2,
      },
      xaxis: {
        labels: {
          rotate: 0,
          style: {
              colors: "#fff",
              fontSize: "10px",
            },
        },
        categories: locales,
        tickPlacement: 'on'
      },
      yaxis: {
        title: {
          text: 'Valores',
        },
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
      
    }}



  return (
    <div className="w-full flex flex-col items-center p-2 rounded-md">
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
