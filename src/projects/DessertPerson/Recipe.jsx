import React, { useEffect, useState } from 'react';
import classNames from "classnames"
import PropTypes from "prop-types"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faBook, faArrowsRotate } from '@fortawesome/free-solid-svg-icons'
import Button from "components/_ui/Button/Button";
import Link from "components/_ui/Link/Link";
import './Recipe.scss'

const Recipe = ({ className, data, currentLockedData, setCurrentLockedData, bookSections, sectionColors }) => {
    let { recipe, difficulty, page, section, minutes } = { ...currentLockedData }
    let [randomSectionRecipe, setRandomSectionRecipe] = useState()
    let [randomDifficultyRecipe, setRandomDifficultyRecipe] = useState()


    let getRandomArbitrary = (min, max) => {
        return Math.random() * (max - min) + min;
    }

    let grabRandomRecipe = (meta, metaValue) => {
        let recipe, filteredData;

        if (typeof metaValue == 'number') {
            filteredData = data.filter(row => Math.floor(row[meta]) == Math.floor(metaValue))
        } else {
            filteredData = data.filter(row => row[meta].toLowerCase() == metaValue.toLowerCase())
        }

        let randIndex = Math.floor(getRandomArbitrary(0, filteredData.length - 1))
        recipe = filteredData[randIndex];

        return recipe
    }

    let refreshRandomRecipes = () => {
        setRandomSectionRecipe(grabRandomRecipe("section", currentLockedData.section))
        setRandomDifficultyRecipe(grabRandomRecipe("difficulty", currentLockedData.difficulty))
    }

    useEffect(() => {
        if (currentLockedData) {
            setRandomSectionRecipe(grabRandomRecipe("section", currentLockedData.section))
            setRandomDifficultyRecipe(grabRandomRecipe("difficulty", currentLockedData.difficulty))
        } else {
            setRandomSectionRecipe()
            setRandomDifficultyRecipe()
        }
    }, [currentLockedData])

    return (
        <div className={classNames("Recipe", className)}>

            {currentLockedData ? (
                <>
                    <div className="Recipe__header">
                        <h3 className="Recipe__title">
                            {recipe}
                        </h3>
                        <div className="Recipe__difficulty">
                            Level {Math.floor(difficulty)}
                        </div>
                        <div className="Recipe__chapter">
                            <div className="Recipe__chapter__dot" style={{ background: sectionColors[bookSections.indexOf(section)] }}></div>
                            {section}
                        </div>
                    </div>
                    <div className="Recipe__info">
                        <div className="Recipe__time">
                            <FontAwesomeIcon className="Recipe__icon" icon={faClock} /> {minutes}
                        </div>
                        <div className="Recipe__page">
                            <FontAwesomeIcon className="Recipe__icon" icon={faBook} /> p.{page}
                        </div>
                    </div>
                </>
            ) : (
                <>
                    blank
                </>
            )}
            {/* <p className="Recipe__scrape">
                Claire Saffitz Makes Rhubarb Cake | Dessert Person
                Let me tell you a story about rhubarb. It’s a vegetable -- a stalk more specifically -- that grows every spring and has a piercing tart flavor and pretty ruby red hue. Some people don’t like the flavor, but those people don’t get what a special flavor and texture it has! In this rhubarb cake, Claire uses it three ways -- placed in decorative rows on top, cooked down into mush and incorporated into the batter, and chopped and folded into the cake. It’s a celebration of rhubarb, a harbinger of warm weather and an inspiration to dessert people everywhere.

                #ClaireSaffitz​​ #Baking​​ #Cake

                Rhubarb Cake
                Special Equipment:
                4 1/2 x 8 1/2 inch loaf pan, measured from the top
            </p> */}
            <div className="Recipe__recs">
                {currentLockedData && (
                    <>
                        <button onClick={() => refreshRandomRecipes()}>
                            {/* <FontAwesomeIcon className="Recipe__icon" icon={faArrowsRotate} /> */}
                            refresh
                        </button>
                        <div>
                            Another Level {Math.floor(difficulty)} Recipe
                            <div>
                                {randomDifficultyRecipe && randomDifficultyRecipe.recipe}
                            </div>
                        </div>
                        <div>
                            Another {section} Recipe
                            <div>
                                {randomSectionRecipe && randomSectionRecipe.recipe}
                            </div>
                        </div>
                    </>
                )}

            </div>
        </div>
    )
}


Recipe.propTypes = {

}

export default Recipe