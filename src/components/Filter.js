import React, { useContext, useState } from 'react';
import PlanetsContext from '../context/PlanetsContext';

function Filter() {
  const {
    getNumericValues,
  } = useContext(PlanetsContext);

  // const [selected, setSelected] = useState({
  //   column: '',
  //   comparison: '',
  //   value: 0,
  // });

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
    getNumericValues(numericFilter);
  };

  return (
    <div>
      <select
        data-testid="column-filter"
        name="column"
        value={ column }
        onChange={ handleChange }
      >
        <option>population</option>
        <option>orbital_period</option>
        <option>diameter</option>
        <option>rotation_period</option>
        <option>surface_water</option>
      </select>

      <select
        data-testid="comparison-filter"
        name="comparison"
        value={ comparison }
        onChange={ handleChange }
      >
        <option>maior que</option>
        <option>menor que</option>
        <option>igual a</option>
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
    </div>
  );
}

export default Filter;
