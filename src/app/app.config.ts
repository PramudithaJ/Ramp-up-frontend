import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { ApolloClientOptions, InMemoryCache } from '@apollo/client/core';
import { provideApollo } from 'apollo-angular';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';



const config: SocketIoConfig = { url: 'http://localhost:3003', options: {} };

export function createApollo(): ApolloClientOptions<any> {
  return {
    uri: 'http://localhost:3000/graphql', // URL
    cache: new InMemoryCache(),
  };
}

export const appConfig: ApplicationConfig = {
  providers: [

    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideApollo(createApollo), 
    provideHttpClient(),
    importProvidersFrom(FormsModule, SocketIoModule.forRoot(config)),
    
  ],
};
