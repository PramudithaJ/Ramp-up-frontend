import { inject, Inject, Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import { gql } from '@apollo/client/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  private apiurl = 'http://localhost:3002/graphql';

  constructor(private httpclient: HttpClient) {}

  private apollo: Apollo = inject(Apollo);


  //Cars
  getCars(take: number, skip: number, search: string): Observable<any> {
    const query = `
      query FindAllwithpagination($take: Int!, $skip: Int!, $search: String!) {
        findAllwithpagination(pageDTO: { take: $take, skip: $skip }, search: $search) {
          carRecord {
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
          total
        }
      }
    `;

    const body = {
      query,
      variables: {
        take,
        skip,
        search,
      },
    };

    console.log(body);
    return this.httpclient.post<any>(this.apiurl, body);
  }

  getCarsOnint(): Observable<any> {
    console.log('calling get carsoninit');
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
    console.log({ query });
    return this.httpclient.post<any>(this.apiurl, { query });

    // const query = gql`
    //     query FindAll {
    //       findAll {
    //         id
    //         firstName
    //         lastName
    //         email
    //         carMake
    //         carModel
    //         vin
    //         manufacturedDate
    //         ageOfVehicle
    //       }
    //     }
    //   `;
    //   console.log('GraphQL query fired:', JSON.stringify(query));
    //   let response = this.apollo.watchQuery({
    //     query,
    //     fetchPolicy: 'no-cache'
    //   }).valueChanges;
    //   console.log(response)
    //   return response
  }

  updateCars(
    id: string,
    firstName: string,
    lastName: string,
    email: string,
    carMake: string,
    carModel: string,
    vin: string,
    year: Date,
    age: number
  ): Observable<any> {
    const mutation = `
    mutation UpdateCarRecord(
      $id: String!
      $firstName: String
      $lastName: String
      $email: String
      $carMake: String
      $carModel: String
      $vin: String
      
    ) {
      updateCarRecord(
        UpdateCarRecord: {
          id: $id
          firstName: $firstName
          lastName: $lastName
          email: $email
          carMake: $carMake
          carModel: $carModel
          vin: $vin
          
        }
      ) {
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

    const body = {
      query: mutation,
      variables: {
        id,
        firstName,
        lastName,
        email,
        carMake,
        carModel,
        vin,
        manufacturedDate: year,
        ageOfVehicle: age,
      },
    };
    console.log('\n mutation : ', body);
    return this.httpclient.post<any>(this.apiurl, body);
  }

  deleteCars(id: string): Observable<any> {
    const query = `mutation DeleteCarRecord {
      deleteCarRecord(id: "${id}")
    }`;
  
    const body = { query };
  
    return this.httpclient.post<any>(this.apiurl, body);
  }

  getAllServiceRecords(){
    const query =`query FindAllcarServiceRecord {
    FindAllcarServiceRecord {
        id
        vin
        DateOfService
        cost
    }
}
`
    return this.httpclient.post<any>(this.apiurl,{query})

  }


  exportCars(age:number){
    if(age<0){
      throw console.error("age shoud be a positive number");
      
    }
    const url = `http://localhost:3003/car-export/${age}`

    return this.httpclient.get(url, { responseType: 'text' }).subscribe({
      next: (response: string) => {
        console.log('CSV file content:', response);

        const blob = new Blob([response], { type: 'text/csv' });
        const downloadLink = document.createElement('a');
        downloadLink.href = window.URL.createObjectURL(blob);
        downloadLink.download = `vehicles_${age}_years_and_older.csv`;
        downloadLink.click();
      },
      error: (error) => {
        console.error('Error while downloading CSV:', error);
      },
    });
  }




  //Service Records
  getServiceRecords(search:string):Observable<any>{
    
    const query=`query FindCarServiceRecordByVIN($search: String!) {
    FindCarServiceRecordByVIN(vin: $search) {
        id
        vin
        DateOfService
        cost
    }
}

    `
    const body = {
      query,
      variables: {
        search,
      },
    };


    return this.httpclient.post<any>(this.apiurl,body)
  }

  updateServiceRecords(
    id:string,
    vin:string,
    dateOfService:Date,
    cost:number):Observable<any>{
 
      const UPDATE_CAR_SERVICE_RECORD = gql`
      mutation UpdateCarServiceRecord($id: String!, $vin: String!, $dateOfService: String!, $cost: Float!) {
        updateCarServiceRecord(
          updateCarServiceRecordInput: { 
            id: $id, 
            vin: $vin, 
            DateOfService: $dateOfService, 
            cost: $cost 
          }
        ) {
          id
          vin
          DateOfService
          cost
        }
      }
    `;    

    return this.httpclient.post<any>(this.apiurl,UPDATE_CAR_SERVICE_RECORD)
  }

  //not complete
  deleteServiceRecords(id:string):Observable<any>{
    return this.httpclient.get<any>(this.apiurl)
  }
  
}
