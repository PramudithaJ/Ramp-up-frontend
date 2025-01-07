import { Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CarService {
  private apiurl = 'http://localhost:3000/graphql'


  constructor(@Inject(Apollo) private apollo: Apollo, private httpclient : HttpClient ) {}

  

  getCars(take:number, skip:number, search:string):Observable<any>{

    

    const query = `query FindAllwithpagination($take: Int!, $skip: Int!, $search: String!) {
        findAllwithpagination(pageDTO: { take: $take, skip: $skip }, search: $search) {
          id
          firstName
          lastName
          email
          carMake
          carModel
          vin
          manufacturedDate
          ageOfVehicle
        }
      }
`
  // console.log(query2)

  const body = {
    query,
    variables: {
      take,
      skip,
      search,
    },
  };
  console.log(body)
  return this.httpclient.post<any>(this.apiurl,body)

    let QQ =  this.apollo.query({
      query: gql`
      query FindAll {
    findAll {
        id
        firstName
        lastName
        email
        carMake
        carModel
        vin
        manufacturedDate
        ageOfVehicle
    }
}
`
    })
    
//     return QQ
  }


getCarsOnint():Observable<any>{
  
  const query = `
      query FindAll {
        findAll {
          id
          firstName
          lastName
          email
          carMake
          carModel
          vin
          manufacturedDate
          ageOfVehicle
        }
      }
    `;
    console.log({query})  
   return this.httpclient.post<any>(this.apiurl,{query})
}


}
