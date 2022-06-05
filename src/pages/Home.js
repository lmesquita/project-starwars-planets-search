import React, { useContext, useEffect, useState } from 'react';
import PlanetsTable from '../components/PlanetsTable';
import PlanetsContext from '../context/PlanetsContext';

function Home() {
  const {
    getPlanets,
    planets,
    filterByName,
    filterByNumericValues,
    getFilterByName,
    getNumericValues,
  } = useContext(PlanetsContext);

  useEffect(() => {
    getPlanets();
  }, []);

  const [column, setColumn] = useState('population');
  const [comparison, setComparison] = useState('maior que');
  const [value, setValue] = useState(0);

  const handleChange = ({ target }) => {
    if (target.name === 'column') {
      setColumn(target.value);
    } else if (target.name === 'comparison') {
      setComparison(target.value);
    } else if (target.name === 'value') {
      setValue(target.value);
    }
  };

  const handleClick = async () => {
    const numericFilter = {
      column,
      comparison,
      value,
    };
    getNumericValues([...filterByNumericValues, numericFilter]);
  };

  const nameChange = ({ target }) => {
    getFilterByName(target.value);
  };

  const filterPlanets = (planetData) => {
    const filteredArray = [];
    filterByNumericValues.forEach((filter) => {
      switch (filter.comparison) {
      case 'maior que':
        filteredArray.push(Number(planetData[filter.column]) > Number(filter.value));
        break;
      case 'menor que':
        filteredArray.push(Number(planetData[filter.column]) < Number(filter.value));
        break;
      case 'igual a':
        filteredArray.push(Number(planetData[filter.column]) === Number(filter.value));
        break;
      default:
        return true;
      }
    });
    return filteredArray.every((data) => data);
  };

  const verifyOptions = (option) => (
    !filterByNumericValues.find((filter) => option === filter.column)
  );

  const COLUMN_OPTIONS = [
    'population',
    'orbital_period',
    'diameter',
    'rotation_period',
    'surface_water',
  ];

  const COMPARISON_OPTIONS = [
    'maior que',
    'menor que',
    'igual a',
  ];

  return (
    <>
      <input
        type="text"
        data-testid="name-filter"
        onChange={ nameChange }
      />

      <div>
        <select
          data-testid="column-filter"
          name="column"
          value={ column }
          onChange={ handleChange }
        >
          {
            COLUMN_OPTIONS.filter(verifyOptions)
              .map((strColumn) => (
                <option key={ strColumn }>{ strColumn }</option>
              ))
          }
        </select>

        <select
          data-testid="comparison-filter"
          name="comparison"
          value={ comparison }
          onChange={ handleChange }
        >
          {
            COMPARISON_OPTIONS.map((strComparison) => (
              <option key={ strComparison }>{ strComparison }</option>
            ))
          }
        </select>

        <input
          type="number"
          data-testid="value-filter"
          name="value"
          value={ value }
          onChange={ handleChange }
        />

        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
        >
          Filtrar
        </button>

        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => {
            getNumericValues([]);
          } }
        >
          Remover todas filtragens
        </button>
      </div>

      <div>
        {
          filterByNumericValues.length > 0
            ? filterByNumericValues.map((filter, index) => (
              <div
                key={ filter.column }
                data-testid="filter"
              >
                <span>
                  {
                    `${filter.column} ${filter.comparison} ${filter.value}`
                  }
                </span>
                &emsp;
                <button
                  type="button"
                  onClick={ () => {
                    const cloneArray = [...filterByNumericValues];
                    cloneArray.splice(index, 1);
                    console.log(cloneArray);
                    getNumericValues(cloneArray);
                  } }
                >
                  X
                </button>
              </div>
            ))
            : 'No filter aplied'
        }
      </div>

      <table>
        <thead>
          <tr>
            { planets.length > 0
              ? Object.keys(planets[0]).filter((aux) => aux !== 'residents')
                .map((key) => (
                  <th key={ key }>{ key }</th>
                ))
              : '' }
          </tr>
        </thead>
        <tbody>
          { planets.length > 0
            ? planets.filter(filterPlanets)
              .filter((filterPlanet) => (
                filterPlanet.name.includes(filterByName.name)))
              .map((planet) => (<PlanetsTable key={ planet.name } planet={ planet } />))
            : 'Carregando...' }
        </tbody>
      </table>
    </>
  );
}

export default Home;
