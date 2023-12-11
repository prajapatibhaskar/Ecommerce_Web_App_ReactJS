import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../styles/item-page.css";
import { BasicItemInfo } from "./item-page/BasicItemInfo";
import { OptionSection } from "./item-page/OptionSection";
import { ItemCombinationDetail } from "./item-page/ItemCombinationDetail";
import { Review } from "./item-page/Review";
import { Description, DescriptionParagraph } from "./item-page/Description";

export const ItemPage = ({}) => {
  const { itemId } = useParams();

  const [item, setItem] = useState(null);
  const [optionStates, setOptionStates] = useState({});
  const [selectedOptionCombination, setSelectedOptionCombination] = useState(
    {}
  );
  const [combinationImages, setCombinationImages] = useState({});
  const [imgSrc, setImgSrc] = useState("");

  useEffect(() => {
    let cid = selectedOptionCombination?.cid;
    if(cid){
      let byteArray = combinationImages[cid]?.[0];
      if (byteArray) {
        let imgSrc_ = "data:image/png;base64," + byteArray;
        setImgSrc(imgSrc_);
      }
    }
    else{
      setImgSrc(undefined);
    }
  }, [selectedOptionCombination]);

  useEffect(() => {
    const tempOptionStates = {};
    item?.optionsInfo.optionCategories.forEach((optionCategory) => {
      tempOptionStates[optionCategory.name] = JSON.parse(
        JSON.stringify(optionCategory.options)
      );
      tempOptionStates[optionCategory.name].forEach((option) => {
        option.isSelected = false;
      });
    });
    setOptionStates(tempOptionStates);
  }, [item]);

  useEffect(() => {
    fetch(`http://localhost:8080/item/${itemId}`)
      .then((response) => response.json())
      .then((response) => setItem(response));

    fetch(`http://localhost:8080/item/${itemId}/combinations`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        return response;
      })
      .then((response) => {
        const promises = [];
        response.combinationIds.forEach((combinationId) => {
          promises.push(fetch(
            `http://localhost:8080/item/${itemId}/combination/${combinationId}/images`
          ));
        });
        const allPromises = Promise.all(promises);
        allPromises.then(values => {
          Promise.all(values.map(r => r.json())).then(results => {
            let tempCombinationImages = {};
            results.forEach(combination => {
              tempCombinationImages[combination.combinationId] = combination.images;
            });
            setCombinationImages(tempCombinationImages);
          })
        })
      })
  }, []);

  return (
    <>
      <div className="item">
        <div className="image-section">
          <img className="image-section-image" id="ItemPreview" src={imgSrc}></img>
        </div>
        <div className="item-info-section">
          {!!item ? (
            <BasicItemInfo
              item={item}
              optionStates={optionStates}
              selectedOptionCombination={selectedOptionCombination}
            />
          ) : (
            <></>
          )}
          {!!item ? (
            <ItemCombinationDetail
              item={item}
              selectedOptionCombination={selectedOptionCombination}
            />
          ) : (
            <></>
          )}
        </div>
        <div className="option-combination-section">
          {Object.keys(optionStates).length ? (
            <>
              {item?.optionsInfo.optionCategories.map((optionCategory) => (
                <OptionSection
                  item={item}
                  optionCategory={optionCategory}
                  optionStates={optionStates}
                  setOptionStates={setOptionStates}
                  setSelectedOptionCombination={setSelectedOptionCombination}
                />
              ))}
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      <div className="description-section">
        <span className="description-section-header">Description</span>
            {
              !!item ? <>{item.description.map(descriptionParagraph => <DescriptionParagraph descriptionParagraph={descriptionParagraph}/>)}</> : <></>
            }
      </div>

      <div className="review-section">
        <span className="review-section-header">Reviews</span>
        {!!item ? (
          <>
            {item.reviews.map((review) => (
              <Review review={review} />
            ))}
          </>
        ) : (
          <></>
        )}
      </div>
    </>
  );
};
