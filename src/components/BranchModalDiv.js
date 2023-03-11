
import { useState,useEffect } from "react";
import { Button, Modal } from "react-bootstrap";
import { useDispatch } from 'react-redux';
import { saveBranch } from '../features/branch/branchSlice';
import {API} from "../global.js";

export function BranchModalDiv({ show, setShow, branch, setBranch }) {

    var requestOptions = {
      method: 'GET',
      headers: {'X-CSCAPI-KEY':'VG5UcXBLUzhTNmtPVjM1c2h6SDRHaXhXUUZmaWJDUTlLdjh0SlI2MQ=='},
    };
  const [states,setStates] = useState([]);
  const [cities,setCities] = useState([]);
  const [branches,setBranches] = useState([]);
  const [branchSelected,setBranchSelected] = useState(false);

  const dispatch = useDispatch();
  
    useEffect(() => {
      async function fetchStates(){
        let getStates = await fetch(`https://api.countrystatecity.in/v1/countries/IN/states`,requestOptions);
        let allStates = await getStates.json();
        setStates(allStates);
      }
      fetchStates();
    },[])
  
  
    return (
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>Choose your nearest branch</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form className="select-branch">
            <label htmlFor="select-state">Select state</label>
  
            {/* state select dropdown */}
            <select className="form-select" name="states" id="states" onChange={(event) => {
                 const selectedState = event.target.value;
                  
                  //call api to get cities
                  async function fetchCities(){
                    const getCities = await fetch(`https://api.countrystatecity.in/v1/countries/IN/states/${selectedState}/cities`,requestOptions);
                    const cities = await getCities.json();
                   
                    setCities(cities);
                  }
  
                  fetchCities();
                  
                }}>
              <option value="select">Select</option>
              {states.map((state,index) => {
                return <option value={state.iso2} key={index}>{state.name}</option>
              })}
            </select>
  
            <label htmlFor="select-city" className="mt-3">Select city</label>
            {/* citi select dropdown */}
            <select className="form-select" name="cities" id="cities" onChange={(event) => {
                 const selectedCity = event.target.value;
  
                 //fetch branches from database
                  async function fetchBranches(){
                    let getBranches = await fetch(`${API}/items/getBranches/${selectedCity}`);
                    let branches = await getBranches.json();
                    return branches;
                  }
  
                  fetchBranches().then(branches => setBranches(branches));
                }}>
              <option value="select">Select</option>
              {cities.map((city,index) => {
                return <option value={city.name} key={index}>{city.name}</option>
              })}
            </select>
  
  
            {/* branches select dropdown */}
            <label htmlFor="branches" className="mt-3">select branch</label>
            <select className="form-control" name="branches" id="branches" onChange={(e) => {
               branch = e.target.value; 
              if(branch !== "select" || branch !== ""){
                setBranchSelected(true);
                setBranch(branch);
              }
              
            }}>
              <option value="select">Select</option>
              {branches.map((item,index) => {
                return <option vlaue={item} key={index}>{item}</option>
              })}
            </select>
  
          </form>
        </Modal.Body>
        <Modal.Footer>
          {/* proceed button */}
          {branchSelected ? 
          <Button className="btn btn-danger" aria-label="procced" onClick={() => {
            setShow(!show);
            dispatch(saveBranch(branch));
          }}>
            Proceed
          </Button> : <Button className="btn btn-danger" aria-label="procced" disabled>
            Proceed
          </Button>}
  
          {/* close button */}
          <Button
            aria-label="Close"
            className="btn btn-secondary"
            onClick={() => setShow(!show)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  