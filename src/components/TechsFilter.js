const  TechsFilter = () => {
    const [open, setOpen] = useState(false);
    const [s_groups, setSGroups] = useState([])
    const [specs, setSpecs] = useState([])
    const [countries, setCountries] = useState([])
    const [names, setNames] = useState([])
    const [orgs, setOrgs] = useState([])
  
    const dispatch = useDispatch()
    const orgList = useSelector(state => state.orgList)
  
  
    const filterData = useSelector(state => state.orgFilterData)
  
    useEffect(() => {dispatch(orgFilterData())}, [dispatch])
    const groups = [ {id: 1, name:'Клиент'}, {id: 2, name:'Поставщик'}, {id: 3, name:'Клиент, поставщик'} ]
  
    const {loading, error, data} = filterData
  
    const onClick = (e) => {
      console.log(names[0])
      dispatch(listOrg(names, s_groups, specs, countries))
    }
    const onClickClean = (e) => {
      const elements = document.getElementsByName("check")
      elements.forEach(element => {
        element.checked = false
      });
      namesHandler([])
      groupsHandler([])
      specsHandler([])
      countriesHandler([])
    }
  
    const onChangeName =(e) => {
      if(e.target.checked){
        names.push(parseInt(e.target.value))
        }
      else{
        const index = names.indexOf(e.target.value);
          if (index > -1) {
            names.splice(index, 1);
          }
      }
    }
    const onChangeGroup =(e) => {
      if(e.target.checked){
        s_groups.push(parseInt(e.target.value))
        }
      else{
        const index = s_groups.indexOf(e.target.value);
          if (index > -1) {
            s_groups.splice(index, 1);
          }
      }
    }
    const onChangeSpec =(e) => {
      if(e.target.checked){
        specs.push(parseInt(e.target.value))
        }
      else{
        const index = specs.indexOf(e.target.value);
          if (index > -1) {
            specs.splice(index, 1);
          }
      }
    }
    const onChangeCountry =(e) => {
      if(e.target.checked){
        countries.push(parseInt(e.target.value))
        }
      else{
        const index = countries.indexOf(e.target.value);
          if (index > -1) {
            countries.splice(index, 1);
          }
      }
    }
  
      return( 
        <div className="filter">
          <button type="button" className="btn btn-outline-dark" onClick={onClick}>Применить</button>
          <button type="button" className="btn btn-outline-dark" onClick={onClickClean}>Очистить</button>
  <div className="accordion" id="accordionPanelsStayOpenExample">
    <div className="accordion-item">
      <h2 className="accordion-header" id="panelsStayOpen-headingOne">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseOne" aria-expanded="true" aria-controls="panelsStayOpen-collapseOne">
          Название
        </button>
      </h2>
      {data.names ? data.names.map((item) => {
        return(
          <div id="panelsStayOpen-collapseOne" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingOne">
        <div className="accordion-body names">
        <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeName}></Form.Check>
        </div>
      </div>
        )
      }):<p></p>}
      </div>
      <div className="accordion-item">
      <h2 className="accordion-header" id="panelsStayOpen-headingTwo">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseTwo" aria-expanded="true" aria-controls="panelsStayOpen-collapseTwo">
          Группа
        </button>
      </h2>
      {groups ? groups.map((item) => {
        return(
          <div id="panelsStayOpen-collapseTwo" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingTwo">
        <div className="accordion-body names">
        <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeGroup}></Form.Check>
        </div>
      </div>
        )
      }):<p></p>}
      </div>
      <div className="accordion-item">
      <h2 className="accordion-header" id="panelsStayOpen-headingThree">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseThree" aria-expanded="true" aria-controls="panelsStayOpen-collapseThree">
          Специализация
        </button>
      </h2>
      {data.specs ? data.specs.map((item) => {
        return(
          <div id="panelsStayOpen-collapseThree" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingThree">
        <div className="accordion-body names">
        <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeSpec}></Form.Check>
        </div>
      </div>
        )
      }):<p></p>}
      </div>
      <div className="accordion-item">
      <h2 className="accordion-header" id="panelsStayOpen-headingFour">
        <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#panelsStayOpen-collapseFour" aria-expanded="true" aria-controls="panelsStayOpen-collapseFour">
          Страна
        </button>
      </h2>
      {data.countries ? data.countries.map((item) => {
        return(
          <div id="panelsStayOpen-collapseFour" className="accordion-collapse collapse show" aria-labelledby="panelsStayOpen-headingFour">
        <div className="accordion-body names">
        <Form.Check size="sm" type="checkbox" value={item.id} label={item.name} name="check" onChange={onChangeCountry}></Form.Check>
        </div>
      </div>
        )
      }):<p></p>}
      </div>
  </div>
      </div>
  )
    }
  
    export default TechsFilter