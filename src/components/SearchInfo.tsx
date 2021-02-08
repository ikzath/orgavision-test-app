import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button } from 'reactstrap';
import DisplayCard from './DisplayCard';
import axios, { AxiosResponse } from "axios";
import IPost from "../interfaces";
import "../style/SearchInfo.css";
import DisplayLoadingCard from "./DisplayLoadingCard";


const SearchInfo: React.FC = () => {
    
    const defaultProps:IPost[] = [];
    const [query, setquery] = useState<string>();
    const [posts, setPosts]: [IPost[], (posts: IPost[]) => void] = React.useState(defaultProps);
    const [loading, setLoading]: [boolean, (loading: boolean) => void] = React.useState<boolean>(false);
    const [searchResults, setsearchResults]: [IPost[], (searchResults: IPost[]) => void] = React.useState(defaultProps);
    const BarStyling = {width:"20rem",background:"#F2F1F9", border:"none", padding:"0.5rem", borderRadius: "15px", textDecoration: "none"};


    const handleChange = (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {
      setquery(e.currentTarget.value)
      if(query && query.length > 1) {
        if(query.length % 2 === 0){
          // setTimeout(() => fetchData(), 2000)
          fetchData();
        }            
      }
    };

      // get dynamic results with search nput 
      useEffect(() => {  
        fetchData();

      }, [query])


    useEffect(() => {
        const fetchAllData = () => {
        setLoading(true)
        axios.get(
              'https://orgavision-codingchallenge.azurewebsites.net/v2/article',
          )
          .then(( res: AxiosResponse<any>)=> {
            setLoading(false)
            setPosts(res.data.records);
            console.log(posts);
          })   
          .catch((err: any) => {
            console.log('error', err);
          })
        };    
          fetchAllData();    
    }, []);
  
  
  const fetchData = async(): Promise<any> => {
    try{
        setLoading(true)
        const result = await axios.get(`https://orgavision-codingchallenge.azurewebsites.net/v2/article?search=${query}`
        );        
        setLoading(false)
        let results = result.data;
        setsearchResults(results.records);
        console.log(results);
    }
    catch (err: any) {                        
      console.log('no results', err);
    }
    };


    let queryResults =         
      searchResults.map((item: any, i: number)=> (
        <Col md={3} key={item.id}> 
            <DisplayCard
            key={item.id}
            id = {item.id}
            title={item.fields.title}
            teaser={item.fields.teaser}
            category= {item.fields.category.map((itemCategory: any, i: number) => (
            <Button style={{ color: 'whitesmoke', backgroundColor: '#A0A0A0'}} to='' key={i} onClick={()=> setquery(itemCategory)}>{itemCategory}</Button> 
                ))} />
        </Col>
        ))     


      let pageOnLoadResults =                 
        posts.map((item: any, i: number)=> (
        <Col md={3} key={item.id} > 
            <DisplayCard 
                key={item.id}
                id = {item.id}
                title={item.fields.title}
                teaser={item.fields.teaser}
                category= {item.fields.category.map((itemCategory: any, i: number) => (
                <Button style={{ color: 'whitesmoke', backgroundColor: '#A0A0A0'}} to='' key={i} onClick={()=> setquery(itemCategory)}>{itemCategory}</Button> 
                ))} />
        </Col>
    ))                  

            
return (
  <div className='searchInfoDisplay'>
  <div className='nav'>
      <div className="nav__text">
          <h3>Knowledge Base</h3>
      </div>     
      <div className="nav__text2">
          <h3>KB</h3>
      </div>   
      <div className="nav__search">
      <input 
          style={BarStyling}
          type="text"
          placeholder="Suchen..."
          value={query || ''}
          onChange={handleChange}
          />
          </div>       
      </div>
      <div>
      <Container>
          {loading ? <DisplayLoadingCard /> :
      <Row>
          {query ? queryResults : pageOnLoadResults }
      </Row> }
      </Container>        
      </div>
      </div>
    )
}

export default SearchInfo
