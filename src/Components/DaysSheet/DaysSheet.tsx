import React, { CSSProperties } from "react";
import "./DaysSheet.css";
import calendarize from "./calendarize";
interface IProps {
  monthInt: number;
}
const DaysSheet: React.FC<IProps> = ({ monthInt }) => {
  const dayOfMonth = [...new Array(31)].map((item, index) => index + 1);
  const arrayOfRows = calendarize(
    new Date(new Date().getUTCFullYear(), monthInt),
    0
  );
  const numberOfDay = new Date().getUTCDay();
  return (
    <div className="daysSheet_box" key={Math.round(Math.random() * 100000)}>
      {arrayOfRows.map((item: Array<Number>, index) => {
        return (
          <>
            {item.map((days: Number, index1: any) => {
              const colorFor0: CSSProperties = {
                gridColumnStart: `${index1 + 1}`,
                gridColumnEnd: `${index1 + 2}`,
                gridRowStart: `${index + 1}`,
                gridRowEnd: `${index + 2}`,
                border: "0px solid rgb(121, 121, 121)",
                boxShadow: "#000 1px 1px 2px",
                boxSizing: "border-box",
                margin: "0",
                padding: "5px",
                textAlign: "right",
                color: `${days != 0 ? "#000" : "#FFF"}`
              };
              return (
                <div
                  className="daysSheet_day"
                  key={Math.round(Math.random() * 100000)}
                  style={colorFor0}
                >
                  {days != 0 ? days : "/"}
                </div>
              );
            })}
          </>
        );
      })}
    </div>
  );
};
export default DaysSheet;
