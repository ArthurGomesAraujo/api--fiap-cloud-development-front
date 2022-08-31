import React, { useEffect, useState } from 'react';

import TemperatureChart from '../container/TemperatureChart';

import { constants } from '../../util';

import './MainPage.css';

const { baseURL, temperatureList } = constants;

const MainPage = () => {
  const [labels, setLabels] = useState();
  const [dataset, setDataset] = useState();
  const [refresh, isRefreshing] = useState(false);

  useEffect(() => {
    fetch(`${baseURL}${temperatureList}`)
      .then((response) => response.json())
      .then((data) => {
        setLabels(returnLabels(data));
        setDataset(returnDataset(data));
        isRefreshing(false);
      });
  }, [refresh]);

  const returnLabels = (data) => {
    if (data.length > 0) {
      const labelsArray = [];

      data.map((item) => {
        labelsArray.push(cleanData(item.timestamp));
      });

      return labelsArray;
    }

    return [];
  };

  const refreshPage = () => {
    isRefreshing(true);
    if (refresh) {
      window.location.reload();
    }
  };

  const cleanData = (timestamp) => {
    const date = new Date(timestamp);

    return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
  };

  const returnDataset = (data) => {
    if (data.length > 0) {
      const datasetArray = [];
      const dataValues = [];

      data.map((item) => {
        dataValues.push(item.temperatura);
      });

      datasetArray.push({
        id: 1,
        label: 'Sala',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: dataValues,
      });

      return datasetArray;
    }

    return [];
  };

  return (
    labels &&
    dataset && (
      <div className='chartcontainer'>
        <div className='titles'>
          <h1>Gráfico de Temperaturas</h1>
          <button className='btn-refresh' onClick={refreshPage}>
            Refresh
          </button>
        </div>

        <TemperatureChart labels={labels} dataset={dataset} />
      </div>
    )
  );
};

export default MainPage;