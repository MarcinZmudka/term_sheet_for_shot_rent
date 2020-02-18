import React from "react";
import setMonthName from "./setMonthName";
import "./MonthSwitcher.css";

interface IProps {
  setMonth: Function;
  month: monthObj;
}
type monthObj = {
  monthInt: number;
  monthName: string;
};
const MonthSwitcher: React.FC<IProps> = ({ setMonth, month }) => {
  const changeMonth = (add: number) => {
    const oldMonthNumber = month.monthInt;
    const newMonth = {
      monthInt: oldMonthNumber + add,
      monthName: setMonthName(oldMonthNumber + add)
    };
    setMonth(newMonth);
  };
  return (
    <>
      <div className="boxOfArrows">
        <div className="monthTitle" >Miesiąc {month.monthName}</div>
        <div className="boxOnlyArrows">
          <div
            className="arrowLeft"
            onClick={() => {
              changeMonth(-1);
            }}
          ></div>
          <div
            className="arrowRight"
            onClick={() => {
              changeMonth(1);
            }}
          ></div>

        </div>
      </div>
    </>
  );
};
export default MonthSwitcher;
