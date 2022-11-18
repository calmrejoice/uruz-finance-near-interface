import { BigNumber } from "ethers";

export const generateInterestModelArray = (
  mulPerBlock: BigNumber,
  baseRatePerBlock: BigNumber,
  reserveFactor: BigNumber,
  jumpMulPerBlock: BigNumber,
  kink: BigNumber
) => {
  const model = [];

  for (var i = 0; i <= 100; i++) {
    const mantissa = BigNumber.from((1e18).toString());
    const blocksPerDay = 20 * 60 * 24;
    const daysPerYear = 365;

    // @ts-ignore
    const utilizationBN = BigNumber.from(((i / 100) * mantissa).toString());
    const utilization = i / 100;

    let borrowRatePerBlock;
    if (utilizationBN.lte(kink)) {
      borrowRatePerBlock = utilizationBN
        .mul(mulPerBlock)
        .div(mantissa)
        .add(baseRatePerBlock);
    } else {
      const normalRate = kink
        .mul(mulPerBlock)
        .div(mantissa)
        .add(baseRatePerBlock);
      const excessUtil = utilizationBN.sub(kink);
      borrowRatePerBlock = excessUtil
        .mul(jumpMulPerBlock)
        .div(mantissa)
        .add(normalRate);
    }

    const oneMinusReserveFactor = mantissa.sub(reserveFactor);
    const rateToPool = borrowRatePerBlock
      .mul(oneMinusReserveFactor)
      .div(mantissa);
    const supplyRatePerBlock = utilizationBN.mul(rateToPool).div(mantissa);

    const supplyApy =
      (Math.pow(
        // @ts-ignore
        (supplyRatePerBlock / mantissa) * blocksPerDay + 1,
        daysPerYear
      ) -
        1) *
      100;
    const borrowApy =
      (Math.pow(
        // @ts-ignore
        (borrowRatePerBlock / mantissa) * blocksPerDay + 1,
        daysPerYear
      ) -
        1) *
      100;

    model.push({
      borrow: borrowApy,
      supply: supplyApy,
      base: utilization,
    });
  }
  return model;
};
