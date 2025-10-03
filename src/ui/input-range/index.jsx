import { getTrackBackground, Range } from "react-range";

const InputRange = ({ STEP, MIN, MAX, values, handleChanges }) => {
  // Validate props to prevent range errors
  const validMIN = typeof MIN === "number" ? MIN : 0;
  const validMAX =
    typeof MAX === "number" && MAX > validMIN ? MAX : validMIN + 1000;

  // Ensure values don't exceed the valid range
  const validValues =
    Array.isArray(values) && values.length === 2
      ? [
          Math.max(validMIN, Math.min(values[0], validMAX)),
          Math.max(validMIN, Math.min(values[1], validMAX)),
        ]
      : [validMIN, validMAX];

  return (
    <>
      <Range
        step={STEP || 1}
        min={validMIN}
        max={validMAX}
        values={validValues}
        onChange={(vals) => handleChanges(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "3px",
              width: "100%",
              background: getTrackBackground({
                values: validValues,
                colors: ["#EDEDED", "#E91E63", "#EDEDED"],
                min: validMIN,
                max: validMAX,
              }),
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props, isDragged }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "17px",
              width: "5px",
              backgroundColor: "#E91E63",
              backgroundColor: isDragged ? "#E91E63" : "#E91E63",
            }}
          />
        )}
      />
    </>
  );
};

export default InputRange;
