import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Apollo } from 'apollo-angular';
import { InMemoryCache } from '@apollo/client/cache';
import { ApolloClient, HttpLink } from '@apollo/client/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

const client = new ApolloClient({
  link: new HttpLink({ uri: 'http://localhost:3000/graphql' }), // Your GraphQL endpoint
  cache: new InMemoryCache(),
});

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    { provide: Apollo, useValue: client }, provideAnimationsAsync(), 
    // { provide: HttpLink, useValue: new HttpLink({ uri: 'http://localhost:3000/graphql' }) } 
  ]
})
  .catch(err => console.error(err));
