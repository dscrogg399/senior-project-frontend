import Panel from "../ui/Containers/Panel";
import Row from "../ui/Containers/Row";
import PanelLabel from "../ui/Labels/PanelLabel";
import { eachMonthOfInterval, startOfYear } from "date-fns";
import MonthSelect from "./components/MonthSelect";
import { useState } from "react";
import PrimaryButton from "../ui/Buttons/PrimaryButton";
import BudgetModal from "./components/BudgetModal";
import Graph from "./components/Graph";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import chartTrendline from "chartjs-plugin-trendline";
import annotationPlugin from "chartjs-plugin-annotation";
import { faker } from "@faker-js/faker";
import { eachDayOfInterval, lastDayOfMonth } from "date-fns";
import { useRecoilValue } from "recoil";
import { budgetAtom } from "../../atom/budgetAtom";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { linearProject } from "../../lib/lineFitter";
import {
  ExclamationTriangleIcon,
  ShieldExclamationIcon,
} from "@heroicons/react/24/outline";
import ReactDOMServer from "react-dom/server";
import Col from "../ui/Containers/Col";

//get months of this year for select
const months = eachMonthOfInterval({
  start: startOfYear(new Date()),
  end: new Date(),
});

export default function ReportsPage() {
  //state
  const [selectedMonth, setSelectedMonth] = useState<Date>(
    months[months.length - 1]
  );
  const [budgetModalOpen, setBudgetModalOpen] = useState<boolean>(false);
  const budget = useRecoilValue(budgetAtom);

  //graph setup
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    annotationPlugin,
    chartTrendline
  );

  //budget thresholds for graph, only shown if budget is active
  const annotations = [
    {
      id: "cost-budg",
      type: "line",
      mode: "horizontal",
      value: budget.max_cost,
      scaleID: "y",
      borderWidth: 2,
      borderDash: [10, 5],
      borderColor: "rgba(212, 4, 8, 0.5)",
      label: {
        enabled: true,
        content: `Cost Budget:`,
        position: "start",
      },
    },
    {
      id: "energy-budg",
      type: "line",
      mode: "horizontal",
      value: budget.max_energy,
      scaleID: "y1",
      borderWidth: 2,
      borderDash: [10, 5],
      borderColor: "rgb(222, 181, 16)",
      label: {
        enabled: true,
        content: `Energy Budget:`,
        position: "start",
      },
    },
    {
      id: "water-budg",
      type: "line",
      mode: "horizontal",
      value: budget.max_water,
      scaleID: "y2",
      borderWidth: 2,
      borderDash: [10, 5],
      borderColor: "rgb(17, 132, 214)",
      label: {
        enabled: true,
        content: `Water Budget:`,
        position: "start",
      },
    },
  ];

  //graph options
  let options = {
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: true,
    },
    stacked: false,
    scales: {
      y: {
        type: "linear" as const,
        display: true,
        position: "left" as const,
        title: {
          display: true,
          text: "Cost ($)",
        },
      },
      y1: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Energy Usage (kWh)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
      y2: {
        type: "linear" as const,
        display: true,
        position: "right" as const,
        title: {
          display: true,
          text: "Water Usage (gal)",
        },
        grid: {
          drawOnChartArea: false,
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: "bottom" as const,
      },
      annotation: {
        //only show annotations if budget is active
        annotations: budget.is_active ? annotations : [],
      },
    },
  };

  //get days of the month for labels and other data generation
  let days = eachDayOfInterval({
    start: selectedMonth,
    end: lastDayOfMonth(selectedMonth),
  });
  let labels = days.map((day) => day.getDate().toString());

  //dummy data generation
  let energyData: any[] = [];
  let waterData: any[] = [];
  let costData: any[] = [];
  let energy = 0;
  let water = 0;
  let cost = 0;
  //for each day of the month
  for (const day of days) {
    //skip future days
    if (day > new Date()) {
      continue;
    }
    //generate random data for each day
    let dayCost = 0;
    //weekends
    if ([0, 6].includes(day.getDay())) {
      let newEnergy = faker.datatype.number({ min: 30, max: 40 });
      let newWater = faker.datatype.number({ min: 300, max: 400 });
      energy += newEnergy;
      water += newWater;
      dayCost += newEnergy * 0.12;
      dayCost += newWater * 0.003368983957219;
    }
    //weekdays
    else {
      let newEnergy = faker.datatype.number({ min: 20, max: 30 });
      let newWater = faker.datatype.number({ min: 200, max: 300 });
      energy += newEnergy;
      water += newWater;
      dayCost += newEnergy * 0.12;
      dayCost += newWater * 0.003368983957219;
    }
    //increment data
    cost += dayCost;
    energyData.push(energy);
    waterData.push(water);
    costData.push(cost);
  }

  //project data for days in the future
  let costProj = days.map((day, index) => {
    if (index === costData.length - 1) {
      return costData[costData.length - 1];
    }
    if (!costData[index]) {
      return linearProject(costData, index);
    }
    return null;
  });
  let energyProj = days.map((day, index) => {
    if (index === energyData.length - 1) {
      return energyData[energyData.length - 1];
    }
    if (!energyData[index]) {
      return linearProject(energyData, index);
    }
    return null;
  });
  let waterProj = days.map((day, index) => {
    if (index === waterData.length - 1) {
      return waterData[waterData.length - 1];
    }
    if (!waterData[index]) {
      return linearProject(waterData, index);
    }
    return null;
  });

  //format data for graphs
  const data = {
    labels,
    datasets: [
      {
        label: "Cost ($)",
        data: labels.map((label, index) => costData[index]),
        borderColor: "rgba(212, 4, 8, 0.7)",
        backgroundColor: "rgba(212, 4, 8, 0.5)",
        yAxisID: "y",
      },
      {
        label: "Cost Projection ($)",
        data: labels.map((label, index) => costProj[index]),
        borderColor: "rgba(212, 4, 8, 0.7)",
        backgroundColor: "rgba(212, 4, 8, 0.5)",
        yAxisID: "y",
        borderDash: [8, 10],
      },
      {
        label: "Energy (kWh)",
        data: labels.map((label, index) => energyData[index]),
        borderColor: "rgb(222, 181, 16)",
        backgroundColor: "rgba(222, 181, 16, 0.5)",
        yAxisID: "y1",
      },
      {
        label: "Energy Projection (kWh)",
        data: labels.map((label, index) => energyProj[index]),
        borderColor: "rgb(222, 181, 16)",
        backgroundColor: "rgba(222, 181, 16, 0.5)",
        yAxisID: "y1",
        borderDash: [8, 10],
      },
      {
        label: "Water (gal)",
        data: labels.map((label, index) => waterData[index]),
        borderColor: "rgb(17, 132, 214)",
        backgroundColor: "rgba(17, 132, 214, 0.5)",
        yAxisID: "y2",
      },
      {
        label: "Water Projection (gal)",
        data: labels.map((label, index) => waterProj[index]),
        borderColor: "rgb(17, 132, 214)",
        backgroundColor: "rgba(17, 132, 214, 0.5)",
        yAxisID: "y2",
        borderDash: [8, 10],
      },
    ],
  };

  return (
    <Panel className="w-full h-full">
      <BudgetModal open={budgetModalOpen} setOpen={setBudgetModalOpen} />
      <PanelLabel>Reports</PanelLabel>
      <div className="flex flex-col h-full w-full px-4">
        {/* selecter, edit budget button, and warnings */}
        <section className="flex flex-row justify-between items-center px-4 w-full h-[8%]">
          {/* selector and edit budget button */}
          <Row className="space-x-4 items-end">
            {/* month selector */}
            <MonthSelect
              label="Month"
              months={months}
              selected={selectedMonth}
              setSelected={setSelectedMonth}
            />
          </Row>
          {/* warnings */}
          <Row className="space-x-6">
            <div className="flex h-full">
              {budget.is_active && (
                <div
                  data-tooltip-id="budget-indicator"
                  // tooltip for budget indicator
                  data-tooltip-html={ReactDOMServer.renderToStaticMarkup(
                    <Col>
                      {budget.max_cost < costData[costData.length - 1] ? (
                        <p>Exceeded maximum monthly cost budget.</p>
                      ) : (
                        <>
                          {budget.max_cost < costProj[costProj.length - 1] &&
                            new Date().getDate() >= 10 && (
                              <p>At risk of exceeding monthly cost budget.</p>
                            )}
                        </>
                      )}
                      {budget.max_energy < energyData[energyData.length - 1] ? (
                        <p>Exceeded maximum monthly energy budget.</p>
                      ) : (
                        <>
                          {budget.max_energy <
                            energyProj[energyProj.length - 1] && (
                            <p>At risk of exceeding monthly energy budget.</p>
                          )}
                        </>
                      )}
                      {budget.max_water < waterData[waterData.length - 1] ? (
                        <p>Exceeded maximum monthly water budget.</p>
                      ) : (
                        <>
                          {budget.max_water <
                            waterProj[waterProj.length - 1] && (
                            <p>At risk of exceeding monthly water budget.</p>
                          )}
                        </>
                      )}
                    </Col>
                  )}
                >
                  {/* when the budget is exceed show red icon */}
                  {budget.max_cost < costData[costData.length - 1] ||
                  budget.max_energy < energyData[energyData.length - 1] ||
                  budget.max_water < waterData[waterData.length - 1] ? (
                    <ShieldExclamationIcon className="h-8 w-8 text-red-500" />
                  ) : (
                    <>
                      {/* when the budget is at risk of being exceeded show yellow icon */}
                      {(budget.max_cost < costProj[costProj.length - 1] ||
                        budget.max_energy < energyProj[energyProj.length - 1] ||
                        budget.max_water < waterProj[waterProj.length - 1]) &&
                        energyData.length - 1 >= 10 &&
                        waterData.length - 1 >= 10 &&
                        costData.length - 1 >= 10 && (
                          <ExclamationTriangleIcon className="h-8 w-8 text-yellow-500" />
                        )}
                    </>
                  )}
                  <ReactTooltip id="budget-indicator" place="bottom" />
                </div>
              )}
            </div>
            <PrimaryButton onClick={() => setBudgetModalOpen(true)}>
              Budget
            </PrimaryButton>
          </Row>
        </section>
        {/* graph */}
        <section className="flex flex-grow flex-col">
          <div className="flex w-full h-[95%] items-center justify-center mt-2 px-4">
            <Graph options={options} data={data} />
          </div>
        </section>
      </div>
    </Panel>
  );
}
