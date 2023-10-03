import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend,
} from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Legend
);

export const LineChart = ({ data }) => {
    return <Line className="h-[100%] w-[100%] m-auto" data={data} />;
};
