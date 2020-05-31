import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import CategoryHeader from '../../CategoryHeader';
import EquipmentLabel from '../EquipmentLabel';
import MachineForm from './MachineForm';
import axios from 'axios';

const MachineList = () => {
  const [machines, setMachines] = useState([]);

  async function fetchData() {
    const result = await axios({
      url: 'http://localhost:5000/equipment',
      method: 'GET',
      headers: {
        equipType: 'machine',
      },
    });

    setMachines(result.data.equipment);
  }

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <CategoryHeader
        title="Machines"
        backRoute="/equipment"
        form={<MachineForm fetchData={fetchData} />}
      />
      <div className="job-list">
        {machines.map((machine) => {
          return (
            <EquipmentLabel
              key={machine._id}
              id={machine._id}
              brand={machine.equipBrand}
              model={machine.equipModel}
              jobLocation={machine.equipLocation}
              img={'http://localhost:5000/' + machine.equipImage}
            />
          );
        })}
      </div>
    </div>
  );
};

export default withRouter(MachineList);
