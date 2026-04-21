'use client';

import { useState } from "react";

const getDaysInMonth = (year: number, month: number) => {
  return new Date(year, month + 1, 0).getDate();
};

const DatePage = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const days = getDaysInMonth(year, month);

  const handleDateClick = (day: number) => {
    const selected = new Date(year, month, day);

    if (!startDate || (startDate && endDate)) {
      setStartDate(selected);
      setEndDate(null);
    } else {
      if (selected < startDate) {
        setStartDate(selected);
      } else {
        setEndDate(selected);
      }
    }
  };

  const isInRange = (day: number) => {
    if (!startDate || !endDate) return false;
    const date = new Date(year, month, day);
    return date >= startDate && date <= endDate;
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Select Date Range</h3>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 40px)", gap: "5px" }}>
        {Array.from({ length: days }, (_, i) => {
          const day = i + 1;
          const isSelected =
            (startDate && day === startDate.getDate() && month === startDate.getMonth()) ||
            (endDate && day === endDate.getDate() && month === endDate.getMonth());

          return (
            <div
              key={day}
              onClick={() => handleDateClick(day)}
              style={{
                padding: "10px",
                textAlign: "center",
                cursor: "pointer",
                borderRadius: "5px",
                background: isSelected
                  ? "#007bff"
                  : isInRange(day)
                  ? "#cce5ff"
                  : "#f0f0f0",
                color: isSelected ? "white" : "black",
              }}
            >
              {day}
            </div>
          );
        })}
      </div>

      <div style={{ marginTop: 20 }}>
        <p>Start: {startDate?.toDateString() || "None"}</p>
        <p>End: {endDate?.toDateString() || "None"}</p>
      </div>
    </div>
  );
};

export default DatePage;