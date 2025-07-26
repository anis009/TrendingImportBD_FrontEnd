import { getTrackBackground, Range } from "react-range";

const InputRange = ({ STEP, MIN, MAX, values, handleChanges }) => {
  return (
    <>
      <Range
        step={STEP}
        min={MIN}
        max={MAX}
        values={values}
        onChange={(vals) => handleChanges(vals)}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "3px",
              width: "100%",
              background: getTrackBackground({
                values: values,
                colors: ["#EDEDED", "#E91E63", "#EDEDED"],
                min: MIN,
                max: MAX,
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
