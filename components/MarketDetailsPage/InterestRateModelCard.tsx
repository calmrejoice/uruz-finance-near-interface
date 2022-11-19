import { Badge, Box, Heading, Text, useColorMode } from "@chakra-ui/react";
import {
  Line,
  LineChart,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Label,
} from "recharts";

import { Card } from "@components/Shared/Card";

export const InterestRateModelCard = ({
  model,
  utilizationRate,
}: {
  model: any[];
  utilizationRate: any;
}) => {
  const displayModel = model?.map((item) => {
    const base = (item.base * 100).toFixed(0);
    const supply = item.supply.toFixed(2);
    const borrow = item.borrow.toFixed(2);

    return {
      base,
      supply,
      borrow,
    };
  });

  const { colorMode } = useColorMode();

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <Box
          bgColor={colorMode === "dark" ? "gray.800" : "white"}
          p="6"
          borderRadius="lg"
          shadow="lg"
        >
          <Text variant="helper">
            Utilization: <Badge colorScheme="yellow">{label}%</Badge>
          </Text>
          <Text variant="helper">
            Borrow: <Badge colorScheme="red">{payload[0].value}%</Badge>
          </Text>
          <Text variant="helper">
            Supply: <Badge colorScheme="green">{payload[1].value}%</Badge>{" "}
          </Text>
        </Box>
      );
    }

    return null;
  };

  const displayUtil = utilizationRate * 100;

  return (
    <Card flex={2} flexDir="column">
      <Heading fontSize="lg" mb="6">
        Interest rate model
      </Heading>

      <ResponsiveContainer>
        <LineChart
          data={displayModel}
          margin={{ bottom: 20, left: 10, right: 10 }}
        >
          {/* <CartesianGrid strokeDasharray="3 3" /> */}
          <XAxis
            dataKey="base"
            type="number"
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            domain={[0, 100]}
            axisLine={false}
            tickLine={false}
            style={{
              fontSize: "0.8rem",
              fontFamily: "Open Sans",
            }}
          >
            <Label
              value="Utilization (%)"
              offset={0}
              position="bottom"
              fill={colorMode === "dark" ? "gray" : "gray"}
              style={{
                fontFamily: "Open Sans",
              }}
            />
          </XAxis>
          <YAxis
            axisLine={false}
            tickLine={false}
            style={{
              fontSize: "0.8rem",
              fontFamily: "Open Sans",
            }}
          >
            <Label
              value="APY (%)"
              angle={-90}
              position="insideLeft"
              fill={colorMode === "dark" ? "gray" : "gray"}
              style={{
                fontFamily: "Open Sans",
              }}
            />
          </YAxis>
          <Tooltip isAnimationActive={false} content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="borrow"
            stroke="#8884d8"
            dot={false}
            activeDot={{ r: 8 }}
            strokeWidth={3}
          />
          <Line
            type="monotone"
            dataKey="supply"
            stroke="#82ca9d"
            dot={false}
            strokeWidth={3}
          />
          <ReferenceLine
            x={displayUtil}
            stroke="gray"
            strokeDasharray="3 3"
            // label="Utilization Rate"
          >
            <Label
              value={`Utilization Rate: ${displayUtil.toFixed(2)}%`}
              position="right"
              fontSize="0.8rem"
              fill={colorMode === "dark" ? "gray" : "gray"}
              style={{
                fontFamily: "Open Sans",
              }}
            />
          </ReferenceLine>
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};
