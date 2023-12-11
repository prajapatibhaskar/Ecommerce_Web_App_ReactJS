import React from "react";

export const Option = ({
  option,
  optionStates,
  setOptionStates,
  optionCategory,
  setSelectedOptionCombination,
  item
}) => {
  const isSelected = optionStates[optionCategory.name].find(
    (op) => op.id === option.id
  ).isSelected;

  return (
    <div
      className={`option ${isSelected ? "option-selected" : ""}`}
      onClick={() => {
        optionClicked(optionStates, setOptionStates, optionCategory, option, setSelectedOptionCombination,item);
      }}
    >
      {option.name}
    </div>
  );
};

const optionClicked = (optionStates, setOptionStates, optionCategory, option, setSelectedOptionCombination,item) => {

    const tempOptionStates = JSON.parse(JSON.stringify(optionStates));

    tempOptionStates[optionCategory.name].forEach(op => {
        if(op.id === option.id){
            op.isSelected = !op.isSelected;
        } else{
            op.isSelected = false;
        }
    });
    setOptionStates(tempOptionStates);
    const optionCombination = item.optionsInfo.optionCombinations?.find((comb) =>
    Object.keys(comb.combination).every((key) =>
    tempOptionStates[key]?.some(
        (op) => op.id === comb.combination[key] && op.isSelected
      )
    ));
    console.log(optionCombination);
    setSelectedOptionCombination(optionCombination);
};
