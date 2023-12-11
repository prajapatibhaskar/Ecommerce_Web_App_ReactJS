import React from "react";
import { Option } from "./Option";

export const OptionSection = ({
  optionCategory,
  optionStates,
  setOptionStates,
  setSelectedOptionCombination,
  item
}) => {
  return (
    <div className="option-section">
      <div className="option-header">
        category: <b>{optionCategory.name}</b>
      </div>
      <div className="options">
        {optionCategory.options.map((option) => (
          <Option
            option={option}
            optionStates={optionStates}
            setOptionStates={setOptionStates}
            optionCategory={optionCategory}
            setSelectedOptionCombination={setSelectedOptionCombination}
            item={item}
          />
        ))}
      </div>
    </div>
  );
};
