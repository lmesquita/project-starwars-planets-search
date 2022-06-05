import React, { useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';
import fetchPlanetsApi from '../services/fetchPlanetsApi';

function PlanetsProvider({ children }) {
  const [planets, setPlanets] = useState([]);
  const [filterByName, setFilterByName] = useState({ name: '' });
  const [filterByNumericValues, setNumericValues] = useState([]);
  async function getPlanets() {
    const planetsResponse = await fetchPlanetsApi();
    setPlanets(planetsResponse);
  }

  function getFilterByName(name) {
    setFilterByName({ name });
  }

  function getNumericValues(objFilter) {
    setNumericValues(objFilter);
  }

  return (
    <PlanetsContext.Provider
      value={ {
        planets,
        getPlanets,
        filterByName,
        getFilterByName,
        filterByNumericValues,
        getNumericValues,
      } }
    >
      { children }
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.element,
}.isRequired;

export default PlanetsProvider;
