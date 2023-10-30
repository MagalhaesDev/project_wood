/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActivesContext } from "@/contexts/ActivesContext";
import { useContext } from "react";
import ReactApexChart from "react-apexcharts";

interface LocaleProps {
  name: string;
  quantity: number;
}

export function MajorLocaleDonuts() {
  const { actives } = useContext(ActivesContext);

  const localesFilter = actives.reduce((acc: LocaleProps[], item) => {
    const existingItem = acc.find((el) => el.name === item.locale);

    if (existingItem) {
      existingItem.quantity += Number(item.value_buy);
    } else {
      acc.push({ name: item.locale, quantity: Number(item.value_buy) });
    }
    return acc;
  }, []);

  const localesSorted = localesFilter.sort(
    (a, b) => b.quantity - a.quantity
  );
  localesSorted.splice(5);

  const locales = localesSorted.map((locale) => locale.name);
  const values = localesSorted.map((locale) => locale.quantity);

  const state: any = {
    series: values,
    options: {
      chart: {
        width: 380,
        type: "pie",
      },
      labels: locales,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom",
            },
          },
        },
      ],
    },
  };

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
